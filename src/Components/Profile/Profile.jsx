import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Profile.css";
import profilepic from "./Group 234.png";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import axios from "axios";
import BlogCard from "../Blog_Cards/BlogCard";
import { useHistory } from "react-router-dom";
import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import { actionTypes } from "../../UserContext/reducer";
import { useStateValue } from "../../UserContext/Stateprovider";
import { CheckCircleOutline } from "@material-ui/icons";

const Profile = ({ userObj }) => {
  useLayoutEffect(() => {
    document.querySelector(".Nav__list").classList.remove("Nav__listOpen");
  });

  // UserInfo from Context
  const [{ userInfo }, dispatch] = useStateValue();

  // User
  let [user, setUser] = useState({});

  // History
  const history = useHistory();

  // User-Blogs
  const [userblogs, setUserblogs] = useState([]);

  // ChangeEmail
  const [newMail, setNewMail] = useState("");
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);

  const modalOpen = () => {
    setOpenEmailModal(true);
  };

  const modalClose = () => {
    setOpenEmailModal(false);
  };

  // getBlogs
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
    if (userObj !== null) {
      let u = parseJwt(userObj);
      axios
        .get(`http://localhost/api/blog/user/${u.username}`)
        .then((res) => {
          setUserblogs(res.data);
          setUser(u);
        })
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, [userObj, history]);

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch({
      type: actionTypes.SET_USER,
      userInfo: null,
    });
    history.push("/");
  };

  const ChangeEmail = () => {
    var data = {
      new_email: newMail,
    };

    var config = {
      method: "patch",
      url: "http://localhost/api/user/change-email",
      headers: {
        Authorization: `Bearer ${userObj}`,
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        setNewMail("");
        setEmailChanged(true);
        setTimeout(() => {
          modalClose();
        }, 1500);
      })
      .catch((err) => {
        if (err.response) {
          document.querySelector(".sameEmail").style.display = "block";
        }
      });
  };

  return (
    <div className="profile">
      <section className="section__Profile">
        <Modal
          className="Modal"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEmailModal}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openEmailModal}>
            <div className="Modal__Container">
              {emailChanged ? (
                <div className="emailChanged">
                  <CheckCircleOutline />
                  <h3>Email is Changed</h3>
                </div>
              ) : (
                <div>
                  <h4>Change Email</h4>
                  <h5 className="sameEmail">Error while updating Email </h5>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      ChangeEmail();
                    }}
                    className="formChangeEmail"
                  >
                    <TextField
                      type="email"
                      value={newMail}
                      onChange={(e) => {
                        setNewMail(e.target.value);
                      }}
                      variant="outlined"
                      color="secondary"
                      className="emailInput"
                      label="Change Email"
                    />
                    <Button
                      disabled={newMail === ""}
                      className="change__Emailbtn"
                      type="submit"
                    >
                      Change Email
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </Fade>
        </Modal>
        <div className="profile__col1">
          <span className="profile__col1__Container">
            <img src={profilepic} alt="some kid walking" />
            <Button
              onClick={() => {
                history.push("/createblog");
              }}
              className="createBlog__btn"
            >
              Create Blog <ArrowRightAltOutlinedIcon />
            </Button>
          </span>
        </div>
        <div className="profile__col2">
          <div className="Account">
            <span className="Account__col1">
              <h1>{user.username}</h1>
              <h4>
                Account created at <span>5 Jan</span>
              </h4>
            </span>
            <span className="Account__col2">
              <Button
                onClick={() => {
                  logOut();
                }}
                className="change__btn"
              >
                Log Out
              </Button>
              <span className="ChangeEmailPasswd">
                <Button className="change__btn">Change Password</Button>
                <Button
                  className="change__btn"
                  onClick={() => {
                    modalOpen();
                    setEmailChanged(false);
                  }}
                >
                  Change Email
                </Button>
              </span>
            </span>
          </div>
          <div className="Account__cards">
            <h5>Blogs by you</h5>
            <hr />
            <div className="Account__Container">
              {userblogs.length > 0 ? (
                userblogs.map((blog) => (
                  <BlogCard
                    key={blog.title}
                    id={blog._id}
                    profile={true}
                    author={blog.author}
                    title={blog.title}
                    content={blog.content}
                    comments={blog.comments}
                  />
                ))
              ) : (
                <h1>No blogs by {user.username}</h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
