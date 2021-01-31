import { Button } from "@material-ui/core";
import React from "react";
import "./Welcome.css";
import "./Welcome-Responsive.css";
import laptopKid from "./Saly-13.svg";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../UserContext/Stateprovider";

const Welcome = () => {
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
          </span>
          <span className="welcome__info3">
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
    // <div className="welcome">
    //   <div className="col1">
    //     <div className="col1__main">
    //       <div className="group1">
    //         <p>by zero gravity club</p>
    //         <div className="line"></div>
    //       </div>
    //       <div className="group2">
    //         <p>Welcome To Blogs</p>
    //         <p>
    //           Lets discuss stuff related to Coding, Design Marketing,
    //           Photography and all the new stuff you know about.
    //         </p>
    //       </div>
    //       <div className="group3">
    //         <div className="button__group">
    //           <Button className="welcome__buttons primary__Button">
    //             Get Started
    //             <ArrowRightAltIcon />
    //           </Button>
    //           <Button className="welcome__buttons secondary__Button">
    //             Create An Account
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col2">
    //     <img src={laptopKid} className="LaptopKid" alt="some kid with Laptop" />
    //   </div>
    // </div>
  );
};

export default Welcome;
