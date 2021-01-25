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

function App() {
  const [{ userInfo }, dispatch] = useStateValue();
  const [user, setUser] = useState(null);
  const [checkuser, setCheckuser] = useState(false);

  const checkToken = localStorage.getItem("token");

  useEffect(() => {
    if (checkToken !== "") {
      setUser(localStorage.getItem("token"));
      setCheckuser(true);
    }
  }, [userInfo]);
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
        <Route path="/login" component={Login} />
        <Route path="" component={Err404} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
