import { Button } from "@material-ui/core";
import React from "react";
import "./Welcome.css";
import laptopKid from "./Saly-13.svg";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="col1">
        <div className="col1__main">
          <div className="group1">
            <p>by zero gravity club</p>
            <div className="line"></div>
          </div>
          <div className="group2">
            <p>Welcome To Blogs</p>
            <p>
              Lets discuss stuff related to Coding, Design Marketing,
              Photography and all the new stuff you know about.
            </p>
          </div>
          <div className="group3">
            <div className="button__group">
              <Button className="welcome__buttons primary__Button">
                Get Started
                <ArrowRightAltIcon />
              </Button>
              <Button className="welcome__buttons secondary__Button">
                Create An Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2">
        <img src={laptopKid} className="LaptopKid" alt="some kid with Laptop" />
      </div>
    </div>
  );
};

export default Welcome;
