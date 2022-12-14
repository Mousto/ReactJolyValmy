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
import MesCommandes from './Components/pages/MesCommandes';
import ModifCommande from './Components/pages/ModifCommande';
import OrderProduit from './Components/pages/OrderProduit';
import SuccesNewUser from './Components/SuccesNewUser';
  
function App(){

  
  const [bascule, setBascule] = React.useState(false)

  function changementTxtConnexion () {setBascule(true)} 
  function changementTxtDeconnexion() {setBascule(false)}

  React.useEffect(() => {
    const etatBascule = (localStorage.getItem('access_token') === 'undefined') || (localStorage.getItem('refresh_token') === 'undefined') || !localStorage.getItem('access_token') || !localStorage.getItem('refresh_token') ? false : true
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
          <Route path='/succes-new-user' element={ <SuccesNewUser />}></Route>
          <Route path='/mes-commandes' element={ <MesCommandes />}></Route>
          <Route path='/modification-commande' element={ <ModifCommande />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}
export default App

