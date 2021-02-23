import React, { useState } from "react";
import ProfileCard from "./ProfileCard";

function ProfileCards() {
  const [users] = useState([
    {
      name: "Ali Ghazzawi",
      personalImg:
        "https://www.hospitalitynewsmag.com/wp-content/uploads/2019/04/TOP-CHEF-S3-Winner-Ali-Al-Ghezawi-featured-389x389.jpg",
    },
    {
      name: "Manal Alalem",
      personalImg:
        "https://www.lahona.com/gallery/lahona_011/1965015_664826290219494_1024119998_n.jpg",
    },

    {
      name: "Nusrat",
      personalImg:
        "https://static.arageek.com/wp-content/uploads/2018/05/saltbae.0-e1525289498209.jpg",
    },
    {
      name: "Dima Hijjawi",
      personalImg:
        "https://scontent.famm6-1.fna.fbcdn.net/v/t1.0-9/524262_1537290696547833_8346802450574452101_n.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFGXkiO-jGUOALarJsUGmuXSRtPr95N5VRJG0-v3k3lVDHhR3j9BwZoqgp7cLyoRTdmyelt8fb0TZjXTlWV8InK&_nc_ohc=w3YUd6jqlKIAX-v65r7&_nc_ht=scontent.famm6-1.fna&oh=18b2fc0ed19c8cf4b2898708bfafee43&oe=6010A760",
    },
  ]);
  return (
    <section
      data-aos="fade-in"
      data-aos-duration="1500"
      className="chafs-container"
    >
      <h2 className="about-h">Our partners</h2>
      <div className="flex-container">
        {users.map((user) => (
          <ProfileCard name={user.name} personalImg={user.personalImg} />
        ))}
      </div>
    </section>
  );
}
export default ProfileCards;
