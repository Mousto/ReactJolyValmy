import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from "./Components/pages/Accueil"; 
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Barnav from './Components/Barnav';
//import Test from './Components/Test';
import LesProduits from './Components/pages/LesProduits';
import CreateUser from './Components/pages/CreateUser';
import Connexion from './Components/pages/Connexion';
import Logout from './Components/pages/Logout';
import OrderProduit from './Components/pages/OrderProduit';
  
function App(){

  
  const [bascule, setBascule] = React.useState(false)

  function changementTxtConnexion () {setBascule(true)} 
  function changementTxtDeconnexion() {setBascule(false)}

  React.useEffect(() => {
    const etatBascule = (localStorage.getItem('access_token') !== 'undefined') && (localStorage.getItem('refresh_token') !== 'undefined') ? true : false
    setBascule(etatBascule)
  },[bascule])

  return(
    <React.StrictMode>
      <BrowserRouter>
        <Barnav bascule={bascule}/>
        <Routes>
          <Route path='/' element={ <Accueil />}></Route>
          <Route path='/produits' element={ <LesProduits />}></Route>
          <Route path='/connexion' element={ <Connexion handelClick={changementTxtConnexion} />}></Route>
          <Route path='/logout' element={ <Logout handelClick={changementTxtDeconnexion}/>}></Route>
          <Route path='/sign-up' element={ <CreateUser />}></Route>
          <Route path='/order-produit' element={ <OrderProduit />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}
export default App

