import React from "react";
import "./style.scss";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SpeedIcon from "@material-ui/icons/Speed";

function Server() {
  return (
    <div className="container-Server" id="services">
      <div class="row">
        <div class="column">
          <div class="card">
            <h3>
              <FastfoodIcon
                style={{ color: "#02594d", marginBottom: "-6px" }}
              />{" "}
              &nbsp;Editing Orders
            </h3>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <h3>
              <MonetizationOnIcon
                style={{ color: "#02594d", marginBottom: "-6px" }}
              />{" "}
              &nbsp;Cash Payment
            </h3>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <h3>
              <SpeedIcon style={{ color: "#02594d", marginBottom: "-6px" }} />{" "}
              &nbsp;Quick Orders
            </h3>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <h3>
              <LocalShippingIcon
                style={{ color: "#02594d", marginBottom: "-6px" }}
              />{" "}
              &nbsp;Free Delivery
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Server;
