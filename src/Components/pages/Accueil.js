// import Component from the react module
import React from "react";
import Hero from "./Hero"; 
import Footer from "././../Footer"; 

function Accueil(){
    return(
      <React.StrictMode>
        <div className="div-app">
          <Hero />
          <Footer />
        </div>
      </React.StrictMode>
    )
  }
  export default Accueil