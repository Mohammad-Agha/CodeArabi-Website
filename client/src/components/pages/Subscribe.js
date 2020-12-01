import React, { Component } from "react";

const Subscribe = (props) => {
  return (
    <form onSubmit={props.subscribe}>
      <input type="text" name="name" placeholder="insert name" />
      <input type="email" name="email" placeholder="insert email" />
      <input type="submit" value="Submit" />
    </form>
  );
};
export default Subscribe;
