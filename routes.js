import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./src/client/components/home-page/home-page";

export default () => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
    </div>
  );
};
