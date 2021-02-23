import React from "react";
import Gallery from "../../component/HomeComponents/gallery";

import Sliders from "../../component/HomeComponents/slider";
import "./home_page.scss";
import About from "../../component/HomeComponents/about";
import ProfileCards from "../../component/HomeComponents/ProfileCards";
import Server from "../../component/HomeComponents/Server/serves";
import Location from "../../component/HomeComponents/location";
function Home() {
  return (
    <section>
      <Sliders />
      <Server />
      <Gallery />
      <About />
      <Location />
      <ProfileCards />
    </section>
  );
}

export default Home;
