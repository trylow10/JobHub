import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Input,
  SuggestionList,
  SuggestionItem,
} from "../search/Style/SearchStyle";
import { API } from "../../env";


const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`${API}api/search/suggest?q=${query}`);
      const data = await response.json();
      setSuggestions(data.filteredSuggestions);
    } catch (error) {
      console.error("An error occurred while fetching suggestions:", error);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    if (query.trim() !== "") {
      try {
        const response = await fetch(`${API}/api/search/?q=${query}`);
        const data = await response.json();
        setSearchResults(data.hits);
        setSuggestions([]);
      } catch (error) {
        console.error(
          "An error occurred while fetching search results:",
          error
        );
      }
    }
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
        <Button onClick={handleSearch}>Search</Button>
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
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                {result.type === "user" ? (
                  <div>
                    <p>Username: {result.uname}</p>
                    <p>Email: {result.email}</p>
                    <p>Headline: {result.headline}</p>
                    <p>Roles: {result.roles}</p>
                  </div>
                ) : (
                  <div>
                    <p>Title: {result.title}</p>
                    <p>Description: {result.description}</p>
                    <p>Company: {result.company}</p>
                    <p>Workplace: {result.workPlace}</p>
                    <p>Job Location: {result.jobLocation}</p>
                    <p>Job Type: {result.jobType}</p>
                    <p>Skills: {result.skills}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
