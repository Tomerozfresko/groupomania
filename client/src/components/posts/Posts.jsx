import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Post from "../post/Post";
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import "./posts.scss";




const Posts = () => {

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const spinner = <ClipLoader
    color="#ff0000"
    loading={isLoading}
    cssOverride={override}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  />

  return <div className="posts">

    {error ? "Something went wrong" : isLoading ? spinner : data.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </div>;
};

export default Posts;

