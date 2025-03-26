import React from "react";

import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function MainLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default MainLayout;
