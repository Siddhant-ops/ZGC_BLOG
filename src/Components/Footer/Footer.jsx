import React from "react";
import "./Footer.css";
import logo from "./Group 225.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer__main">
        <div className="footer__col1">
          <h4>Contact Designer & Developer</h4>
          <h5>
            <a href="mailto:mihirsodawalla01@gmail.com ">
              mihirsodawalla01@gmail.com
            </a>
          </h5>
          <h5>
            <a href="mailto:siddhantdalvi3@gmail.com">
              siddhantdalvi3@gmail.com
            </a>
          </h5>
        </div>
        <div className="footer__col2">
          <h4>Quick Links</h4>
          <span className="site__links">
            <h5 className="site__links__p">/home</h5>
            <h5 className="site__links__p">/search</h5>
            <h5 className="site__links__p">/login</h5>
            <h5 className="site__links__p">/explore</h5>
          </span>
        </div>
        <div className="footer__col3">
          <img src={logo} alt="" />
          <h5>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/kessc_zerogravityclub/"
            >
              kessc_zerogravityclub
            </a>
          </h5>
        </div>
      </div>
      <div className="footer__last">
        <h5>Made With 💞 By ZeroGravityClub</h5>
      </div>
    </footer>
  );
};

export default Footer;
