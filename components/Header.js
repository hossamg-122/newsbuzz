import { useEffect, useState } from 'react';
import Link from 'next/link'
import styles from "../styles/Header.module.scss";
import SearchBar from "./SearchBar";
import {VscMenu, VscClose} from "react-icons/vsc";

function Header() {

    const[searchTerm, setSearchTerm]= useState("");
    const[menuDisplay, setMenuDisplay] = useState(false);

    const inputChangeHandler = (e)=>{
        setSearchTerm(e.target.value);
    }

    const menuHandler = ()=>{
        setMenuDisplay(!menuDisplay);
    }

    useEffect(()=>{
        window.addEventListener("click", ()=>{setMenuDisplay(false)})
        return ()=>{
            window.removeEventListener("click", ()=>{setMenuDisplay(false)})
        }
    }, [])

    return (
        <header className={styles.header}>
            <div className="general_container">
                <div className={styles.header_wrapper}>
                    <div className={styles.header_left}>
                        <Link href="/"><a>Newsbuzz</a></Link>
                    </div>
                    <div className={styles.header_mid}>
                        <SearchBar
                            name={"search"}
                            placeholder={"Search League or Team"} 
                            searchTerm={searchTerm} 
                            inputChangeHandler={inputChangeHandler}
                        />
                    </div>
                    <div className={styles.header_right}>
                        <Link href="/login"><a>login</a></Link>
                        <Link href="/register"><a>register</a></Link>
                        {menuDisplay? 
                          <VscClose 
                            tabIndex="0" 
                            onClick={menuHandler} 
                          />
                             : 
                          <VscMenu 
                            tabIndex="0" 
                            onClick={menuHandler}
                            onFocus={menuHandler}
                          />
                        }
                        
                        
                        
                    </div>
                </div>
            </div>
            {menuDisplay && 
            <div className={styles.menu}>
                <Link href="/login"><a>login</a></Link>
                <Link href="/register"><a>register</a></Link>
            </div>
            }

      </header>
    );
}

export default Header;