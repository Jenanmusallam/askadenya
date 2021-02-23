import React,{useEffect, useState} from 'react';
import Login from './Pages/Register/loginPage'
import Product from './Pages/Product/Product'
import Footer from './component/Footer/Footer'
import Header from './component/Header/Header'
import Cart from './Pages/Cart/Cart'
import Products from './Pages/Products/Products'
import AllProducts from './Pages/AllProducts/AllProducts'
import Profile from './Pages/profilePage/Profile'
import Notfound from './Pages/pageNotFound/Notfound'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import axios from 'axios';
import {NumContext} from './NumContext'
import Homepage from "./Pages/Home_page/home"
import "aos/dist/aos.css";
import AOS from "aos";
AOS.init();

function App() {
  const [cartNumber, setcartNumber] = useState(0)
  const [isLogin, setisLogin] = useState(sessionStorage.getItem("userId"))
  useEffect(() => {
    getcartNumber()
  }, [])
  const getcartNumber=()=>{
    axios.get('http://localhost:8000/cart/' + sessionStorage.getItem("userId"))
    .then((res)=>{
      setcartNumber(res.data.length)
    })
  }
  const incresNum =()=>{
    let n =cartNumber;
    n++;
    setcartNumber(n)
  }
  const decresNum =()=>{
    let n =cartNumber;
    n--;
    setcartNumber(n)
  }
  return (
    <div className="App">
            <Router>
            <NumContext.Provider value={{ getcartNumber,cartNumber, setcartNumber,incresNum ,decresNum,isLogin, setisLogin }}>
      <Header number={cartNumber} isLogin={isLogin}/>
          <Switch >
          <Route path='/' component={Homepage} exact />
          <Route path='/login' component={Login} />
          <Route path='/cart' component={Cart} />
          <Route path='/profile' component={Profile} />
          <Route path='/menu' exact component={AllProducts} />
          <Route path='/menu/:category' exact component={Products} />
          <Route path='/menu/:category/:product' component={Product} />
          <Route path='/*' component={Notfound} />
          </Switch>
          <Footer />
          </NumContext.Provider>
      </Router>
    
    </div>
  );
}

export default App;
