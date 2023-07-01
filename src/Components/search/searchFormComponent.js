import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchWrapper,
  SuggestionList,
  SuggestionItem,
  Overlay,
} from "./Style/SearchStyle";
import { SearchBox } from "../Feed/Styles/HeaderStyled";
import { API } from "../../env";

const SearchForm = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [blackOverlay, setBlackOverlay] = useState(false);
  const [_, setSearchResults] = useState([]);
  const suggestionRef = useRef(null); // Reference to the suggestion div
  const overlayRef = useRef(null); // Reference to the overlay div

  useEffect(() => {
    if (query.trim() !== "") {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
      setSearchResults([]);
    }
  }, [query]);

  useEffect(() => {
    // Add event listener to handle clicks outside of the suggestion div
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`${API}/api/search/suggest?q=${query}`);
      const data = await response.json();
      setSuggestions(data.filteredSuggestions);
    } catch (error) {
      console.error("An error occurred while fetching suggestions:", error);
    }
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === "") {
      setSuggestions([]);
      setSearchResults([]);
    }
    setBlackOverlay(newQuery.trim() !== ""); // Show the overlay when the query has a value
  };

  const handleSuggestionClick = () => {
    handleSearch(query); // Call handleSearch without passing suggestion's text
    setSuggestions([]); // Hide the suggestion list
    overlayRef.current.style.display = "none"; // Hide the overlay
  };

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await fetch(`${API}/api/search?q=${searchQuery}`);
        const data = await response.json();

        setSearchResults(data.hits);
        navigate(`/search?q=${searchQuery}`);
      } catch (error) {
        console.error(
          "An error occurred while fetching search results:",
          error
        );
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  const handleOutsideClick = (e) => {
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(e.target) &&
      !overlayRef.current.contains(e.target)
    ) {
      setSuggestions([]); // Hide suggestions when clicked outside the suggestion div
    }
  };

  return (
    <>
      {blackOverlay && <Overlay ref={overlayRef} />}

      <div>
        <SearchWrapper>
          <SearchBox>
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={() => handleSearch(query)}
            />
            <input
              placeholder="Search"
              type="text"
              value={query}
              onChange={handleQueryChange}
              onKeyPress={handleKeyPress}
            />
          </SearchBox>

          {suggestions.length > 0 && (
            <SuggestionList ref={suggestionRef}>
              {suggestions.map((suggestion) => (
                <SuggestionItem
                  key={suggestion.text}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.text}
                </SuggestionItem>
              ))}
            </SuggestionList>
          )}
        </SearchWrapper>
      </div>
    </>
  );
};

export default SearchForm;
