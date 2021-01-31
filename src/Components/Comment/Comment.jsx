import React from "react";
import "./Comment.css";
import { IconButton } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { useStateValue } from "../../UserContext/Stateprovider";
import axios from "axios";

const Comment = ({ comment_id, blog_id, username, content }) => {
  const [{ userInfo }, dispatch] = useStateValue();

  const deleteComment = async () => {
    if (userInfo !== null) {
      var data = {
        comment_id: comment_id,
        blog_id: blog_id,
      };

      const checkToken = localStorage.getItem("token");

      var config = {
        method: "delete",
        url: "http://localhost/api/comment/remove",
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="comment__Container xyz-in" xyz="fade up-5 stagger">
      {userInfo.username === username ? (
        <div className="comment__top">
          <h5>{username}</h5>
          <IconButton onClick={deleteComment} className="delete__btn">
            <DeleteOutline />
          </IconButton>
        </div>
      ) : (
        <h5>{username}</h5>
      )}
      <h4>{content}</h4>
    </div>
  );
};

export default Comment;
