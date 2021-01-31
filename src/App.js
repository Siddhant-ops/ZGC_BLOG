import "./App.css";
import Nav from "./Components/Nav/Nav";
import Welcome from "./Components/Welcome/Welcome";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Err404 from "./Components/404/Err404";
import Explore from "./Components/Explore/Explore";
import { useEffect, useState } from "react";
import Footer from "./Components/Footer/Footer";
import { useStateValue } from "./UserContext/Stateprovider";
import Blog from "./Components/Blog/Blog";
import { actionTypes } from "./UserContext/reducer";
import CreateBlog from "./Components/CreateBlog/CreateBlog";

function App() {
  const [{ userInfo }, dispatch] = useStateValue();
  const [user, setUser] = useState(null);
  const [checkuser, setCheckuser] = useState(false);

  const checkToken = localStorage.getItem("token");

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
    if (checkToken !== "" && checkToken !== null) {
      var Tokeniat = new Date(parseJwt(checkToken).iat);
      var Tokenexp = new Date(parseJwt(checkToken).exp);
      console.log(+Tokenexp >= +Tokeniat);
      setUser(localStorage.getItem("token"));
      setCheckuser(true);
    }
    if (userInfo === null && checkToken === user && checkToken !== null) {
      dispatch({
        type: actionTypes.SET_USER,
        userInfo: parseJwt(checkToken),
      });
    }
  }, [userInfo, user]);
  return (
    <div>
      <Nav userinfo={user} />
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/explore" exact component={Explore} />
        {checkuser && (
          <Route path="/profile">
            <Profile userInfo={user} />
          </Route>
        )}
        {checkuser && <Route path={"/blog/:blogname"} component={Blog} />}
        {checkuser && <Route path={"/createblog"} component={CreateBlog} />}
        {!checkuser && <Route path="/login" component={Login} />}
        <Route path="" component={Err404} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
