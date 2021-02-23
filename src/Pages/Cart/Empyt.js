import { Link } from "react-router-dom";

import React from "react";
import emoji from "./emoji.png";
export default function Empyt() {
  return (
    <div class="empty">
      <img class="img-empty" src={emoji}></img>
      <div className="content">
        <h2>Your cart is empty!</h2>
        <p>
          Don't miss the opportunity to order from our website, order your
          meal now!
        </p>
        <Link
          to="/menu"
        >
          Back to menu
        </Link>
      </div>
    </div>
  );
}
