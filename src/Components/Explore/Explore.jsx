import React, { useEffect, useState } from "react";
import "./Explore.css";
import axios from "axios";
import InfinteScroll from "react-infinite-scroll-component";
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
  }, []);

  const getBlogs = async () => {
    await axios
      .get(`http://localhost/api/blog/${page + 1}`)
      .then((res) => setAllblogs(allblogs.concat(res.data)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="explore">
      <div className="E__row1">
        <div className="E__row1__col1">
          <div className="E__row1__col1__row1">
            <h1>Explore</h1>
            <h4>
              Discover Wonderful, Thoughtful & Educational blogs by wonderful
              community of kES Shroff college
            </h4>
          </div>
          <div className="E__row1__col1__row2">
            <h4>Search by tags :</h4>
            <div className="E__row1__col1__row2__btnGroup">
              <Button className="tag__btn">Development</Button>
              <Button className="tag__btn">Productivity</Button>
              <Button className="tag__btn">Desgin</Button>
              <Button className="tag__btn">Photography</Button>
              <Button className="tag__btn">Marketing</Button>
              <Button className="tag__btn">Gaming</Button>
            </div>
          </div>
        </div>
        <div className="E__row1__col2">
          <img src={img} alt="" />
        </div>
        {/* <button onClick={getBlogs}>GETBLOGS</button> */}
      </div>
      <div className="E__row2">
        {/* <InfinteScroll
          dataLength={allblogs.length}
          next={getBlogs()}
          loader={<h1>Loading.....</h1>}
        > */}
        {allblogs.map((blog) => (
          <BlogCard key={blog.title} title={blog.title} author={blog.author} />
        ))}
        {/* </InfinteScroll> */}
        {/* <BlogCard title="uhvsvufvs" author="haccfcusccfha" />
        <BlogCard title="uhvsvufvs" author="haccfcusccfha" />
        <BlogCard title="uhvsvufvs" author="haccfcusccfha" /> */}
      </div>
    </div>
  );
};

export default Explore;
