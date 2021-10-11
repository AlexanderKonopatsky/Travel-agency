import React from "react";
import Footer from "../Footer";
import Form from "../Form";
import Cards from "../Cards";

function Home() {
  return (
    <>
      <div className="top-image">
    
        <h1 class="top-image_container">
          <span class="hero-image__title hero-image__title--phrase">The world is waiting!</span>
        </h1>
      </div>
      <Form />
      <Cards />
      <Footer />
    </>
  )
}

export default Home