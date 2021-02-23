import React from "react";


function ProfileCard(props) {
  return (
    <div className="card">
      <div className="personal-img">
        <img src={props.personalImg} alt="cheff" />
      </div>
      <div className="card-body">
        <h3 className="name">{props.name}</h3>
      </div>
    </div>
  );
}
export default ProfileCard;
