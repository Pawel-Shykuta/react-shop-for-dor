import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import'./App.css'
import Header from"./moduls/Header/header"
import Preview from"./moduls/Main/Main"
import Footer from'./moduls/Footer/Footer'
import Katalog from './moduls/Katalog/katalog'
import axios from'axios'
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { RiDeleteBinLine } from "react-icons/ri";
import PageItem from"./moduls/PageTowars/PageItem"
import Finish from './moduls/Finish/FinishZak'
import OptSell from './moduls/Optsell/OptSell'
import AboutCompanny from './moduls/AboutCompanny/AboutCompany'


function App() {
  const [Promo,setPromo] = useState('Aloha')
  


  const [AllPrice,setAllPride] = useState([])
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true)
  const [towarLength, setTowarLength] = useState(()=>{
    const corzSaveLEngth = localStorage.getItem('lengthTowars')
    return corzSaveLEngth? JSON.parse(corzSaveLEngth):1
  })

  const [corzItems, setCorzItems] = useState(() => {
    const corzSaved = localStorage.getItem('towars');
    try {
      const parsed = JSON.parse(corzSaved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });
  

    useEffect(()=>{
      localStorage.setItem('towars',JSON.stringify(corzItems))
      localStorage.setItem('lengthTowars',JSON.stringify(towarLength))
    })




    let a = 'https://67975735c2c861de0c6c4f45.mockapi.io/Towars'


  useEffect(() => {
    axios 
      .get('https://678f593f49875e5a1a917477.mockapi.io/Towars')
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        })
      .catch((error) => {
        alert('Ошибка при получении данных с сервера!');
        })
      .finally(() => {
        setLoading(false);
        });
  }, []);
  
  


  const [CartOpen, setCartOpen] = React.useState(false)

  const OpenCart = () =>{
    CartOpen ? setCartOpen(false) : setCartOpen(true)
  }

  const [corsIsOpen, setCorsIsOpen] = React.useState(false)
  
  const OpenCorz = () =>{
    corsIsOpen ? setCorsIsOpen(false) : setCorsIsOpen(true)
  }

  useEffect(()=>{
    localStorage.setItem('corzItems',JSON.stringify(corzItems))
    },[corzItems])

    return (
      <Router>
        <Header OpenCart={OpenCart}  setAllPride={setAllPride} AllPrice={AllPrice} CartOpen ={CartOpen} setCartOpen={setCartOpen}  OpenCorz ={OpenCorz}  corsIsOpen ={corsIsOpen} corzItems={corzItems} setCorzItems={setCorzItems} setTowarLength={setTowarLength} towarLength={towarLength} />
          <Routes>
            <Route path='/' element={<Preview corzItems={corzItems} setCorzItems={setCorzItems} products={products} CartOpen ={CartOpen} corsIsOpen={corsIsOpen}  OpenCorz={OpenCorz}  /> } />
            <Route path='Katalog' element={<Katalog   products ={products} loading={loading} corzItems={corzItems} setCorzItems={setCorzItems} towarLength={towarLength} setTowarLength={setTowarLength} PageItem={PageItem} />}/>
            <Route path='OptSell' element={<OptSell/>}/>
            <Route path='PageItem' element={<PageItem/>}/>
            <Route path='Finish' element={<Finish  Promo={Promo} setAllPride={setAllPride} AllPrice={AllPrice} corzItems={corzItems} setCorzItems={setCorzItems} towarLength={towarLength} setTowarLength={setTowarLength} />}/>
            <Route path='AboutCompanny' element={< AboutCompanny/>}/>
          </Routes>    
        <Footer CartOpen ={CartOpen} />
      </Router>
    );
}

export default App;