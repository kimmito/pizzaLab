import React from "react";

class Header extends React.Component{
    render(){
        return(
            <header>
                <img src="../img/logo.svg" alt="PizzaLAB" />
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li className="header__navigation-list__item">Главная</li>
                        <li className="header__navigation-list__item">Меню</li>
                        <li className="header__navigation-list__item">События</li>
                        <li className="header__navigation-list__item">О Нас</li>
                    </ul>
                </nav>
                <div className="user-buttons">
                    <button className="button login-button">Войти</button>
                    <div className="button cart-button">Cart Icon</div>
                </div>
            </header>
        )
    }
}

export default Header;