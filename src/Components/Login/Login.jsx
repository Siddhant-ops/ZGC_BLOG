import React, { useState } from "react";
import { useStateValue } from "../../UserContext/Stateprovider";
import { Button } from "@material-ui/core";
import "./Login.css";
import mobile from "./Saly-12.png";
import axios from "axios";
import { actionTypes } from "../../UserContext/reducer";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [form, setForm] = useState(true);

  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  // const login = async () => {
  //   const data = {
  //     email: email,
  //     password: passwd,
  //   };
  //   await axios
  //     .post("http://localhost/api/auth/local/login", data)
  //     .then((res) => {
  //       const userInfo = res.data.token;
  //       localStorage.setItem("token", res.data.token);
  //       dispatch({
  //         type: actionTypes.SET_USER,
  //         user: userInfo,
  //       });
  //     })
  //     .catch((err) => console.log(err));

  //   setEmail("");
  //   setPasswd("");
  //   history.push("/profile");
  // };

  const login = async () => {
    const data = {
      email: email,
      password: passwd,
    };
    await axios
      .post("http://localhost/api/auth/local/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPasswd("");
    history.push("/profile");
  };

  // Signup Function
  const signup = async () => {
    const data = {
      email: email,
      username: username,
      password: passwd,
    };

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

    await axios
      .post("http://localhost/api/auth/local/register", data)
      .then((res) => {
        const userInfo = parseJwt(res.data.token);
        dispatch({
          type: actionTypes.SET_USER,
          user: userInfo,
        });
      })
      .catch((err) => console.log(err));
    setEmail("");
    setPasswd("");
    // history.push("/profile");
  };

  return (
    <div className="login">
      <div className="column1">
        <img src={mobile} alt="" />
      </div>
      <div className="column2">
        {form ? (
          <div className="form">
            <div className="form__div">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                <div className="form__groupContainer">
                  <div className="form__container">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type="email"
                      name="Email"
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="Email" className="labelName">
                      <span className="contentName">Email</span>
                    </label>
                  </div>
                </div>
                <div className="form__groupContainer">
                  <div className="form__container">
                    <input
                      onChange={(e) => {
                        setPasswd(e.target.value);
                      }}
                      value={passwd}
                      id="passwd"
                      type="password"
                      name="Password"
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="Password" className="labelName">
                      <span className="contentName">Password</span>
                    </label>
                  </div>
                </div>
                <Button type="submit" className="login__btn">
                  Login
                </Button>
              </form>
            </div>
            <p className="already">
              Already have an Account ?{" "}
              <span
                onClick={() => {
                  setForm(false);
                }}
              >
                Signup
                {/* <Link to="/register">Signup</Link> */}
              </span>
            </p>
          </div>
        ) : (
          <div className="form__1">
            <div className="form__div__1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signup();
                }}
              >
                <div className="form__groupContainer__1">
                  <div className="form__container__1">
                    <input
                      onChange={(e) => {
                        setusername(e.target.value);
                      }}
                      value={username}
                      type="email"
                      name="Username"
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="Username" className="labelName__1">
                      <span className="contentName__1">Username</span>
                    </label>
                  </div>
                </div>
                <div className="form__groupContainer__1">
                  <div className="form__container__1">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type="email"
                      name="Email"
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="Email" className="labelName__1">
                      <span className="contentName__1">Email</span>
                    </label>
                  </div>
                </div>
                <div className="form__groupContainer__1">
                  <div className="form__container__1">
                    <input
                      onChange={(e) => {
                        setPasswd(e.target.value);
                      }}
                      value={passwd}
                      id="passwd"
                      type="password"
                      name="Password"
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="Password" className="labelName__1">
                      <span className="contentName__1">Password</span>
                    </label>
                  </div>
                </div>
                <Button type="submit" className="login__btn__1">
                  Signup
                </Button>
              </form>
            </div>
            <p className="already__1">
              Already have an Account ?{" "}
              <span
                onClick={() => {
                  setForm(true);
                }}
              >
                Login
                {/* <Link to="/login">Login</Link> */}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
