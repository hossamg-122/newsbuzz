import { IoMdSearch } from "react-icons/io";
import styles from "../styles/SearchBar.module.scss"

function SearchBar(props) {
    return (
        <form className={styles.searchForm}>
            <IoMdSearch />
            <input
                type="text"
                name={props.name}
                placeholder={props.placeholder}
                value={props.searchTerm}
                onChange={props.inputChangeHandler}
            />
        </form>

    );
}

export default SearchBar;