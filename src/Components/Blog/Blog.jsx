import { Button } from "@material-ui/core";
import { ArrowRightAlt } from "@material-ui/icons";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useStateValue } from "../../UserContext/Stateprovider";
import Comment from "../Comment/Comment";
import "./blog.css";

const Blog = (props) => {
  useLayoutEffect(() => {
    document.querySelector(".Nav__list").classList.remove("Nav__listOpen");
  });

  // userInfo
  const [{ userInfo }, dispatch] = useStateValue();

  console.log(props);

  // Data for blog
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [blogid, setBlogid] = useState("");

  // writting comment
  const [writecomment, setWritecomment] = useState("");
  const [checkUser, setCheckUser] = useState(false);

  useEffect(() => {
    setTitle(props.location.state.title);
    setAuthor(props.location.state.author);
    setContent(props.location.state.content);
    setBlogid(props.location.state.id);
    if (userInfo !== null) {
      setCheckUser(true);
    }

    if (blogid !== "" && blogid !== undefined) {
      axios
        .get(`http://localhost/api/comment/b/${blogid}`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [
    blogid,
    userInfo,
    props.location.state.title,
    props.location.state.author,
    props.location.state.content,
    props.location.state.id,
    writecomment,
  ]);

  const postComment = async () => {
    if (userInfo !== null) {
      var data = {
        blog_id: blogid,
        username: userInfo.username,
        content: writecomment,
      };

      const checkToken = localStorage.getItem("token");

      var config = {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      };

      await axios
        .post("http://localhost/api/comment/create", data, config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setWritecomment("");
    }
  };

  return (
    <div className="Blogwrapper">
      <div className="blog">
        <p>15 MIN READ</p>
        <h2>{title}</h2>
        <h5>By {author}</h5>
        <MDEditor
          hideToolbar={true}
          value={content}
          className="Editor"
          preview="preview"
        />
      </div>
      <div className="comments">
        <h3>Comments</h3>
        {checkUser ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postComment();
            }}
          >
            <input
              value={writecomment}
              onChange={(e) => {
                setWritecomment(e.target.value);
              }}
              type="text"
              placeholder="Write A Comment"
            />
            <Button
              disabled={writecomment === ""}
              type="submit"
              className="primary_btn"
            >
              Submit Comment
            </Button>
          </form>
        ) : (
          <div className="please__login">
            <h4>Please Login in order to comment on Blogs</h4>
            <Button className="primary_btn">
              Go to Login <ArrowRightAlt />
            </Button>
          </div>
        )}
        <div className="blog__comments">
          {comments.length === 0 ? (
            <h3>No Comments yet</h3>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment_id={comment._id}
                blog_id={blogid}
                username={comment.username}
                content={comment.content}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
