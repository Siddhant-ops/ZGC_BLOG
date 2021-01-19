import React from "react";
import "./BlogCard.css";

const BlogCard = ({ title, author }) => {
  return (
    <div className="blog__cards">
      <p className="read__time">15 mins read</p>
      <p className="topic__name">{title}</p>
      <p className="author__name">By {author}</p>
    </div>
  );
};

export default BlogCard;
