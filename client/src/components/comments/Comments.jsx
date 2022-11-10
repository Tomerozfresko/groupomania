import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: loadingUser, error: errorUser, data: user } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete("/comments/" + commentId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );


  if (error) return "Something went wrong";
  if (isLoading) return "";
  if (errorUser) return "Something went wrong with user";
  if (loadingUser) return "";

  return (
    <div className="comments">
      <div className="write">
        <img src={user.profilepicture.slice(0, 4) === "http" ? user.profilepicture : "/upload/" + user.profilepicture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
          ? ""
          : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilepicture.slice(0, 4) === "http" ? comment.profilepicture : "/upload/" + comment.profilepicture} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <div className="date date__container">
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
                {comment.userId === currentUser.id &&
                  <DeleteIcon onClick={() => { deleteMutation.mutate(comment.id) }} />}
              </div>

            </div>
          ))}
    </div>
  );
};

export default Comments;