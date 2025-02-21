import React, { useEffect } from "react";
import './CSS.css'

import Video from'../../img/Video.jpg'
import MissionOne from "../../img/MissionOne.jpg"
import MissionTwo from "../../img/MissionTwo.png"

import { useRef } from "react";


const AboutCompanny = () =>{

    const sectionRef = useRef([])

    useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("show");
                        }
                    });
                },
                { threshold: 0.3} 
            );
    
            sectionRef.current.forEach((section) => {
                if (section) observer.observe(section);
            });
    
            return () => {
                sectionRef.current.forEach((section) => {
                    if (section) observer.unobserve(section);
                });
            };
        }, []);

    return(
        <section className="Info-About-Compan">
            <div className="Compan-video hidden" ref={(el) => sectionRef.current.push(el)}>
                    <div className="videoCon">
                        <img src={Video} alt="" />

                            <div className="Info-compan">
                                <h3>О нас</h3>
                                <h1>Компания <span>Golden Soft</span></h1>
                                <p>Sit tempor ante justo amet duis. Ultricies cras eleifend elit, posuere et risus non. Id et ut pellentesque consequat, amet erat gravida euismod pharetra.s</p>
                            </div>
                    </div>

                </div>

                <div className="chiferki hidden" ref={(el) => sectionRef.current.push(el)}>
                    <div className="chiferki-con">

                        <div className="ciferki-block">
                            <h1>5,567</h1>
                            <p>Счастливых клиентов</p>
                        </div>

                        <div className="ciferki-block">
                            <h1>1245</h1>
                            <p>Продуктов на выбор</p>
                        </div>

                        <div className="ciferki-block">
                            <h1>372</h1>
                            <p>Продаж в день</p>
                        </div>

                        <div className="ciferki-block">
                            <h1>20</h1>
                            <p>Лет на рынке</p>
                        </div>

                    </div>
                </div>

                <div className="Info-Mission hidden" ref={(el) => sectionRef.current.push(el)}>

                        <div className="some-text">
                            <h2>Наша миссия</h2>
                            <p>Sit tempor ante justo amet duis. Ultricies cras eleifend elit, posuere et risus non. Id et ut pellentesque consequat, amet erat gravida euismod pharetra.</p>
                        </div>

                        <div className="mission-img">
                            <img src={MissionTwo} alt=""  className="MissionTwo"/>
                            <img src={MissionOne} alt=""  className="OneMission" />
                        </div>
                        
                </div>

                

        </section>
  
    )
}

export default AboutCompanny