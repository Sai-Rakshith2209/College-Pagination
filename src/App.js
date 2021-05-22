import React, { useState, useEffect } from "react";

import logo from "./logo.svg";

import axios from "axios";
import "./App.css";
import { Posts } from "./components/Posts";
import { Pagination } from "./components/Pagination";

function App() {
  const [dekhocollegeposts, setPosts] = useState([]);
  const [collageLoader, setcollageLoader] = useState(false);
  const [collageCurrentPage, setcollageCurrentPage] = useState(1);
  const [collegeDekhopostsPerPage] = useState(10);
  useEffect(() => {
    const fetchCollegeDekhoPosts = async () => {
      setcollageLoader(true);
      const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setcollageLoader(false);
    };
    fetchCollegeDekhoPosts();
  }, []);

  // Get Current Posts

  const indexOfLastPost = collageCurrentPage * collegeDekhopostsPerPage;
  const indexOfFirstPost = indexOfLastPost - collegeDekhopostsPerPage;
  const currentPosts = dekhocollegeposts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Paginate Change Page Function

  const paginate = (collagePageNumber) =>
    setcollageCurrentPage(collagePageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My College Dekho Pagination Logic</h1>
      <Posts posts={currentPosts} collageLoader={collageLoader} />
      <Pagination
        postsPerPage={collegeDekhopostsPerPage}
        totalPosts={dekhocollegeposts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
