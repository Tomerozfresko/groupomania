import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";

const Post = ({ post }) => {
  console.log(post);
  const [commentOpen, setCommentOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], async () => {
    const res = await makeRequest.get("/likes?postId=" + post.id);
    return res.data;
  });

  const {
    isLoading: loadingComments,
    error: errorComments,
    data: comments,
  } = useQuery(["comments", post.id], async () => {
    const res = await makeRequest.get("/comments?postId=" + post.id);
    return res.data;
  });

  const queryClient = useQueryClient();

  // likes mutation
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  if (error) {
    return "Something went wrong";
  }
  if (isLoading) {
    return "Loading...";
  }
  if (errorComments) {
    return "Something went wrong";
  }
  if (loadingComments) {
    return "Loading...";
  }

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <article className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                post.profilepicture.slice(0, 4) === "http"
                  ? post.profilepicture
                  : "/upload/" + post.profilepicture
              }
              alt=""
            />
            <div className="details">
              {(post.userId === currentUser.id || currentUser.id === 22) && (
                <button>
                  <DeleteIcon onClick={handleDelete}>delete</DeleteIcon>
                </button>
              )}
              <span className="name">{post.name}</span>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <button className="item">
            {data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon onClick={handleLike} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data.length} Likes
          </button>
          <button className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comments.length} Comments
          </button>
          <div className="item"></div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </article>
  );
};

export default Post;
