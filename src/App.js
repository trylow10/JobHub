// Libraries
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateWidth } from "./app/slice/widthSlice"; // redux

// Functional Components
import Welcome from "./Pages/Welcome";
import Feed from "./Pages/Feed";
import ForgetPass from "./Pages/ForgetPass";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Post from "./Pages/Post";
import Job from "./Pages/Job";
import JobDetail from "./Pages/JobDetail";
import CreateJob from "./Pages/CreateJob";
import ManageJob from "./Pages/ManageJob";
import EditJob from "./Pages/EditJob";
import ViewApplicant from "./Pages/ViewApplicant";
import SearchPage from "./Pages/SearchPage";
import RecommendedPost from "./Pages/RecomendedPost";
function App() {
  const dispatch = useDispatch();

  // update application with change in screen-width
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWidth());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recommend" element={<RecommendedPost />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/job" element={<Job />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/manage-job/edit-job/:id" element={<EditJob />} />
          <Route path="/manage-job/view/:id" element={<ViewApplicant />} />
          <Route path="/manage-job" element={<ManageJob />} />
          <Route path="/forget-pass" element={<ForgetPass />} />
          <Route path="/join-now" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
