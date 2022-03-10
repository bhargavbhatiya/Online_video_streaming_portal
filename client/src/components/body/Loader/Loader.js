import React from 'react'
import ReactLoading from "react-loading";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
    <ReactLoading
    type={"spinningBubbles"}
    color={"pink"}
    height={"100%"}
    width={"100%"}
  />
    </div>
  )
}

export default Loader;