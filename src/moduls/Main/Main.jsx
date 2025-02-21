import React, { useEffect, useState } from "react";
import "./CSS.css";
import imgDorHandle from "../../img/Door-Handle.jpg";
import IconOne from'../../img/Icon-one.png'
import IconTwo from'../../img/Icon-two.png'

import CatOne from'../../img/Cat-item-one.png'
import CatTwo from'../../img/Cat-item-two.png'
import CatThree from'../../img/Cat-Item-three.png'
import CatFourth from'../../img/Cat-item-fourth.png'

import PopularOne from'../../img/Popular-one.png'
import PopularTwo from'../../img/Populer-two.jpg'
import PopularThree from'../../img/Popular-three.jpg'
import PopularFourth from'../../img/Popular-fourth.jpg'


import { useNavigate } from "react-router-dom";


import { useRef } from "react";




const Preview = ({CartOpen,setCorzItems,corzItems,products}) => {
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.3 } // Запуск анимации, когда 30% блока видно
        );

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionsRef.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);


    const addToCorz = () => {
        if(products[2]) {
            
            setCorzItems((prevItems) => {
                const itemIn = prevItems.find(item => item.id === products[2].id);
                if (itemIn) {
                    return prevItems.map(item =>
                        item.id === products[2].id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                    );
                } else {
                    return [...prevItems, { ...products[2], quantity: 1 }];
                }
            });            
                
        }
    }
    
    const [conTowarClick,setConTowawrClick] = useState(null)

    const navigate = useNavigate();

    const clickOnTowar = (el) =>{
      setConTowawrClick(el)
      navigate(`/PageItem`,{state: {el}});
    }


    const toCat = () => {
        navigate(`/Katalog`);
    }


    const [callBack,setCallBack] = useState({
        naem:'',
        email:''
    })

    const change = (e) =>{
        const {name,value} = e.target;

        setCallBack((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const Clear = () => {
        if ((callBack?.name?.trim() || '') !== '' && (callBack?.email?.trim() || '') !== '') {
            alert('Мы вам вскоре перезвоним!');
            setCallBack({ name: '', email: '' }); // Очищаємо об'єкт правильно
        } else {
            alert('Заполните все поля');
        }
    };

    return (
        <main>
            {CartOpen? null :(<>

                <div className="Preview hidden" ref={(el) => sectionsRef.current.push(el)}>
                    <div className="con-prev">
                        <img src={imgDorHandle} alt="DorHandle"/>        
                            <div className="Info">
                                <h1 className="h ha">Golden Soft <br/>
                                    GS-200Z-5 для офиса</h1>
                                    <div className="InfoOf">
                                        <div className="infoIn">
                                        <h2>
                                        Замок дверной электронный Golden Soft GS-200Z-5 имеет роскошный глянцевый блеск, четкие линии, красивые формы.
                                        </h2>
                                        <h2>
                                            Подходит для установки на деревянную/межкомнатную дверь.<br/><br/>
                                        </h2>
                                        </div>
                                            <div className="Block-price">
                                                <h3>Цена</h3>
                                                <h1 className="ha">3000$<span className="Old-Price">5 000$</span></h1>
                                                <button onClick={addToCorz}>Добавить в корзину</button>
                                            </div>
                                    </div>
                            </div>
                    </div>
                </div>

            <div className="Numbers hidden" ref={(el) => sectionsRef.current.push(el)}>
                    <div className="Con-Num">
                        <h1>5,567</h1>
                        <h3>Счастливых клиентов</h3>
                    </div>
                    <div className="Con-Num">
                        <h1>1245</h1>
                        <h3>Продуктов на выбор</h3>
                    </div>
                    <div className="Con-Num">
                        <h1>372</h1>
                        <h3>Продаж в день</h3>
                    </div>
                    <div className="Con-Num">
                        <h1>20</h1>
                        <h3>лет на рынке</h3>
                    </div>
                </div>

            <div className="Why-Golden-service hidden" ref={(el) => sectionsRef.current.push(el)}>
                <div className="Name">
                    <h1 className="ha">Почему GoldenService? </h1>
                </div>
                <div className="Golden-ConTainer">
                    <div className="Gold-con">
                        <div className="Golden-con">
                            <img src={IconOne} alt="img-One" />
                            <h3>Возврат удвоенной стоимости каждого замка в случае брака. </h3>
                        </div>
                    </div>

                    <div className="Gold-con">
                        <div className="Golden-con">
                            <img src={IconTwo} alt="img-One" />
                            <h3>Наносим ваш логотип компании на наш продукт </h3>
                        </div>
                    </div>
                    
                    <div className="Gold-con">
                        <div className="Golden-con">
                            <img src={IconOne} alt="img-One" />
                            <h3>Возврат удвоенной стоимости каждого замка в случае брака.  </h3>
                        </div>
                    </div>  
                </div>
            </div> 

            <div className="Category hidden" ref={(el) => sectionsRef.current.push(el)}>
                <div className="Category-name">
                    <h1 className="ha">Категории</h1>
                </div>
                <div className="Category-container">
                    <div className="category-block">
                        <div className="category-item">
                            <img src={CatOne} alt="" />
                                <div className="cat-forBuy">
                                    <h2>Для отелей</h2>
                                    <button onClick={()=>clickOnTowar(products[1])}>Перейти</button>
                                </div>   
                        </div>
                        <div className="category-item">
                            <img src={CatTwo} alt="" />
                                <div className="cat-forBuy">
                                    <h2>Для шкафчиков</h2>
                                    <button onClick={() => clickOnTowar(products[5])}>Перейти</button>
                                </div>   
                        </div>
                    </div>
                    <div className="category-block">
                        <div className="category-item">
                            <img src={CatThree} alt="" />
                                <div className="cat-forBuy">
                                    <h2>Для офисов</h2>
                                    <button onClick={() => clickOnTowar(products[2])}>Перейти</button>
                                </div>             
                        </div>
                        <div className="category-item">
                            <img src={CatFourth} alt="" />
                                <div className="cat-forBuy">
                                    <h2>Замки для дома</h2>
                                    <button onClick={() => clickOnTowar(products[0])}>Перейти</button>
                                </div>  
                        </div>
                    </div>
                </div>
                <button className="All" onClick={toCat}> Все категории</button>
            </div>
            
            <div className="Popular-products hidden" ref={(el) => sectionsRef.current.push(el)}>
                    <div className="Popular-products-name">
                        <h1 className="ha">Наши популярные продукты</h1>
                    </div>
                    <div className="Products-container">
                        <div className="Product-block">
                            <div className="foto">
                                 <span className="Stan">В наличии</span>
                                 <span className="SALE">SALE</span>
                                 <img src={PopularOne} alt=""  onClick={() => clickOnTowar(products[3])}/>
                            </div>
                            <div className="info-price">
                                <h3>Дверной Замок Golden Soft для отеля</h3>
                                <h2>3 000$ <span className="opac"> 4 000$</span></h2>
                            </div>
                        </div>
                        <div className="Product-block">
                            <div className="foto">
                                 <span className="Stan">Нет в наличии</span>
                                 <span className="SALE">SALE</span>
                                 <img src={PopularTwo} alt="" onClick={() => clickOnTowar(products[1])}/>
                            </div>
                            <div className="info-price">
                                <h3>Вариативный замок Golden Soft для отеля</h3>
                                <h2>3 00$ <span className="opac"> 4 000$</span></h2>
                            </div>
                        </div>
                        <div className="Product-block">
                            <div className="foto">
                                 <span className="Stan">В наличии</span>
                                 <span className="SALE">SALE</span>
                                 <img src={PopularThree} alt="" onClick={() => clickOnTowar(products[2])}/>
                            </div>
                            <div className="info-price">
                                <h3>Дверной Замок Golden Soft для офиса</h3>
                                <h2>2 000$ <span className="opac"> 4 000$</span> </h2>
                            </div>
                        </div>
                        <div className="Product-block">
                            <div className="foto">
                                <span className="Stan">В наличии</span>
                                <span className="SALE">SALE</span>
                                 <img src={PopularFourth} alt="" onClick={() => clickOnTowar(products[3])}/>
                            </div>
                            <div className="info-price">
                                <h3>Дверной Замок Golden Soft для офиса</h3>
                                <h2>2 500$<span className="opac"> 4 000$</span></h2>
                            </div>
                        </div>
                    </div>

                <div className="Call-back">
                    <div className="call-back-con">
                        <h1 className="ha">Мы Вам перезвоним</h1>
                        <h2>Если у вас возникли какие-то вопросы или проблемы, 
                            заполните форму и мы Вам перезвоним. </h2>
                        <form>
                            <input type="text" name="name" placeholder='Ваше имя' value={callBack.name || ''} onChange={change}/>
                            <input type="text" name="email" placeholder='Ваше Email'value={callBack.email || ''} onChange={change} />
                            <button type="button" onClick={Clear}>Отправить</button>
                        </form>
                    </div>
                 </div>

            </div>     
            </>)}   
        </main>
    )
}

export default Preview;