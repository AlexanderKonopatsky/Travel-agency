import "./styles.css";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from 'react-redux';


export default function Products() {

  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours } = tourList
  return (
    <>
    </>
  );
}
