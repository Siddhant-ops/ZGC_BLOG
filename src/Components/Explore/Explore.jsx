import React, { useEffect, useState } from "react";
import "./Explore.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import BlogCard from "../Blog_Cards/BlogCard";
import img from "./Saly-2.png";

const Explore = () => {
  const [allblogs, setAllblogs] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost/api/blog/${page}`)
      .then((res) => {
        setAllblogs(res.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  // const getBlogs = async () => {
  //   await axios
  //     .get(`http://localhost/api/blog/${page + 1}`)
  //     .then((res) => setAllblogs(allblogs.concat(res.data)))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="explore">
      <section className="explore__sec1">
        <div className="welcome__col1">
          <h1>Explore</h1>
          <h4>
            Discover Wonderful, Thoughtful & Educational Blogs By Wonderful
            Community Of KES Shroff College
          </h4>
          <div className="search__group">
            <h5>Search by tags :</h5>
            <span className="buttons__grp">
              <Button className="explore__btn active__btn">Development</Button>
              <Button className="explore__btn">Productivity</Button>
              <Button className="explore__btn">Photography</Button>
              <Button className="explore__btn">Marketing</Button>
              <Button className="explore__btn">Gaming</Button>
            </span>
          </div>
        </div>
        <div className="welcome__col2">
          <img src={img} alt="Floating Kid" />
        </div>
      </section>
      <section className="explore__sec2">
        {allblogs.map((blog) => (
          <BlogCard key={blog.title} title={blog.title} author={blog.author} />
        ))}
      </section>
    </div>
  );
};

export default Explore;
