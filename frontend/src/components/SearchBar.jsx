import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SearchBar(props, { placeholder }) {
  let history = useHistory();
  const [tours, setTours] = useState([])
  const getTours = async (title) => {
    await axios.get(`/api/tours/search/${title}`).then(res => setTours(res.data))
  }
  useEffect(() => {
    getTours()
  }, [])
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    if (searchWord.length > 1) {
      getTours(searchWord)
      if (searchWord === "") {
        setFilteredData([])
      } else {
        setFilteredData(tours)
      }
    }
    if (searchWord.length === 0) {
      clearInput()
    }
  }
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      history.push(`/search/${event.target.value}`)
      clearInput()
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title><desc id="desc">A magnifying glass icon.</desc><g class="search-path" fill="none" stroke="#848F91"><path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" /><circle cx="8" cy="8" r="7" /></g></svg>
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          onKeyDown={handleEnter}
        />
        <i class="fas fa-window-close" onClick={clearInput}></i>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            let hrefData = `/tour/${value._id}`
            return (
              <a className="dataItem" href={hrefData} target="_blank" rel="noreferrer">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
      {filteredData.length === 0 }
    </div>
  );
}
export default SearchBar;
