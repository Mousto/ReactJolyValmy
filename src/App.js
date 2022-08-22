// import Component from the react module
import LesProduits from "./Components/LesProduits"; 
import Navbar from "./Components/Navbar"; 
import Hero from "./Components/Hero"; 
import React from "react"
  
function App(){
  return(
    <React.StrictMode>
      <div className="div-app">
        <Navbar />
        <Hero />
        <LesProduits />
      </div>
    </React.StrictMode>
  )
}
export default App