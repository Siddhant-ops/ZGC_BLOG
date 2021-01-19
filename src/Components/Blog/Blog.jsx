import React from "react";
import "./blog.css";

const Blog = () => {
  return (
    <div className="wrapper">
      <nav></nav>
      <div className="blog">
        <p>15 MIN READ</p>
        <h2>Learn Svelte in 15 minutes As Well As Some Rest API</h2>
        <h5>By Mihir Sodawalla</h5>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum. Quas
          consectetur adipiscing elit audiam virtute ut, case utamur fuisset eam
          ut, iisque accommodare an eam. Reque blandit qui eu, cu vix nonumy
          volumus. Legendos intellegam id usu, vide oporteat vix eu, id illud
          principes has. Nam tempor utamur gubergren no.
        </span>
      </div>
      <div className="comments">
        <h3>Comments</h3>
        <input type="text" placeholder="Write A Comment" />
        <button className="primary_btn">Submit Comment</button>
        <div className="blog_comments">
          <ul>
            <li>
              <p>Yash Shah</p>
              <h4>Amazing Content!</h4>
            </li>
            <li>
              <p>ShifaliAm</p>
              <h4>Zing Zing, Amazing!</h4>
            </li>
            <li>
              <p>FenaJ</p>
              <h4>Nicely Explained.</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
