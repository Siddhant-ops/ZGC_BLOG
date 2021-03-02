import { Button, IconButton } from "@material-ui/core";
import "./Nav.css";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateValue } from "../../UserContext/Stateprovider";
import { Menu } from "@material-ui/icons";

const Nav = ({ userObj }) => {
  const [{ userInfo }, dispatch] = useStateValue();
  const [user, setUser] = useState([]);
  const [checkuser, setCheckuser] = useState(true);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const checkToken = localStorage.getItem("token");

  useEffect(() => {
    if (
      checkToken !== "" &&
      checkToken !== null &&
      checkToken !== undefined &&
      checkToken !== "undefined"
    ) {
      let a = parseJwt(checkToken);
      setUser(a);
      setCheckuser(false);
    }
    if (userInfo === null) {
      setCheckuser(true);
      setUser([]);
    }
  }, [checkToken, userInfo]);

  return (
    <nav>
      <div className="nav__box">
        <span className="nav__searchbox">
          <SearchIcon className="searchIcon" />
          <input label="search" placeholder="Search" type="text" />
        </span>
        <IconButton
          onTouchStart={() => {
            document
              .querySelector(".Nav__list")
              .classList.toggle("Nav__listOpen");
          }}
          className="menu"
        >
          <Menu />
        </IconButton>
      </div>
      <ul className="Nav__list">
        <li>
          <Button className="nav__btn">
            <NavLink
              exact
              to="/"
              className="btn__links"
              activeClassName="active__link"
            >
              Home
            </NavLink>
          </Button>
        </li>
        <li>
          <Button className="nav__btn">
            <NavLink
              exact
              to="/explore"
              className="btn__links"
              activeClassName="active__link"
            >
              Explore
            </NavLink>
          </Button>
        </li>
        <li>
          {checkuser ? (
            <Button className="nav__btn">
              <NavLink
                exact
                to="/login"
                className="btn__links"
                activeClassName="active__link"
              >
                Login / Signup
              </NavLink>
            </Button>
          ) : (
            <Button className="nav__btn">
              <NavLink
                exact
                to="/profile"
                className="btn__links"
                activeClassName="active__link"
              >
                <span className="username">{user.username}</span>
              </NavLink>
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
