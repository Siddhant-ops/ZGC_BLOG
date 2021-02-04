import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../UserContext/Stateprovider";
import "./Footer.css";
import logo from "./Group 225.png";

const Footer = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const [checkUser, setCheckUser] = useState(false);

  useEffect(() => {
    if (userInfo !== null) {
      setCheckUser(true);
    }
  }, [userInfo]);

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
            <Link className="no__Underline" to="/">
              <h5 className="site__links__p">/home</h5>
            </Link>
            {checkUser ? (
              <Link className="no__Underline" to="/profile">
                <h5 className="site__links__p">/profile</h5>
              </Link>
            ) : (
              <Link className="no__Underline" to="/login">
                <h5 className="site__links__p">/login</h5>
              </Link>
            )}

            <Link className="no__Underline" to="/explore">
              <h5 className="site__links__p">/explore</h5>
            </Link>
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
