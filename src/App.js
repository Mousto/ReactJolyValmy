import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from "./Components/pages/Accueil"; 
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Barnav from './Components/Barnav';
import LesProduits from './Components/pages/LesProduits';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
  
function App(){
  return(
    <React.StrictMode>
      <BrowserRouter>
        <Barnav />
        <Routes>
          <Route path='/' element={ <Accueil />}></Route>
          <Route path='/produits' element={ <LesProduits />}></Route>
          <Route path='/connexion' element={ <Login />}></Route>
          <Route path='/sign-up' element={ <Register />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}
export default App

