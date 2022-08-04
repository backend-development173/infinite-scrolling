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
  const getData = async function () {
    await fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        setPost(data.results);
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
      <div className="list">
        <ul>
          {post.map((person) => {
            return (
              <div className="wrapperr">
                <li key={person.phone}>{person.name.first}</li>
                <img
                  src={person.picture.thumbnail}
                  alt={person.picture.thumbnail}
                />
              </div>
            );
          })}
        </ul>
      </div>
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
