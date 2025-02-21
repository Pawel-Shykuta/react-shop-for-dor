import React, { useState,useEffect } from "react";
import './FinishStyle.css'

const Finish = ({Promo,setAllPride,corzItems,towarLength,setTowarLength,setCorzItems,AllPrice}) =>{
    
    const [promoVal,setPromoVal] = useState('')
    const [promocode,setPromocode] = useState(false)

    const Plus = (id) => { 
        setTowarLength(lengths => ({
            ...lengths,
            [id]: Number(lengths[id] || 1) + 1
        }));
    };


    useEffect(()=>{
        const totalProce = corzItems.reduce((sum, el) => {
            return sum + el.price * (Number(towarLength[el.id]) ||1)
        },0)
        setAllPride(totalProce)
    },[corzItems,towarLength,setAllPride])



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
      


    const dellItem = (id) => {
        setCorzItems((obj)=> obj.filter((el) => el.id !==id))
        setTowarLength(lengths =>{
            const updatedLengths = {...lengths}
            delete updatedLengths[id]
            return updatedLengths
        })
    }

    

    const changePromo = () => {
        setPromocode(!promocode)
    }


    
    const [Check,setCheck] = useState('')

    const clearPromoForm = () =>{   
        setCheck(promoVal)
        setPromoVal('')
        if(String(Check) ===  String(Promo)){
            alert('Промокод активирован!') 
        }else{
            alert('НЕ верный промокод')
        }
    }

      
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        delivery: 'sdek', 
        payment: 'cash',
        comment: ''
    });
    

    const [messageToTelegram, setMessageToTelegram] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };   

    const [isFormFilled, setFormIsFiiled] = useState(false)
     
    useEffect(() => {
        setFormIsFiiled(() => Object.values(formData).every(some => some.trim() !==''))
    },[formData])

    useEffect(() => {
        console.table("Сообщение для Telegram:", messageToTelegram);
    }, [messageToTelegram]); 

    


    const handleSubmit = (e) => {
        e.preventDefault();
            if (isFormFilled) {
                const formDataText = Object.entries(formData).map(([key, value]) => `${key}: ${value}`).join("\n");
                const message = `Form User:\n${formDataText}\n\nTowars:\n${corzItems.map(item => `Name: ${item.name}\nPrice: ${item.price}\nQuantity: ${towarLength[item.id] || 1}`).join("\n\n")}\n\nAll Price: ${AllPrice}`;
              
                sendToTelegram(message)
                console.log("Форма заполнена и отправлена:", formData);
                
                setFormData({});
                setMessageToTelegram("");
                setCorzItems([])
                setTowarLength({})
                alert("Заявка отправлена")
            } else {
                console.log("Заполните все поля!");
            }
    }

   


    const TELEGRAM_BOT_TOKEN = '7305202944:AAGoHGkwxXkqMIXs3j653ynfrh-pv8WSQ7E';
    const TELEGRAM_CHAT_ID = '@TestFrontCaseThree';
    
    function sendToTelegram(message) {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const params = {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
        };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
    }
    

    


    return(    
            <div className="Container-Full">
                <h1>Оформление заказа</h1>
                    <div className="container-form">

                        <div className="conatiner-contacts-finish">
                             <h2>1. Контактные данные</h2>

                                <div className="name-surname">

                                    <div className="input-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" placeholder="Pasha" value={formData.name ||''} onChange={handleChange}/>
                                    </div>
                                 
                                    <div className="input-group">
                                        <label htmlFor="surname">Surname</label>
                                        <input type="text" id="surname" name="surname" placeholder="Shyukuta" value={formData.surname ||''} onChange={handleChange}/>
                                    </div>
                                    

                                </div>

                                <div className="phone-email">

                                    <div className="input-group">
                                        <label  htmlFor="phone">Phone</label>
                                        <input type="tel" id="phone" name="phone" placeholder="+(380)" value={formData.phone ||''} onChange={handleChange}/>
                                    </div>
                                    
                                    <div className="input-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" id="email" name="email" placeholder="some@gmail.com" value={formData.email ||''} onChange={handleChange}/>
                                    </div>
        
                                </div>
                            <h2>2. Доставка</h2>

                                <div className="delivery">

                                    <div className="radio-group">

                                        <label className="radio-label">
                                            <input type="radio" name="delivery" value="sdek" checked={formData.delivery === "sdek"} onChange={handleChange}/>
                                            <span className="custom-radio"></span>
                                            Укр пошта
                                        </label>
                                        
                                        <label className="radio-label">
                                            <input type="radio" name="delivery" value="pochta"  checked={formData.delivery === "pochta"} onChange={handleChange}/>
                                            <span className="custom-radio"></span>
                                            Нова пошта
                                        </label>

                                        <label className="radio-label">
                                            <input type="radio" name="delivery" value="delovye" checked={formData.delivery === "delovye"} onChange={handleChange}/>
                                            <span className="custom-radio"></span>
                                            Доставка на дом
                                        </label>

                                    </div>

                                </div>

                             <h2>3. Оплата</h2>  

                                <div className="Pay">

                                    <label className="radio-pay"> 
                                        <input type="radio" name="payment" value="cash"  checked={formData.payment === "cash"} onChange={handleChange}/>
                                        <span className="custom-radio"></span>
                                        Оплата при получении
                                    </label>

                                    <label className="radio-pay">
                                        <input type="radio" name="payment" value="card" checked={formData.payment === "card"} onChange={handleChange}/>
                                        <span className="custom-radio"></span>
                                        Банковская карта
                                    </label>                                      
                                </div> 
                            <h3>Комментарий</h3>
                            <div className="comment">
                                <textarea name="comment" id="textarea" value={formData.comment} placeholder="Напишите комментарий" onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                <div className="container-towars" style={{height : promocode? '750px':'600px'}}>
                    <h1>Итог</h1>
                        <div className="towar-shoving-to-buy">

                            {corzItems.length > 0 ? (
                                   corzItems.map((el,index)=>(

                                    <div key={index} className="Shoving-Rlrmrnts">
                                        <img src={el.image} alt="" />

                                            <div className="conWrap">

                                                <h2>{el.description}</h2>
                                                
                                                <div className="rollItem">

                                                    <div className="roll-block">
                                                        <span onClick={() => Plus(el.id)}>+</span>
                                                            <h2>{Number(towarLength[el.id]) || 1}</h2>
                                                        <span onClick={() => Minuse(el.id)}>-</span>
                                                    </div>
                   
                                                    <h3>{ el.price * (Number(towarLength[el.id]) ||1) } $</h3>                                                
                                                </div>
                                                <div className="del-Item" onClick={()=>dellItem(el.id)}></div>
                                            </div>
                                    </div>

                                ))
                            ):(
                                <div>Корзина покупки пуста!</div>
                            )}
                        </div>
                    <div className="footer-block-buy">                    
                        <button className="Butoon-Buy-Finish" style={{opacity: isFormFilled? 1:0.3}} onClick={handleSubmit}>Buy</button>
                            <div className="promo">
                                <h1>Промокод</h1>
                                <p onClick={changePromo}>{promocode?'Отменить':'Добавить'}</p>                              
                            </div>
                            {promocode ? (
                                    <div className="Promocode-Form">
                                        <input type="text" maxLength={7}  placeholder="alias" value={promoVal} onChange={(e) =>  setPromoVal(e.target.value)}/>
                                        <button className="Button-Promo" onClick={()=>{clearPromoForm();changePromo();} }>Применить</button>
                                    </div>
                                ):null}
                        <h4>Оформляя заказ, я принимаю условия <span className="Polzo">пользовательського соглашения</span></h4>
                    </div>
                    <div className="to-Pay-Finish">
                        <h1>К оплате: {Promo === Check? Math.floor(AllPrice / 1.5 ) :  AllPrice}$</h1>
                    </div>
                </div>
            </div>      
    )
}

export default Finish