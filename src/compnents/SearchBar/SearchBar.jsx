import { useId } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ submit }) => {
  const [query, setQuery] = useState("");
  const serchQueryId = "serchQueryId" + useId();

  const notify = (event) => {
    event.preventDefault();


    const form = event.target;
    if (!checkQuery(query)) return;
    submit(query);
    setQuery("");

  };
  const checkQuery = (query) => {
    const checkValue = query.trim() !== "";
    if (!checkValue) {
      toast.error("Please enter a search query");
    }
    return checkValue;
  };

  return (
    <header>
      <form className={css.form}>
      
        <input
          type="text"
          name="query"
          value={query}
          id={serchQueryId}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search images and photos"
          autoFocus
        />
    
        <button onClick={notify} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
