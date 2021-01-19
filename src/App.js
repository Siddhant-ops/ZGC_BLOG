import "./App.css";
import Nav from "./Components/Nav/Nav";
import Welcome from "./Components/Welcome/Welcome";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Err404 from "./Components/404/Err404";
import Explore from "./Components/Explore/Explore";
import { useEffect, useState } from "react";

function App() {
  // const [{ user }, dispatch] = useStateValue();

  const [user, setUser] = useState(null);
  const [checkuser, setCheckuser] = useState(false);

  useEffect(() => {
    if (user !== "") {
      setUser(localStorage.getItem("token"));
      setCheckuser(true);
    }
  }, []);

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
      {/* <Router>
        <Nav />
        <Switch>
          {!user ? (
            <div>
              <Route path="/" exact component={Welcome} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Signup} />
              <Route path="" exact component={Err404} />
            </div>
          ) : (
            <p>Hello</p>
          )}
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
