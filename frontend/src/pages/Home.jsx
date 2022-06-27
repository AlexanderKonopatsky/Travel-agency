import React from "react";
import Form from "../components/Form";
import Cards from "../components/Cards";

function Home() {
  return (
    <>
      <div className="top-image">
        <h1>
          <span className="home-image__title-text"></span>
        </h1>
      </div>
      <Form />



      <Cards />

    </>
  )
}

export default Home