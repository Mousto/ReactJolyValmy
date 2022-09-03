import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from "./Components/pages/Accueil"; 
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Barnav from './Components/Barnav';
import LesProduits from './Components/pages/LesProduits';
import Register from './Components/pages/Register';
import Connexion from './Components/pages/Connexion';
  
function App(){
  return(
    <React.StrictMode>
      <BrowserRouter>
        <Barnav />
        <Routes>
          <Route path='/' element={ <Accueil />}></Route>
          <Route path='/produits' element={ <LesProduits />}></Route>
          <Route path='/connexion' element={ <Connexion />}></Route>
          <Route path='/sign-up' element={ <Register />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}
export default App

