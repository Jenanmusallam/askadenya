import "./style.scss";
import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, TextField, Typography, Breadcrumbs } from "@material-ui/core";
import EditData from "./editData";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { WaveTopBottomLoading } from "react-loadingg";

import { Link } from "react-router-dom";
import Htabel from "./Htabel";
// import profPic from "./img/avatar.png";
import { NumContext } from "../../NumContext";

function Profile() {
  document.title = "Askadenya | Profile Page";
  document.getElementsByTagName("META")[4].content =
    "Phone number, Name, Email, Location";
  document.getElementsByTagName("META")[3].content =
    "This page is dedicated to displaying all information about user";

  const { setisLogin, setcartNumber } = useContext(NumContext);
  const [user, setuser] = useState(null);
  const [redirect, setredirect] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const getItems = () => {
    axios
      .get("http://localhost:8000/users/" + sessionStorage.getItem("userId"))
      .then((res) => {
        setuser(res.data);
        // console.log(res.data);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  const editDone = () => {
    settoggle(false);
    getItems();
  };

  //   ===================================
  //   ===================================
  if (redirect) {
    return <Redirect to="/" />;
  }
  if (user) {
    return (
      <div className="Profile">
        <section className="Breadcrumbs">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link to="/">
              {/* <HomeIcon/> */}
              Home
            </Link>
            <Typography color="textPrimary">Profile</Typography>
          </Breadcrumbs>
        </section>
        <section className="center-profile">
          <div className="profileb">
            <div className="profile-pic"></div>
            <div className="imgBorder">
              <img src={user.avatar} alt=" Profile " />
            </div>
            {!toggle ? (
              <>
                <div className="containwe-t">
                  <h2>{user.fullName}</h2>
                  <h4>{user.email}</h4>
                  <h4>{user.phone}</h4>
                </div>
                <div className="changeInfo">
                  <div className="editorsBtn">
                    <Button
                      className="btn EditBtn"
                      size="small"
                      color=""
                      variant="contained"
                      onClick={() => {
                        settoggle(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn "
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        setcartNumber(0);
                        setisLogin(false);
                        sessionStorage.clear();
                        setredirect(true);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <EditData
                  fullName={user.fullName}
                  phone={user.phone}
                  editDone={editDone}
                />
              </>
            )}
          </div>

          <Htabel />
        </section>
      </div>
    );
  } else {
    return (
      <>
        <div className="marginLoading"></div>
        {/* <CoffeeLoading size="small" color="#02594d" /> */}
        <WaveTopBottomLoading size="large" color="#02594d" />
      </>
    );
  }
}

export default Profile;
