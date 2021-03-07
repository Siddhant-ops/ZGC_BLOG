import React, { useLayoutEffect } from "react";
import "./404.css";
import Standing from "./Group 235.png";

const Err404 = () => {
  useLayoutEffect(() => {
    document.querySelector(".Nav__list").classList.remove("Nav__listOpen");
  });

  return (
    <div className="wrapper">
      <div className="left-col">
        <div>
          <h1>Error 404</h1>
          <h5>Oops! Couldn't Find That Page</h5>
        </div>
        <div className="action">
          <a href="./" className="primary_btn">
            Take Me Home
          </a>
          <a href="./" className="secondary_btn">
            Explore Some Content
          </a>
        </div>
      </div>
      <div className="right-col">
        <img src={Standing} alt="" />
      </div>
    </div>
  );
};

export default Err404;
