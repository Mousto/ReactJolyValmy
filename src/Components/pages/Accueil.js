// import Component from the react module
import React from "react";
import Hero from "./Hero"; 

function Accueil(){
    return(
      <React.StrictMode>
        <div className="div-app">
          <Hero />
        </div>
      </React.StrictMode>
    )
  }
  export default Accueil