import React from "react";
import Footer from "../Footer";
import MainSection from "../MainSection";

function Tour() {
  return (
    <>
      <div className='grid'>
        <div className='grid__section'>
          <div className='grid__content__container'>
            <div className='grid__content'>
              <h1 className='text-center'>
                Introduction to Berlin Tour: The Story of Berlin
              </h1>
            </div>
          </div>
        </div>
        <div className='grid__section '>
          <div className='grid__wrap'>
            <button className='grid__gallery-button' >
              <img alt="" className="grid__image"  src='images/img-2.jpg' />
            </button>
          </div>
        </div>
      </div>
      <MainSection />
      <Footer />
    </>
  )
}

export default Tour