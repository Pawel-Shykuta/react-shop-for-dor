import React from "react";
import "./CSS.css"
import Logo from'../../img/Logo.png'

const Footer = ({CartOpen}) => {
    return(
        
        CartOpen? null:(<>
             <footer>
                    <div className="footer-con">
                        <div className="info-con">

                            <div className="icons">
                                <img src={Logo} alt="" />
                            </div>

                            <div className="navigation">
                                <h1>Навигация</h1>
                                <h2>Главная</h2>
                                <h2>Контакты</h2>
                                <h2>Оптовая продажа</h2>
                                <h2>О нас</h2>
                            </div>
                            <div className="Contacts">
                                <h1>Наши контакты</h1>
                                <h3>Телефоны</h3>
                                <h2>+(380) 63 52 55 122</h2>
                                <h2>+(380) 66 32 56 232</h2>
                                <h3>Email</h3>
                                <h2>vladpertcev@mail.ua</h2>
                                <h2>korobko416@gmail.com</h2>
                            </div>
                            <div className="Adress">
                                <h1>Наш адрес</h1>
                                <h2>Украина,<br />
                                    г. Киев,<br />
                                    ул. Льва Толстого 23</h2>
                            </div>
                            <div className="info">
                                <h1>Информацыя</h1>
                                <h2>Доставка и оплата</h2>
                                <h2>Гарантии <br />
                                возврата товара</h2>             
                            </div>
                            
                            <div className="Last">
                                <h1>© 2021 Golden Soft All rights reserved.</h1>
                            </div>
                        </div>
                    </div>
                </footer>
            </>)    
    )
}

export default Footer;