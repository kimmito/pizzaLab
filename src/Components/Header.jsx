import React from "react";
import { BsCart2 } from "react-icons/bs";
import { GiPizzaCutter } from "react-icons/gi";

class Header extends React.Component{
    render(){
        return(
            <header className="animate__animated animate__backInDown">
                    <div className="logo animate__animated animate__headShake">
                        <GiPizzaCutter className="logo-icon" /> 
                        <span>Pizza</span><span>LAB</span>
                    </div>
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li className="header__navigation-list__item nav-active"><a href="#home" className="header__navigation__link">Главная</a></li>
                        <li className="header__navigation-list__item"><a href="#menu" className="header__navigation__link">Меню</a></li>
                        <li className="header__navigation-list__item"><a href="#events" className="header__navigation__link">События</a></li>
                        <li className="header__navigation-list__item"><a href="#about" className="header__navigation__link">О нас</a></li>
                        {this.props.authorized && <li onClick={() => this.props.toggleMenuAdmin()} className="header__navigation-list__item"><button className="header__navigation__link">Админ-панель</button></li>}
                    </ul>
                </nav>
                <div className="user-buttons">
                    <button onClick={() => this.props.authorization()} type="button" className="button">Войти</button>
                    <button 
                        onClick={this.props.renderCart} 
                        type="button" 
                        className={`button cart-button ${this.props.calcOrderCount() > 0 ? 'cart-active' : ''}`}
                        >
                        <BsCart2 className={`cart-icon ${this.props.calcOrderCount() > 0 ? 'cart-active' : ''}`}/>
                        {this.props.calcOrderCount() > 0 && (
                            <span className="cart__count">{this.props.calcOrderCount()}</span>
                        )}
                    </button>
                </div>
            </header>
        )
    }
}

export default Header;