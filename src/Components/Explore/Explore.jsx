import React, { useEffect, useState } from "react";
import "./Explore.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import BlogCard from "../Blog_Cards/BlogCard";
import img from "./Saly-2.png";
import { CheckCircleOutline } from "@material-ui/icons";

var page = 0;

const Explore = () => {
  var myblogs = [];
  const [allblogs, setAllblogs] = useState([]);
  const [initial, setinitial] = useState(true);
  const [moreBlogs, setMoreBlogs] = useState(true);

  useEffect(() => {
    if (initial) {
      axios
        .get(`http://localhost/api/blog/${page}`)
        .then((res) => {
          setAllblogs(res.data);
        })
        .catch((err) => console.log(err));
    }
    setinitial(false);
  }, [initial]);

  const updatePage = () => {
    page = page + 1;
  };

  const getBlogs = async () => {
    await axios
      .get(`http://localhost/api/blog/${page}`)
      .then((res) => {
        if (res.data.length === 0) {
          setMoreBlogs(false);
        } else {
          myblogs = [...allblogs, ...res.data];
          setAllblogs(myblogs);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="explore">
      <section className="explore__sec1">
        <div className="welcome__col1">
          <h1>Explore</h1>
          <h4>
            Discover Wonderful, Thoughtful & Educational Blogs By Wonderful
            Community Of KES Shroff College
          </h4>
          {/* <div className="search__group">
            <h5>Search by tags :</h5>
            <span className="buttons__grp">
              <Button className="explore__btn active__btn">Development</Button>
              <Button className="explore__btn">Productivity</Button>
              <Button className="explore__btn">Photography</Button>
              <Button className="explore__btn">Marketing</Button>
              <Button className="explore__btn">Gaming</Button>
            </span>
          </div> */}
        </div>
        <div className="welcome__col2">
          <img src={img} alt="Floating Kid" />
        </div>
      </section>
      <section className="explore__sec2">
        {(allblogs !== null || allblogs !== undefined) &&
          allblogs.map((blog) => (
            <BlogCard
              key={blog.title}
              id={blog._id}
              title={blog.title}
              author={blog.author}
              content={blog.content}
              comments={blog.comments}
            />
          ))}
      </section>
      {moreBlogs ? (
        <Button
          onClick={async () => {
            await updatePage();
            getBlogs();
          }}
          className="loadMore__btn"
        >
          Load More...
        </Button>
      ) : (
        <div className="caughtup__Container xyz-in" xyz="fade up-5 stagger">
          <CheckCircleOutline />
          <h4>You're All Caught Up!</h4>
        </div>
      )}
    </div>
  );
};

export default Explore;
