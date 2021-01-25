import React, { useEffect, useState } from "react";
import "./Profile.css";
import profilepic from "./Group 234.png";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import axios from "axios";
import BlogCard from "../Blog_Cards/BlogCard";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const Profile = ({ userInfo }) => {
  let [user, setUser] = useState({});
  const history = useHistory();
  const [userblogs, setUserblogs] = useState([]);

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

  let c = localStorage.getItem("token");

  useEffect(() => {
    let a = localStorage.getItem("token");
    if (a !== null) {
      let u = parseJwt(a);
      axios
        .get(`http://localhost/api/blog/user/${u.username}`)
        .then((res) => {
          console.log(res.data);
          setUserblogs(res.data);
          setUser(u);
        })
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, [c, history]);

  return (
    <div className="profile">
      <section>
        <div className="profile__col1">
          <span className="profile__col1__Container">
            <img src={profilepic} alt="some kid walking" />
            <Button className="createBlog__btn">
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
              <Button className="change__btn">Change Password</Button>
              <Button className="change__btn">Change E-mail</Button>
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

    // <div className="profile">
    //   <div className="Pcol1">
    //     <div className="Pcol1__row1">
    //       <div className="profile__container">
    //         {/* <img src={profilepic} alt="" /> */}
    //       </div>
    //     </div>
    //     <div className="Pcol1__row2">
    //       <Button className="createBlog__btn">
    //         Create Blog
    //         <ArrowRightAltOutlinedIcon />
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="Pcol2">
    //     <div className="Pcol2__row1">
    //       <div className="Pcol2__row1__col1">
    //         <h1>{user.username}</h1>
    //         <p>Account Created at</p>
    //       </div>
    //       <div className="Pcol2__row1__col2">
    //         <Button className="secondary__btn">Change Password</Button>
    //         <Button
    //           onClick={() => {
    //             handleModalOpen();
    //           }}
    //           className="secondary__btn"
    //         >
    //           Change E-mail
    //         </Button>
    //         <Modal
    //           aria-labelledby="transition-modal-title"
    //           aria-describedby="transition-modal-description"
    //           className="Email__modal"
    //           open={openModal}
    //           onClose={handleModalClose}
    //           closeAfterTransition
    //           BackdropComponent={Backdrop}
    //           BackdropProps={{
    //             timeout: 500,
    //           }}
    //         >
    //           <Fade in={openModal}>
    //             <div className="Email__modal__paper">
    //               <form
    //                 onSubmit={(e) => {
    //                   e.preventDefault();
    //                   console.log(newEmail);
    //                 }}
    //               >
    //                 <input
    //                   value={newEmail}
    //                   onChange={(e) => {
    //                     setNewEmail(e.target.value);
    //                   }}
    //                   type="email"
    //                   placeholder="xyz@myemail.com"
    //                 />
    //                 <Button type="submit" className="changeEmail__btn">
    //                   Change Email
    //                 </Button>
    //               </form>
    //             </div>
    //           </Fade>
    //         </Modal>
    //       </div>
    //     </div>
    //     <div className="Pcol2__row2">
    //       <div className="Pcol2__row2__row1">
    //         <p>Blogs by you</p>
    //       </div>
    //       <div className="Pcol2__row2__row2">
    //         {userblogs.map((blog) => (
    //           <BlogCard
    //             key={blog.title}
    //             title={blog.title}
    //             author={blog.author}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
