import React from "react";
import dynamic from "next/dynamic";

const ProjectStatus = dynamic(() => import("../../components/404Page"), {
  ssr: false,
});

const ErrorPage = () => {
    return(
        <ProjectStatus/>
    )
};

export default ErrorPage