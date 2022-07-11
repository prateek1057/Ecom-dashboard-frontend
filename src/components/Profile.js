import React from "react";

const Profile = () => {
  const name = JSON.parse(localStorage.getItem("users")).name;
  const email = JSON.parse(localStorage.getItem("users")).email;
  const id = JSON.parse(localStorage.getItem("users"))._id;
  return (
    <div className="container m-5 mx-auto w-75 p-5">
      <h1 className=" m-5 pt-5 profile-info1">Hii, {name}</h1>
      <h2 className="m-4 pt-5 profile-info2">Your Email: {email}</h2>
      <h2 className="profile-info2">Your Unique Id: {id}</h2>
    </div>
  );
};

export default Profile;
