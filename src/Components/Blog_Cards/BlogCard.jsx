import { Button } from "@material-ui/core";
import { ArrowRightAltRounded } from "@material-ui/icons";
import React from "react";
import "./BlogCard.css";

const BlogCard = ({ title, author, content, comments }) => {
  return (
    <div className="blog__cards">
      <h5 className="read__time">15 mins read</h5>
      <h3 className="topic__name">{title}</h3>
      <div className="blog__bottom">
        <h5 className="author__name">By {author}</h5>
        <Button>
          View Blog
          <ArrowRightAltRounded />
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
