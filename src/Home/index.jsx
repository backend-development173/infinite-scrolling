
import InfiniteScroll from "react-infinite-scroll-component"; 
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [post, setPost] = useState([]);
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const getData = (count=15)=>{
   axios.get(`https://randomuser.me/api/?results=${count}`)
      .then((response) => {
        setPost([...post, ...response.data.results]);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getData();
    const loggedIn = localStorage.getItem("authenticated");
    console.log(loggedIn);
    if (loggedIn) {
      setauthenticated(loggedIn);
    }
  }, []);

  const mapper = (
    <div className="aligncenter">
      <InfiniteScroll
                dataLength={post}
                next={() => getData(10)}  
                hasMore={true}
                loader={
                  <img
                    src="https://th.bing.com/th/id/OIP.aNr2Az1aHm9Aqi0V-SVV-QHaFj?w=212&h=180&c=7&o=5&dpr=1.2&pid=1.7"
                    alt="loading"
                  />
                }  
              >
          <div className="list">
        <ul>
          {post.map((photos) => {
            return (
              <div className="wrapperr">
                <li key={photos.phone}>{photos.name.first}</li>
                <img
                  src={photos.picture.thumbnail}
                  alt={photos.picture.thumbnail}
                />
              </div>
            );
          })}
        </ul>
      </div>
              </InfiniteScroll>
     
    </div>
  );
  if (!authenticated) {
    return <h1> not authenticated </h1>;
  } else {
    if (loading) {
      return <div className="loader"></div>;
    } else {
      return (
        <>
          <div className="home_container">
            <header className="home_header">
              <button
                onClick={() => {
                  setauthenticated(false);
                  navigate("/");
                }}
              >
                Logout
              </button>
            </header>
            {mapper}
          </div>
        </>
      );
    }
  }
};

export default Home;
