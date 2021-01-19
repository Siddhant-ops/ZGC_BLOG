import { Button } from "@material-ui/core";
import "./Nav.css";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateValue } from "../../UserContext/Stateprovider";

const Nav = ({ userinfo }) => {
  // const [{ user }, dispatch] = useStateValue();
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

  useEffect(() => {
    if (userinfo !== null) {
      setUser(parseJwt(userinfo));
      setCheckuser(false);
    } else {
      console.log(userinfo);
    }
  }, [userinfo]);

  return (
    <nav>
      <div className="nav__box">
        <div className="nav__searchbar">
          <SearchIcon className="SearchIcon" />
          <input placeholder="Search" type="text" />
        </div>
        <div className="nav__navButtons">
          <Button className="nav__Buttons">
            <NavLink exact to="/" className="link__a" activeClassName="active1">
              Home
            </NavLink>
          </Button>
          <Button id="explore" className="nav__Buttons">
            <NavLink
              to="/explore"
              className="link__a"
              activeClassName="active1"
            >
              Explore
            </NavLink>
          </Button>
          {checkuser && (
            <Button id="login" className="nav__Buttons">
              <NavLink
                to="/login"
                className="link__a"
                activeClassName="active1"
              >
                Login
              </NavLink>
            </Button>
          )}
          {!checkuser && (
            <Button id="login" className="nav__Buttons">
              <NavLink
                to="/profile"
                className="link__a"
                activeClassName="active1"
              >
                {`${user.username}`}
              </NavLink>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
