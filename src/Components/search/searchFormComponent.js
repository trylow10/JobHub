import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Input,
  SuggestionList,
  SuggestionItem,
} from "./Style/SearchStyle";
import { API, HEADLINE, PROFILE_IMG } from "../../env";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
      setSearchResults([]);
    }
  }, [query]);

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
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    setSuggestions([]);
    handleSearch(suggestion.text); // Call handleSearch with clicked suggestion's text
  };

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await fetch(`${API}/api/search?q=${searchQuery}`);
        const data = await response.json();

        console.log("---", data.hits);
        setSearchResults(data.hits);
        setSuggestions([]); // Clear suggestions when search results are displayed
      } catch (error) {
        console.error(
          "An error occurred while fetching search results:",
          error
        );
      }
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch(query);
  };

  return (
    <div>
      <Container>
        <Input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search"
        />
        <Button onClick={handleSearchButtonClick}>Search</Button>
      </Container>

      {suggestions.length > 0 && (
        <SuggestionList>
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

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <div>
            <h3>Users</h3>
            <ul>
              {searchResults
                .filter((result) => result.type === "user")
                .map((result, index) => (
                  <li key={index}>
                    <div>
                      <img
                        src={result.profileImg || PROFILE_IMG}
                        alt="User Profile"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <p>Username: {result.uname}</p>
                      <p>Headline: {result.headline || HEADLINE}</p>
                      <p>Email: {result.email}</p>
                      <p>Skills: {result.skills}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3>Jobs</h3>
            <ul>
              {searchResults
                .filter((result) => result.type === "job")
                .map((result, index) => (
                  <li key={index}>
                    <div>
                      <p>Title: {result.title}</p>
                      <p>Description: {result.description}</p>
                      <p>Company: {result.company}</p>
                      <p>Workplace: {result.workPlace}</p>
                      <p>Job Location: {result.jobLocation}</p>
                      <p>Job Type: {result.jobType}</p>
                      <p>Skills: {result.skills}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
