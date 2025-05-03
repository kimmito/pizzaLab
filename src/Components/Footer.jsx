import React from 'react'
import { GiPizzaCutter } from "react-icons/gi";
import { FaInstagram, FaVk, FaTelegramPlane } from "react-icons/fa";


const Footer = (props) => {
    return(
        <div className="footer">
            <div className="footer__container">
                <div className="footer__nav">
                    <div className="footer__nav__col">
                        <a href="#" className="footer__nav__item">
                            <span className="logo footer__logo">
                                <GiPizzaCutter className="logo-icon"/> 
                                <span>Pizza</span><span>LAB</span>
                            </span>
                        </a>
                    </div>
                    <div className="footer__nav__col">
                        <a href="#" className="footer__nav__item footer__nav-head">Главная</a>
                        <a href="#" className="footer__nav__item">Меню</a>
                        <a href="#" className="footer__nav__item">Бестселлеры</a>
                        <a href="#" className="footer__nav__item">События</a>
                        <a href="#" className="footer__nav__item">О нас</a>
                    </div>
                    <div className="footer__nav__col">
                        <a href="#" className="footer__nav__item footer__nav-head">Меню</a>
                        <a href="#" className="footer__nav__item">Показать все</a>
                        <a href="#" className="footer__nav__item">Мясные</a>
                        <a href="#" className="footer__nav__item">Мясные</a>
                        <a href="#" className="footer__nav__item">Мясные</a>
                        <a href="#" className="footer__nav__item">Мясные</a>
                    </div>
                    <div className="footer__nav__col">
                        <a href="#" className="footer__nav__item footer__nav-head">События</a>
                        <a href="#" className="footer__nav__item">Наш блог</a>
                        <a href="#" className="footer__nav__item">Наш блог</a>
                        <a href="#" className="footer__nav__item">Наш блог</a>
                        <a href="#" className="footer__nav__item">Наш блог</a>
                    </div>
                    <div className="footer__nav__col">
                        <a href="#" className="footer__nav__item footer__nav-head">О нас</a>
                        <a href="#" className="footer__nav__item">Наша история</a>
                        <a href="#" className="footer__nav__item">Почему мы?</a>
                    </div>
                </div>
        
                <div className="footer__contacts">
                    <a href="tel:+7-888-88-88" className="footer__contacts__tel">+7 (888) 888-88-88</a>
                    <div className="footer__contacts__socials">
                        <a href="https://instagram.com" className="footer__contacts__socials__link">
                            <FaInstagram className="social-icon"/>
                        </a>
                        <a href="https://vk.com" className="footer__contacts__socials__link">
                            <FaVk className="social-icon" />
                        </a>
                        <a href="https://telegram.org" className="footer__contacts__socials__link">
                            <FaTelegramPlane className="social-icon" />
                            
                        </a>
                    </div>
                </div>
            </div>
        </div>
            
    )
}


export default Footer;