import React from "react";

function ProfileCard(props) {
  return (
    <section className="card">
      <div className="background-img-t"></div>
      <div className="personal-img">
        <img src={props.personalImg} alt="cheff" />
      </div>
      <div className="card-body">
        <h3 className="name">{props.name}</h3>
      </div>
    </section>
  );
}
export default ProfileCard;
