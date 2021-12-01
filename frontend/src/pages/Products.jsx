import "./styles.css";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from 'react-redux';
import CardItem2 from '../components/CardItem2';

export default function Products() {

  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours } = tourList
  return (
    <>
    </>
  );
}
