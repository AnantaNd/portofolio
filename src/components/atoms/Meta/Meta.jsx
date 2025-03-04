import React from "react";
import { Helmet } from "react-helmet-async";

export default function Meta() {
  return (
    <>
      <Helmet>
        <title>Ananta Noviandanu | Portfolio</title>
        <meta
          name="description"
          content="Ananta Noviandanu's portfolio showcasing projects and skills in web development, design, and programming."
        />
        <meta
          name="keywords"
          content="Anantano Viandanu, portfolio, web development, programming, design, projects"
        />
        <meta name="author" content="Anantano Viandanu" />
      </Helmet>
    </>
  );
}
