import React from "react";
import { BsCart2 } from "react-icons/bs";
import { GiPizzaCutter } from "react-icons/gi";

class Header extends React.Component{
    render(){
        return(
            <header>
                <div className="logo">
                    <GiPizzaCutter className="logo-icon"/> 
                    <span>Pizza</span><span>LAB</span>
                </div>
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li className="header__navigation-list__item active">Главная</li>
                        <li className="header__navigation-list__item">Меню</li>
                        <li className="header__navigation-list__item">События</li>
                        <li className="header__navigation-list__item">О Нас</li>
                    </ul>
                </nav>
                <div className="user-buttons">
                    <button type="button" className="button">Войти</button>
                    <button type="button" className="button cart-button"><BsCart2 className="cart-icon"/></button>
                </div>
            </header>

        )
    }
}

export default Header;