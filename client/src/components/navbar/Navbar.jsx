import "./navbar.scss";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../update/Update";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [openUpdate, setOpenUpdate] = useState(false);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  if (error) { return "Something went wrong" };
  if (isLoading) { return "Loading..." }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Groupomania</span>
        </Link>
      </div>
      <div className="right">
        <div className="user" onClick={() => setOpenUpdate(true)}>
          <img
            src={data.profilepicture.slice(0, 4) === "http" ? data.profilepicture : "/upload/" + data.profilepicture}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
        <LogoutIcon onClick={logout} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Navbar;
