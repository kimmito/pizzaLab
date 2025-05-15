import React from "react";
import { BsCart2 } from "react-icons/bs";
import { GiPizzaCutter } from "react-icons/gi";

class Header extends React.Component{
    render(){
        return(
            <header>
                <a href="#" className="logo">
                    <GiPizzaCutter className="logo-icon"/> 
                    <span>Pizza</span><span>LAB</span>
                </a>
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li className="header__navigation-list__item nav-active"><a href="#home" className="header__navigation__link">Главная</a></li>
                        <li className="header__navigation-list__item"><a href="#menu" className="header__navigation__link">Меню</a></li>
                        <li className="header__navigation-list__item"><a href="#events" className="header__navigation__link">События</a></li>
                        <li className="header__navigation-list__item"><a href="#about" className="header__navigation__link">О нас</a></li>
                    </ul>
                </nav>
                <div className="user-buttons">
                    <button type="button" className="button">Войти</button>
                    <button onClick={this.props.renderCart} type="button" className="button cart-button"><BsCart2 className="cart-icon"/></button>
                </div>
            </header>

        )
    }
}

export default Header;