import React from "react";
import { useRoutes } from "react-router-dom";
import { Home, QueryTab } from "./containers/index";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/query", element: <QueryTab /> },    
  ]);

  return element;
};

export default ProjectRoutes;