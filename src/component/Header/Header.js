import React, { useContext } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Menu from "./Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import "./style.scss";
import { Link } from "react-router-dom";
import { NumContext } from "../../NumContext";
import navL from "../../images/navL.png";
import navCL from "../../images/navCL.png";

const StyledBadge = withStyles((theme) => ({}))(Badge);

export default function Header() {
  const { cartNumber, isLogin } = useContext(NumContext);
  return (
    <header className="root">
      <AppBar position="static" className="header">
        <Toolbar className="Toolbar">
          <Typography className="logo color">
          <Link to={`/`}>
          <img src={navL} alt="" className="fullL" />
            <img src={navCL} alt="" className="CL" />
          </Link>
          </Typography>
          <Menu isLogin={isLogin}/>
          {isLogin ? (
            <>
            <Link to={`/profile`}>
            <Button className="color" variant="outlined">Profile</Button>

            </Link>
          <Link to={`/cart`}>
            <Button className="color cartbtn">
              <StyledBadge badgeContent={cartNumber} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </Button>
          </Link>
          </>
          ):(
            <Link to={`/login`}>
            <Button variant="contained" className="JoinUsBtn">
             Join Us
            </Button>
          </Link>
          )}
          
        </Toolbar>
      </AppBar>
    </header>
  );
}
