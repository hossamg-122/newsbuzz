import styles from "../styles/NewsCard.module.scss";
import ReactImageFallback from "react-image-fallback";
import { TiRss } from "react-icons/ti";

function NewsCard({ record }) {
    let dateTime = new Date(record.created_at);
    return (
        <div className={styles.news_card}>

            <div className={styles.head}>

                <div className={styles.head_left}>
                    <div className={styles.img_container}>
                        <ReactImageFallback
                            src={record.source.url}
                            fallbackImage="/assets/fallback_icon.png"
                            alt={record.source.title}
                        />
                    </div>

                    <h3>{record.source.title}</h3>

                </div>

                <div className={styles.head_right}>
                    <a href={record.link} target="blank">
                        <TiRss />
                    </a>
                </div>

            </div>

            <h4><a href={record.link} target="blank">{record.title}</a></h4>

            <p className={styles.date_and_time}>
                {dateTime.toLocaleDateString('en-US', { weekday: 'long' })},
                {" " + dateTime.getDate()}
                {" " + dateTime.toLocaleString('default', { month: 'long' })}
                {" " + dateTime.getFullYear()}
                {" AT "}
                {dateTime.getUTCHours() < 10 && "0"}{dateTime.getUTCHours()}
                :
                {dateTime.getUTCMinutes() < 10 && "0"}{dateTime.getUTCMinutes()}
            </p>

            {!!record.keywords.length && <hr />}

            <ul>
                {record.keywords.map((keyword, index) => {
                    return (
                        <li key={index}>{keyword.name}</li>
                    )
                })}
            </ul>

        </div>
    );
}

export default NewsCard;
