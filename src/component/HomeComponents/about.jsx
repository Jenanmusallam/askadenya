import React from "react";
import "./about.scss";
const About = () => {
  return (
    <section
      data-aos="fade-in"
      data-aos-duration="1500"
      className="about-container"
    >
      <h2 className="about-h">About us</h2>
      <div className="articleDiv">
        <article className="text-about">
          {" "}
          Welcome to Askadenya, your number one source for all things fast food,
          desserts and cold drinks. We're dedicated to giving you the very best
          of food, with a focus on easier payment and available 24/7. <br />{" "}
          Founded in 2020 by JSX, Askadenya has come a long way from its
          beginnings as a menu tool for restaurants. When JSX first started out,
          their passion for giving customers best of food, with a focus on
          easier payment and being available for along time. gave their the
          impetus to turn hard work and inspiration into to a booming online
          store (Ecommerce website). We now serve customers all over Jordan
          cities.
          <br /> We hope you enjoy our products as much as we enjoy offering
          them to you. If you have any questions or comments, please don't
          hesitate to contact us.
          <br />
          <br />
          Sincerely,
        </article>
        <div className=" img-fluid"></div>
      </div>
    </section>
  );
};
export default About;
