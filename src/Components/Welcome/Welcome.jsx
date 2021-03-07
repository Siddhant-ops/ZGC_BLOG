import { Button } from "@material-ui/core";
import React, { useLayoutEffect } from "react";
import "./Welcome.css";
import "./Welcome-Responsive.css";
import laptopKid from "./Saly-13.svg";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../UserContext/Stateprovider";

const Welcome = () => {
  useLayoutEffect(() => {
    document.querySelector(".Nav__list").classList.remove("Nav__listOpen");
  });

  const [{ userInfo }, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <div className="welcome">
      <section className="welcome__section">
        <div className="welcome__col1">
          <span className="welcome__info1">
            <h5>By Zero Gravity Club</h5>
            <hr />
          </span>
          <span className="welcome__info2">
            <h1>Welcome To Blogs</h1>
            <h3>
              Lets discuss stuff related to Coding, Design Marketing,
              Photography and all the new stuff you know about.
            </h3>
          </span>

          <span className="welcome__info4">
            <Button
              className="welcome__btn primary__btn"
              onClick={() => {
                history.push("/explore");
              }}
            >
              Get Started
              <ArrowRightAltIcon />
            </Button>
            {!userInfo && (
              <Button
                onClick={() => {
                  history.push("/login");
                }}
                className="welcome__btn secondary__btn "
              >
                Create an Account
              </Button>
            )}
          </span>
        </div>
        <div className="welcome__col2">
          <img src={laptopKid} alt="some kid with Laptop" />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
