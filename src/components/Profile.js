import React from "react";

const Profile = () => {
  const name = JSON.parse(localStorage.getItem("users")).name;
  const email = JSON.parse(localStorage.getItem("users")).email;
  const id = JSON.parse(localStorage.getItem("users"))._id;
  return (
    <div className="profile-info">
      <h1>Hii, {name}</h1>
      <h2>Your Email: {email}</h2>
      <h2>Your Unique Id: {id}</h2>
    </div>
  );
};

export default Profile;
