import { Button, IconButton } from "@material-ui/core";
import { ArrowRightAltRounded } from "@material-ui/icons";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../UserContext/Stateprovider";
import "./BlogCard.css";

const BlogCard = ({ id, profile, title, author, content, comments }) => {
  const [{ userInfo }, dispatch] = useStateValue();

  const deleteBlog = async () => {
    if (userInfo !== null) {
      var data = {
        blog_id: id,
        author: userInfo.username,
      };

      const checkToken = localStorage.getItem("token");

      var config = {
        method: "delete",
        url: "http://localhost/api/blog/delete",
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
    <div className="blog__cards xyz-in" xyz="fade up-5 stagger">
      {profile && userInfo !== null ? (
        <div className="blogCard__top">
          <h5 className="read__time">15 mins read</h5>
          <IconButton onClick={deleteBlog} className="delete__btn">
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      ) : (
        <h5 className="read__time">15 mins read</h5>
      )}
      <h3 className="topic__name">{title}</h3>
      <div className="blog__bottom">
        <h5 className="author__name">By {author}</h5>
        <Button>
          <Link
            to={{
              pathname: `/blog/${title}`,
              state: {
                id: id,
                title: title,
                author: author,
                content: content,
                comments: comments,
              },
            }}
            className="blogCard__link"
          >
            View Blog
            <ArrowRightAltRounded />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
