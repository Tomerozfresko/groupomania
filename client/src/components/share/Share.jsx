import "./share.scss";
import Image from "../../assets/img.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";



const Share = () => {

  const [file, setFile] = useState(null);// will hold the file
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["share"], async () =>
    await makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    }));

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  //define mutation method
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetchh
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imgUrl = "";

    if (file) imgUrl = await upload();

    mutation.mutate({ desc, img: imgUrl });

    setDesc("");

    setFile(null);

  };

  if (error) { return "Something went wrong" };
  if (isLoading) { return "" }


  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={data.profilepicture.slice(0, 4) === "http" ? data.profilepicture : "/upload/" + data.profilepicture} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${data.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => { setFile(e.target.files[0]) }} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
            </div>
            <div className="item">
            </div>
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;





