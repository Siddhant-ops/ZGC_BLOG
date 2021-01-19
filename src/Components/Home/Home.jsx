import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Home.css";
import img from "./undraw_Blog_post_re_fy5x.svg";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <div className="home__home">
        <div className="home__homeContent">
          <p className="home__homeTitle">Publishing platform for students</p>
        </div>
        <div className="home__homeImg">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
