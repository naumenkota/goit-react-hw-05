import { toast } from 'react-hot-toast';
import s from "./SearchBar.module.css";


export default function SearchBar({ onSubmit }) {

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const value = form.elements.value.value;
        if (value.trim() === "") {
            toast.error("Please enter a search query");
            return;
        }
        onSubmit(value);
        form.reset();
    };
        

    return (
        <div className={s.searchBarWrapper}> 
         <form  className={s.searchForm} onSubmit = {handleSubmit}>
                <input
        className={s.searchInput}
         name="value"
         type="text"
         autoComplete="off"
         autoFocus
         placeholder="Search movies"
    />
          <button type="submit" className={s.searchButton}>Search</button>
            </form>
            </div>
    )
}