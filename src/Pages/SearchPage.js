// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { API, HEADLINE, PROFILE_IMG } from "../env";
// import Header from "../Components/Feed/Header";
// import {
//   Wrapper,
//   List,
//   ListItem,
//   Section,
//   SectionTitle,
//   UserInfo,
//   Title,
//   ProfileImage,
//   JobInfo,
// } from "../Components/search/Style/SearchStyle";

// const SearchResultPage = () => {
//   const location = useLocation();
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const query = new URLSearchParams(location.search).get("q");
//     handleSearch(query);
//   }, [location.search]);

//   const handleSearch = async (searchQuery) => {
//     if (searchQuery.trim() !== "") {
//       try {
//         const response = await fetch(`${API}/api/search?q=${searchQuery}`);
//         const data = await response.json();

//         setSearchResults(data.hits);
//       } catch (error) {
//         console.error(
//           "An error occurred while fetching search results:",
//           error
//         );
//       }
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Wrapper>
//         <Title>Search Results</Title>
//         <Section>
//           <SectionTitle>Users</SectionTitle>
//           <List>
//             {searchResults
//               .filter((result) => result.type === "user")
//               .map((result, index) => (
//                 <ListItem key={index}>
//                   <ProfileImage
//                     src={result.profileImg || PROFILE_IMG}
//                     alt="User Profile"
//                   />
//                   <UserInfo>
//                     <p>Username: {result.uname}</p>
//                     <p>Headline: {result.headline || HEADLINE}</p>
//                     <p>Email: {result.email}</p>
//                     <p>Skills: {result.skills}</p>
//                   </UserInfo>
//                 </ListItem>
//               ))}
//           </List>
//         </Section>
//         <Section>
//           <SectionTitle>Jobs</SectionTitle>
//           <List>
//             {searchResults
//               .filter((result) => result.type === "job")
//               .map((result, index) => (
//                 <ListItem key={index}>
//                   <JobInfo>
//                     <p>Title: {result.title}</p>
//                     <p>Description: {result.description}</p>
//                     <p>Company: {result.company}</p>
//                     <p>Workplace: {result.workPlace}</p>
//                     <p>Job Location: {result.jobLocation}</p>
//                     <p>Job Type: {result.jobType}</p>
//                     <p>Skills: {result.skills}</p>
//                   </JobInfo>
//                 </ListItem>
//               ))}
//           </List>
//         </Section>
//       </Wrapper>
//     </>
//   );
// };

// export default SearchResultPage;
