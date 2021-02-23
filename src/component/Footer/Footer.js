import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Contact from "./Contact";
import "./style.scss";
import footerL from "../../images/footerL.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Toolbar className="center">
          <div className="container">
            <Card className="card">
              <CardContent className="section">
                <Typography gutterBottom variant="h5" component="h2">
                  <Link to={`/`}>
                    <img src={footerL} className="footerL" alt="" />
                  </Link>
                </Typography>
              </CardContent>
            </Card>
            <Card className="vr"></Card>
            <Card className="card">
              <CardContent className="section">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className="letsget"
                >
                  Let's get in touch{" "}
                </Typography>{" "}
                <p>
                  <i class="fas fa-phone-alt i-inline"></i> &ensp; 0777777777
                </p>
                <p>
                  <i class="fas fa-at i-inline"></i> &ensp; askadenya@jsx.us
                </p>
                <p>
                  <i class="fab fa-facebook i-inline"></i> &ensp;
                  facebook.com/askadenya
                </p>
              </CardContent>
            </Card>
            <Card className="vr"></Card>
            <Card className="card">
              <CardContent className="section">
                <Contact />
              </CardContent>
            </Card>
          </div>
        </Toolbar>
        <div className="RightsVR"></div>
      </footer>
      <div className="Rights">
        <p>© 2020 .JSX | All Rights Reserved.</p>
      </div>
    </>
  );
}
