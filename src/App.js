import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from "./Components/pages/Accueil"; 
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Barnav from './Components/Barnav';
import LesProduits from './Components/pages/LesProduits';
import Register from './Components/pages/Register';
import Connexion from './Components/pages/Connexion';
import Logout from './Components/pages/Logout';
import OrderProduit from './Components/pages/OrderProduit';
  
function App(){

  const etatBascule = (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) && (localStorage.getItem('access_token') !== undefined && localStorage.getItem('refresh_token') !== undefined) ? true : false
  const [bascule, setBascule] = React.useState(etatBascule)

  function changementTxtConnexion () {setBascule(true)} 
  function changementTxtDeconnexion() {setBascule(false)}

  return(
    <React.StrictMode>
      <BrowserRouter>
        <Barnav bascule={bascule}/>
        <Routes>
          <Route path='/' element={ <Accueil />}></Route>
          <Route path='/produits' element={ <LesProduits />}></Route>
          <Route path='/connexion' element={ <Connexion handelClick={changementTxtConnexion} />}></Route>
          <Route path='/logout' element={ <Logout handelClick={changementTxtDeconnexion}/>}></Route>
          <Route path='/sign-up' element={ <Register />}></Route>
          <Route path='/order-produit' element={ <OrderProduit />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}
export default App

