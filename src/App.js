import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import React,{ Fragment,useEffect, useState } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import Menu from './componentes/Menu';
import Pagina1 from './pages/Pagina1';
import Damas from './pages/Damas';
import Nin from './pages/Nin';

import Carrito from './pages/Carrito';
import Cab from './pages/Cab';
import Crud from './componentes/Crud';

function App() {
  const [mostrarMenu,setMostrar]=useState(true)
  return (
    <>
    <Router>
        <header><h1>Zapateria Chilpancingo</h1>
        <GiHamburgerMenu onClick={() => setMostrar(!mostrarMenu)}/>
        
        </header>
       <Menu show={mostrarMenu}/>
        <div className="main">
          <Route path="/" exact={true} component={Pagina1}></Route>
          <Route path="/caballeros" exact={true} component={Cab}></Route>
          <Route path="/childrens" exact={true} component={Nin}></Route>
          <Route path="/damas" exact={true} component={Damas}></Route>
           <Route path="/carrito" exact={true} component={Carrito}></Route>
        </div>
    </Router>
    </>
  );
}

export default App;
