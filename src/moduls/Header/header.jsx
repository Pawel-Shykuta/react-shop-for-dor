import React, {  useState } from 'react';
import './CSS.css'
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import RenderCatr from '../Catr/RenderInCatr'
import { useNavigate } from "react-router-dom";



const Header = ({OpenCart,CartOpen, AllPrice,setAllPride,OpenCorz,corsIsOpen,corzItems,setCorzItems,towarLength,setTowarLength}) =>{

    const navigate = useNavigate()

    const FinishPAge = () =>{
      navigate(`/Finish`);
    }
    
    

    return(    
        <header>
                      {corsIsOpen? (
                            <aside className='Corzine'>
                                <div className="corzine-container">
                                    <div className="head-list">
                                        <h1>Корзина</h1>
                                        <span className="Cross" onClick={OpenCorz}></span>
                                    </div>
                                    <div className='Corzine-blocd'>
                                        <RenderCatr OpenCorz={OpenCorz} corzItems ={corzItems} setCorzItems={setCorzItems} setTowarLength={setTowarLength} towarLength={towarLength} setAllPride={setAllPride} AllPrice={AllPrice}  className="block-towars"/>                     
                                    </div>
                                        <div className="corzin-footer">            
                                                    <div className="block-buy">       
                                                            <h1><span className="Small">Price:</span> {AllPrice}$</h1>           
                                                        <button className="For-buy" type="button" onClick={()=>{FinishPAge();OpenCorz();}} >Оформить заказ</button>
                                                    </div> 
                                                <button type="button" className="Continue-shopping"  onClick={OpenCorz}>Продолжить покупку</button>
                                        </div>
                                </div> 
                            </aside>
                        ):''}    
            <div className='Discount'>
                <h2>Скидка 10% по промокоду “ZAMOK” на все заказы до 10.09</h2>
                <h1>Обратный звонок</h1>
            </div>
           <div className="con">
                <div  onClick={OpenCart}  className={`burger ${CartOpen ? 'active' : ''}`}  ></div>
                    <ul className="links" 
                        style={{left :CartOpen ? 0:'-110%', 
                            transition: 'all 0.5s ease'
                        }}>

                            <li className='link'> <Link to='/' className='Dec' onClick={OpenCart}>Главная</Link> </li>
                            <li className='link'> <Link to='/Katalog' className='Dec' onClick={OpenCart}>Каталог</Link> </li>
                            <li  className='link'> <Link to='/OptSell' className='Dec' onClick={OpenCart}> Оптовая продажа </Link> </li>
                            <li className='link'> <Link  to='/AboutCompanny' className='Dec' onClick={OpenCart}> О нас</Link> </li>
                    </ul>
                        <div className="corzimne-block" onClick={OpenCorz}>
                            <div className="con-for-icon">
                                {corzItems.length >= 1 ?(
                                   <span className='Corz-item-shover'>{corzItems.length}</span> 
                                ):null}
                              <FiShoppingCart className={corsIsOpen ? 'icon activetion' : 'icon'}  />
                            </div>
                        </div>
                    
                <div className="phone">
                    <h3>+(380) 63 52 33 112</h3>
                </div>
           </div>
                    
        </header>
    )
}

export default Header;