import React, { useEffect, useState } from "react";
import './OptCss.css'

import SellOne from '../../img/SellOne.jpg'
import SellTwo from'../../img/SellTwo.jpg'
import SellThree from '../../img/SellThree.jpg'

import WhyWee from'../../img/WhyWee.jpg'
import ProjectsBig from"../../img/ProjectsBig.png"

import { useRef } from "react";


const OptSell = () => {
    

    const sectionRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                    if(entry.isIntersecting){
                         entry.target.classList.add('show')
                    }
                })
            }, {threshold: 0.3}
        );

        sectionRef.current.forEach((section) => {
            if(section) observer.observe(section)
        })

        return () => {
            sectionRef.current.forEach((section) => {
                if(section) observer.unobserve(section)
            })
        }

    })


    const [tableInfo,setTableInfo] = useState({
            name:'',
            namecompan:'',
            tel:'',
            nametowar:'',
            quanty:''
        })

        const inputForm = (e) => {
            const {name,value} = e.target;
                setTableInfo((lastInfo) => ({
                    ...lastInfo, [name]:value
                }))   
        }

        const tuchOnButton = () => {
            console.table(tableInfo)
            setTableInfo('')
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
        <section className="OptZayav-Warpper">
             <div className="OptZayav">
                <div className="OptZayav-info">
                    <h1>Оформите заявку и <br />мы вам перезвоним</h1>
                    <p>Vitae, urna, massa dictumst morbi ut id dui 
                        nulla. Purus a velit sem viverra. Nunc ac quis 
                        donec nunc eu blandit ante nibh. Sit felis nulla 
                        donec mauris quis nulla velit.</p>
                </div>

                <div className="OptZayav-form hidden" ref={(el) => sectionRef.current.push(el)} >
                    <h2>Оформление заявки</h2>

                    <div className="Con-form">

                        <div className="block-user ">
                           
                            <div className="OptZayav-block-dorm">
                                <label htmlFor="name" >Name</label>
                                <input type="text" id="name" placeholder="Jorgan" name="name" value={tableInfo.name ||''} onChange={inputForm} />
                            </div>
                            
                            <div className="OptZayav-block-dorm">
                                <label htmlFor="nameCompan" >Name compan</label>
                                <input type="text" id="nameCompan" placeholder="Rolex"  name="namecompan" value={tableInfo.namecompan || ''} onChange={inputForm} />
                            </div>

                            <div className="OptZayav-block-dorm">
                                <label htmlFor="tel"  >Phone</label>
                                <input type="tel" id="tel" placeholder="(+380)"  name="tel" value={tableInfo.tel || ''} onChange={inputForm} />
                            </div>
                           
                        </div>

                        <div className="block-towar">

                            <div className="OptZayav-towar-block-name">
                                <label htmlFor="nameTowar" >Название товара</label>
                                <input type="text" id="nameTowar" placeholder="Введите название или артикул товара"  name="nametowar" value={tableInfo.nametowar ||''} onChange={inputForm}  />
                            </div>

                            <div className="OptZayav-towar-block-query">
                                <label htmlFor="nameTowar" >Количество</label>
                                <input type="text" id="nameTowar" placeholder="Количество товара"  name="quanty" value={tableInfo.quanty || ''} onChange={inputForm} />
                            </div>

                        </div>

                        <div className="OptZayav-check-box">

                            <div className="OptZayav-check-box-con">
                                <label>
                                    <input type="checkbox" id="check-box-logotyp" checked />
                                    <span className="checkmark"></span>
                                    Нанесение персонального логотипа (бесплатно)
                                </label>
                            </div>

                            <div className="OptZayav-check-box-con">
                                <label>
                                    <input type="checkbox" id="check-box-help" checked />
                                    <span className="checkmark"></span>
                                    Помощь в монтажных работах (бесплатно)
                                </label>
                            </div>

                        </div>

                        <div className="buy-towars-block">
                            <h3>Приблизительная стоимость</h3>
                             <button onClick={tuchOnButton}>Отправить заявку</button>
                           </div>


                    </div>
                </div>
             </div>



             <div className="OptZayav-hove-wee-work hidden" ref={(el) => sectionRef.current.push(el)}>
                <h1>Как мы работаем</h1>
                
                <div className="OptZayav-work-con">

                    <div className="block-info-OptZayav">
                        <img src={SellOne} alt="" />
                        <div className="oform">
                            <h2>Оформление заявки</h2>
                            <p>Вы оставляете заявку на сайте или связываетесь с нами по указанному на сайте номеру телефона</p>
                        </div>
                    </div>

                    <div className="block-info-OptZayav">
                        <img src={SellTwo} alt="" />
                        <div className="oform">
                            <h2>Согласование</h2>
                            <p>Мы консультируем Вас, согласовываем стоимость и точное время приезда нашего специалиста</p>
                        </div>
                    </div>

                    <div className="block-info-OptZayav">
                        <img src={SellThree} alt="" />
                        <div className="oform">
                            <h2>Отправка товара и установка</h2>
                            <p>Наш специалист по монтажу замков выезжает к Вам в точно зазначеное время по согласованному адресу</p>
                        </div>
                    </div>

                </div>             
             </div>

         
             <div className="Blocl-wgy-wee-OptZayav hidden" ref={(el) => sectionRef.current.push(el)}>
                    <h1>Почему стоит выбрат нас</h1>  

                        <div className="con-why-wee">
                            <img src={WhyWee} alt="" />

                            <div className="Hvastanie">
                                    <div className="item-havasta">
                                        <h1>Возврат удвоенной стоимости</h1>
                                        <p>За каждый отправленый товар который окажеться бракованным, мы вернем вам двойную стоимость.</p>
                                    </div>

                                    <div className="item-havasta">
                                        <h1>Возврат удвоенной стоимости</h1>
                                        <p>За каждый отправленый товар который окажеться бракованным, мы вернем вам двойную стоимость.</p>
                                    </div>

                                    <div className="item-havasta">
                                        <h1>Возврат удвоенной стоимости</h1>
                                        <p>За каждый отправленый товар который окажеться бракованным, мы вернем вам двойную стоимость.</p>
                                    </div>

                                    <div className="item-havasta last">
                                        <h1>Возврат удвоенной стоимости</h1>
                                        <p>За каждый отправленый товар который окажеться бракованным, мы вернем вам двойную стоимость.</p>
                                    </div>
                            </div>  
                            
                        </div>           
                </div>

            
                <div className="OptZayav-big-OptZayav hidden" ref={(el) => sectionRef.current.push(el)}>
                    <h1>Наши крупные проекты</h1>
                        <div className="OptZayav-OptZayav">
                                <img src={ProjectsBig} alt="ProjectsBig" />

                                <div className="projects-info">

                                    <div className="Projects-Logo">
                                        <h1>RADISSON</h1>
                                        <h2>HOTELS</h2>
                                    </div>

                                    <h1>Проект для гостинницы Radisson Hotels</h1>

                                    <div className="lazy-block">
                                        <div className="OptZayav-check-box-con leazy">
                                                <label>
                                                    <input type="checkbox" id="check-box-help" checked />
                                                    <span className="checkmark"></span>
                                                    Установлено 123 Вариативных замка Golden Soft для отеля
                                                </label>
                                            </div>

                                            <div className="OptZayav-check-box-con leazy">
                                                <label>
                                                    <input type="checkbox" id="check-box-help" checked />
                                                    <span className="checkmark"></span>
                                                    Было нанесено личный брендинг на все замки
                                                </label>
                                            </div>

                                            <div className="OptZayav-check-box-con leazy">
                                                <label>
                                                    <input type="checkbox" id="check-box-help" checked />
                                                    <span className="checkmark"></span>
                                                    Были проведны монтажные работы, также была произведена помощь в пкделючении замков к системе
                                                </label>
                                            </div>
                                        </div>
                                    <h1 className="Bud">Бюджет - <span>$5000</span></h1>
                                </div>
                        </div>
                </div>

        </section>
    )
}

export default OptSell