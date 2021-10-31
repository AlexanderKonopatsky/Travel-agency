import React from "react";
import Footer from "../Footer";
import Form from "../Form";
import Cards from "../Cards";

function Home() {
  return (
    <>
      <div className="top-image">
        <h1>
          <span className="home-image__title-text">The world is waiting!</span>
        </h1>
      </div>
      <Form />
      <Cards/>
      <Footer />
    </>
  )
}

export default Home