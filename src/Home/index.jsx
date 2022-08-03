import React, { useEffect, useState } from "react";
import "./index.css";
const Home = ({ isSubmitted }) => {
  const [post, setPost] = useState([]);
  const getData = async function () {
    await fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        setPost(data.results);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const mapper = (
    <>
      <div className="list">
        <ul>
          {post.map((person, i) => {
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
    </>
  );

  return (
    <>
      <div className="home_container">{isSubmitted ? mapper : null}</div>
    </>
  );
};

export default Home;
