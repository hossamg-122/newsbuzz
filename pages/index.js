import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import styles from "../styles/home.module.scss";
import axios from 'axios';


function Home(props) {

  const [newsList, setNewsList] = useState(props.serverProps.news);
  const [skipValue, setSkipValue] = useState(10);
  const [spinnerDisplay, setSpinnerDisplay] = useState(false);

  // to cache the last skipping value to prevent double requests for the same 10 records.
  let lastSkipValue = 0;

  const scrollHandler = useCallback(() => {

    // the condition checks if the page verticaly scrolled to the end of the page, and
    // also checks if no previous request has been made with the same "skipping value",
    // to prevent multiple requests for the same 10 records. 
    if (window.innerHeight > document.getElementById("spinner").getBoundingClientRect().bottom && skipValue > lastSkipValue) {

      // updates the cached "last skipping value". 
      // set the spinner to be visible.
      lastSkipValue = skipValue
      setSpinnerDisplay(true);

      // fetch the next 10 records
      axios.get(`http://80.240.21.204:1337/news?skip=${skipValue}&limit=10`).then((res) => {

        // set 1 second delay, to make at least ensure 1 second of the spinner animation, then :
        // - hide the spinner.
        // - add the new 10 records to the current records list.
        // - update the skipping value, to be suitable for the request of the next 10 records.
        window.setTimeout(() => {
          setSpinnerDisplay(false);
          setNewsList(newsList.concat(res.data.news));
          setSkipValue(skipValue + 10);
        }, 1000)

      }).catch(() => {
        window.alert("API Request Failed : Failed To Fetch More News Data [EndPoint Security Issue]. ");
        setSpinnerDisplay(false);
      })

    }

  }, [skipValue])

  useEffect(() => {
    // attach the scrolling logic to the window 
    window.addEventListener("scroll", scrollHandler);

    // deattach the scrolling logic form the window 
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, [skipValue, newsList])


  return (
    <>
      <Head>
        <title>Newsbuzz | Home</title>
        <meta property="og:image" content={"https://dummyimage.com/400x400/00a47b/ffffff&text=Newsbuzz"} />
        <meta property="twitter:image" content={"https://dummyimage.com/400x400/00a47b/ffffff&text=Newsbuzz"}></meta>
      </Head>

      <main className={styles.home_main}>
        <div className="general_container">
          <div className={styles.home_wrapper}>

            <div className={styles.left_col}></div>

            <div className={styles.mid_col}>

              {newsList ?
                newsList.map((record, index) => {
                  return <NewsCard key={index} record={record} />
                })
                :
                <h3 className={styles.noData}>No Available News</h3>
              }

              <div id="spinner" style={{
                transition: "0.5s all ease 0.25s",
                position: "relative",
                opacity: spinnerDisplay ? "1" : "0",
                transform: spinnerDisplay ? "translateY(0.5rem)" : "translateY(0px)",
              }}><Spinner /></div>

            </div>

            <div className={styles.right_col}></div>

          </div>
        </div>

      </main>
    </>
  )
}

export async function getServerSideProps() {
  return axios.get(`http://80.240.21.204:1337/news?skip=0&limit=10`).then((res) => {
    return {
      props: { serverProps: res.data }, // will be passed to the page component as props
    }
  }).catch((err) => {
    console.log(err);
    return {
      props: { serverPropsUser: {} },
    }
  });

}


export default Home;
