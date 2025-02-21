import React, { useEffect, useState } from 'react';
import './Render.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const RenderCatr = ({setCorzItems,corzItems,setTowarLength,towarLength,setAllPride,OpenCorz}) =>{

    

    const dellItem = (id) => {
        setCorzItems(ob => ob.filter(el => el.id !== id));
        setTowarLength(lengths => {
            const updatedLengths = { ...lengths };
            delete updatedLengths[id];
            return updatedLengths;
        })
    };
    
    useEffect(()=>{
        const totalPrice = corzItems.reduce((sum,item) =>{
            return sum + item.price * (Number(towarLength[item.id]) || 1)
        },0)
        setAllPride(totalPrice)
    },[corzItems,towarLength])
     

    const Plus = (id) => { 
        setTowarLength(lengths => ({
            ...lengths,
            [id]: Number(lengths[id] || 1) + 1
        }));
    };

    const Minuse = (id) => {
        setTowarLength(lengths => {
            const updatedLengths = { ...lengths };
            if (updatedLengths[id] > 1) {
                updatedLengths[id] -= 1;
            } else {
                
                delete updatedLengths[id];
                setCorzItems(items => items.filter(el => el.id !== id)); 
            }
            return updatedLengths;
        });
    };
    
    
    const windowWidth = window.innerWidth;
    const navigate = useNavigate();

         const clickOnTowar = (el) =>{
           navigate(`/PageItem`,{state: {el}});
           OpenCorz()
         }
    
    return (
        <div>{corzItems.length > 0 ?(
                corzItems.map((el)=>(
                    <div key={el.id} className='Item-in-corz'>
                        <img src={el.image} alt="img" onClick={()=> clickOnTowar(el)} />
                            <div className="con-In-Corz">
                                <h1 onClick={()=> clickOnTowar(el)} >{windowWidth > 450? el.description : el.name}</h1>
                                    <div className="roll"> 
                                        <span onClick={() => Plus(el.id)}>+</span>
                                        <p>{Number(towarLength[el.id]) || 1}</p>
                                        <span onClick={() => Minuse(el.id)}>-</span>                                
                                    </div>
                            </div>
                            <div className="price-del">
                                <div className="block-icon-del" onClick={() => dellItem(el.id)}>
                                        <RiDeleteBinLine className='icon-del-item'/>
                                    <p>Удалить</p>
                                </div>                      
                                <h2>{el.price * (Number(towarLength[el.id]) || 1)}$</h2>
                            </div>                   
                    </div>
                ))
                ):(<div>Корзина пуста</div>)}        
        </div>
    );
    
}

export default RenderCatr