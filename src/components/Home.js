import React from "react";
import { Fragment } from "react";
import SelectDog from "./SelectDog";
import { useHistory } from "react-router-dom";

const Home = () => {
  let history = useHistory();

  function handleClick() {    
        history.push("/album");    
  }

  return (
    <Fragment>
      <div className="mt-5 pt-5">
        <SelectDog/>
      </div>
      <div className="text-center mt-5">
        <h1 className="btn btn-lg btn-link" onClick={handleClick}>Go To Album</h1>        
      </div>
    </Fragment>
  );
};

export default Home;
