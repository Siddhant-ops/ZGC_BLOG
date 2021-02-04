import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./Login.css";
import mobile from "./Saly-12.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../UserContext/Stateprovider";
import { actionTypes } from "../../UserContext/reducer";

const Login = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const history = useHistory();
  const [form, setForm] = useState(true);

  // For login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPasswd, setLoginPasswd] = useState("");

  // For Signup
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  // Error Handling
  var forward = true;

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

  // Login Function
  const login = async () => {
    const data = {
      email: loginEmail,
      password: loginPasswd,
    };
    await axios
      .post("http://localhost/api/auth/local/login", data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          dispatch({
            type: actionTypes.SET_USER,
            userInfo: parseJwt(res.data.token),
          });
          forward = true;
        } else {
          forward = false;
        }
      })
      .catch(function (error) {
        // Error
        if (error.response) {
          forward = false;
          document.querySelector(".invalid").style.display = "block";
        }
      });

    if (forward) {
      setLoginEmail("");
      setLoginPasswd("");
      history.push("/profile");
    }
  };

  // Signup Function
  const signup = async () => {
    const data = {
      email: email,
      username: username,
      password: passwd,
    };

    await axios
      .post("http://localhost/api/auth/local/register", data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          dispatch({
            type: actionTypes.SET_USER,
            userInfo: parseJwt(res.data.token),
          });
          forward = true;
        } else {
          forward = false;
        }
      })
      .catch(function (error) {
        // Error
        if (error.response) {
          forward = false;
          document.querySelector(".invalid").style.display = "block";
        }
      });
    if (forward) {
      setEmail("");
      setPasswd("");
      setusername("");
      history.push("/profile");
    }
  };

  const loginDisable = () => {
    if (loginEmail === "" && loginPasswd === "") {
      return true;
    } else {
      return false;
    }
  };
  const SigninDisable = () => {
    if (username === "" && email === "" && passwd === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="login">
      <div className="login__Col1">
        <img src={mobile} alt="Some random Mobile" />
      </div>
      <div className="login__Col2">
        {form ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="login__form"
          >
            <h5 className="invalid xyz-in" xyz="fade down-5 stagger">
              Invalid Username or Password
            </h5>
            <div className="input__Container">
              <TextField
                required
                autoComplete="true"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                type="email"
                color="primary"
                label="Email"
              />
            </div>
            <div className="input__Container">
              <TextField
                required
                autoComplete="true"
                value={loginPasswd}
                onChange={(e) => {
                  setLoginPasswd(e.target.value);
                }}
                color="primary"
                type="password"
                label="Password"
              />
            </div>
            <Button
              disabled={loginDisable()}
              type="submit"
              className="login__btn"
            >
              Login
            </Button>
            <p className="already">
              Don't have an Account ?{" "}
              <span
                onClick={() => {
                  setForm(false);
                }}
              >
                Signup
              </span>
            </p>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signup();
            }}
            className="login__form"
          >
            <h5 className="invalid xyz-in" xyz="fade down-5 stagger">
              Invalid Username or Password
            </h5>
            <div className="input__Container">
              <TextField
                required
                autoComplete="true"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                type="text"
                color="primary"
                label="Username"
              />
            </div>
            <div className="input__Container">
              <TextField
                required
                autoComplete="true"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                color="primary"
                type="email"
                label="Email"
              />
            </div>
            <div className="input__Container">
              <TextField
                required
                autoComplete="true"
                value={passwd}
                onChange={(e) => {
                  setPasswd(e.target.value);
                }}
                color="primary"
                type="password"
                label="Password"
              />
            </div>
            <Button
              disabled={SigninDisable()}
              type="submit"
              className="login__btn"
            >
              Signup
            </Button>
            <p className="already">
              Already have an Account ?{" "}
              <span
                onClick={() => {
                  setForm(true);
                }}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
