import React from "react";
import ImgMune from "../../images/menu.png";
import { Link } from "react-router-dom";

function gallery() {
  return (
    <section data-aos="fade-in"
    data-aos-duration="1500"  id="menu" className="container-gallery">
      <img className="gallery__icon" src={ImgMune} alt="menu" />

      {/* <h1>Our Categories</h1> */}
      <ul class="gallery_box">
        <li>
          <Link to={`/menu/Fast Food`}>
            <img
              className="gallery__img"
              src="https://oceanrecipes.com/wp-content/uploads/2020/04/Cover-scaled.jpg"
              alt="Fast Food"
            />
            <div class="box_data">
              <span>Fast Food</span>
            </div>
          </Link>
        </li>
        <li>
          <a href="#0">
            <img
              className="gallery__img"
              src="https://i.pinimg.com/originals/cd/51/24/cd5124e79915b0582d4ab71176e282ed.jpg"
              alt="Traditional Food "
            />
            <div class="box_data">
              <span>Traditional Food</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#0">
            <img
              className="gallery__img"
              src="https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Sushi"
            />
            <div class="box_data">
              <span>Sea Food</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#0">
            <img
              className="gallery__img"
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="Hot Drinks"
            />
            <div class="box_data">
              <span>Hot Drinks</span>
            </div>
          </a>
        </li>
        <li className="li-grid">
          <Link to={`/menu/Desserts`}>
            <img
              className="gallery__img"
              src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60"
              alt="Desserts"
            />
            <div class="box_data">
              <span>Desserts</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={`/menu/Cold Drinks`}>
            <img
              className="gallery__img"
              src="https://s3.envato.com/files/264111247/61-07437.jpg"
              alt="Cold Drinks"
            />
            <div class="box_data">
              <span>Cold Drinks</span>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default gallery;
