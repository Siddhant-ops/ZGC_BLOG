import React, { useEffect, useState } from "react";
import "./Profile.css";
import profilepic from "./Group 234.png";
import { Backdrop, Button, Fade, Modal } from "@material-ui/core";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { useStateValue } from "../../UserContext/Stateprovider";
import axios from "axios";
import BlogCard from "../Blog_Cards/BlogCard";
import { useHistory } from "react-router-dom";

const Profile = ({ userInfo }) => {
  // const [{ user }, dispatch] = useStateValue();
  let [user, setUser] = useState({});
  const [checkuser, setCheckuser] = useState(true);
  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [userblogs, setUserblogs] = useState([]);
  const [tp, setTp] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const changeEmail = () => {
    // axios.patch(`http://localhost/api/user/change-email`)
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
    let a = localStorage.getItem("token");
    console.log(a);
    if (a !== null) {
      let u = parseJwt(a);
      console.log(u.username);
      // setUser(localStorage.getItem("user"));
      // console.log(user);
      // let username = JSON.parse(user)["username"];
      axios
        .get(`http://localhost/api/blog/user/${u.username}`)
        .then((res) => setUserblogs(res.data))
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, [user]);

  // useEffect(() => {
  //   const a = async () => {
  //     let ui = parseJwt(userInfo);
  //     await setUser(ui);
  //   };
  //   console.log(a());
  //   console.log(user);
  //   axios
  //     .get(`http://localhost/api/blog/user/miri`)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // }, [userInfo]);

  return (
    <div className="profile">
      <div className="Pcol1">
        <div className="Pcol1__row1">
          <div className="profile__container">
            {/* <img src={profilepic} alt="" /> */}
          </div>
        </div>
        <div className="Pcol1__row2">
          <Button className="createBlog__btn">
            Create Blog
            <ArrowRightAltOutlinedIcon />
          </Button>
        </div>
      </div>
      <div className="Pcol2">
        <div className="Pcol2__row1">
          <div className="Pcol2__row1__col1">
            <h1>{user.username}</h1>
            <p>Account Created at</p>
          </div>
          <div className="Pcol2__row1__col2">
            <Button className="secondary__btn">Change Password</Button>
            <Button
              onClick={() => {
                handleModalOpen();
              }}
              className="secondary__btn"
            >
              Change E-mail
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className="Email__modal"
              open={openModal}
              onClose={handleModalClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModal}>
                <div className="Email__modal__paper">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log(newEmail);
                    }}
                  >
                    <input
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                      type="email"
                      placeholder="xyz@myemail.com"
                    />
                    <Button type="submit" className="changeEmail__btn">
                      Change Email
                    </Button>
                  </form>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
        <div className="Pcol2__row2">
          <div className="Pcol2__row2__row1">
            <p>Blogs by you</p>
          </div>
          <div className="Pcol2__row2__row2">
            {userblogs.map((blog) => (
              <BlogCard
                key={blog.title}
                title={blog.title}
                author={blog.author}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
