import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import'./page.css'

import { useRef } from "react";


const PageItem = () =>{
    const location = useLocation();
    const {el} = location.state


        const [activeIndex, setActiveIndex] = useState(null);
      
        const addActive = (index) => {
          setActiveIndex(activeIndex === index ? null : index);
        };



        const sectionRef = useRef([])

        useEffect(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add("show")
                    }
                })
            },{threshold:0.3}
        )
        sectionRef.current.forEach((section) => {
            if(section) observer.observe(section)
        })

        return () => {
            sectionRef.current.forEach((section) => {
                if(section) observer.unobserve(section)
            })
        }

        },[])

    return(
        <div className="page-item-Info">
            <section>
                <div className="con-by">
                    <div className="blockFoto">
                        <img src={el.image} alt="img" />
                    </div>

                    <div className="info hiddden" ref={(el) => sectionRef.current.push(el)}>
                        <h1>{el.description}</h1>
                        <h2>подходит для установки на:</h2>

                            <div className="inputs">  
                    
                                    <input type="checkBox" className="Box" checked/>
                                    <label htmlFor="checkBox">Деревянную дверь</label>
                                    
                                    <input type="checkBox"className="Box" checked/>
                                    <label htmlFor="checkBox">Межкомнатную дверь</label>

                            </div>

                            <div className="complectation">

                                <div className="comp-info">

                                    <h2>Комплектация</h2>
                                    <input type="text"  value='Smart замок без приложения' disabled/>
                                
                                </div>
                             
                                <div className="color">
                                    <h2>Цвет:</h2>
                                        <div className="boxes">
                                            <input type="checkBox"className="box-color one" checked/>
                                            <input type="checkBox"className="box-color two" />
                                            <input type="checkBox"className="box-color three" />
                                        </div>    
                                </div>
                                
                            </div>

                            <div className="block-by">
                                <h3> Цена: {el.price}$  <span className="old-price">{el.price * 2.5}$</span></h3> 
                                <button className="for-buy">Купить</button>
                            </div>

                            <div className="block-info-about">
                                {["Оплата", "Монтаж и доставка", "Гарантии и выгода"].map((title, index) => (
                                    <details key={index} className="info-block" open >
                                    <summary
                                        className={activeIndex === index ? "block-info-summary active" : "block-info-summary"}
                                        onClick={() => addActive(index)}
                                    >
                                        {title}
                                    </summary>
                                    <p>
                                        Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa,
                                        Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay,
                                        Оплата картой в отделении
                                    </p>
                                    </details>
                                ))}
                            </div>                 
                    </div>
                </div>
           

                <div className="other"></div>
            </section>
        </div>
    )   
}

export default PageItem