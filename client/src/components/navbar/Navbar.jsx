import "./navbar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../update/Update";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [openUpdate, setOpenUpdate] = useState(false);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  if (error) {
    return "Something went wrong";
  }
  if (isLoading) {
    return "Loading...";
  }

  return (
    <nav className="navbar">
      <div className="left">
        <img src={logo} alt="" style={{ height: "30px" }} />
      </div>
      <div className="right">
        <button className="user" onClick={() => setOpenUpdate(true)}>
          <img
            src={
              data.profilepicture.slice(0, 4) === "http"
                ? data.profilepicture
                : "/upload/" + data.profilepicture
            }
            alt=""
          />
          <span>{currentUser.name}</span>
        </button>
        <LogoutIcon onClick={logout} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </nav>
  );
};

export default Navbar;
