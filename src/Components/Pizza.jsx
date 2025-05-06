import React from "react";
import hotImg from "../img/hot.png";
import { GiQueenCrown } from "react-icons/gi";

class Pizza extends React.Component{
    state = {
        count: 1,
        selectedSize: "28",
        ordered: false,
    }

    handleMinus = () => {

    }
    handlePlus = () => {

    }
    
    render(){
        if (!this.props.pizza){
            return null;
        }
        const { pizza } = this.props;
        const isHot = pizza.tags?.includes("острая");
        const isPremium = pizza.tags?.includes("премиум");
        return(

            <div className="pizza">
                <img src={pizza.image || "https://i.postimg.cc/RZgYcL50/italiaono.png"}
                 alt={pizza.name} className="pizza__image" />
                {isHot ? <h3 className="pizza__name">{pizza.name}<img src={hotImg} alt="" className="hot-icon"/></h3> : isPremium ? <h3 className="pizza__name">{pizza.name}<GiQueenCrown className="premium-icon"/></h3> : <h3 className="pizza__name">{pizza.name}</h3>}
                <div className="pizza__wrapper">
                    <p className="desc-text pizza__desc">{pizza.description}</p>
                    <div className="pizza__sizes">
                        <ul className="pizza__sizes-list">
                            <li className="pizza__sizes-item">22</li>
                            <li className="pizza__sizes-item selected">28</li>
                            <li className="pizza__sizes-item">33</li>
                        </ul>
                    </div>
                    <button className="add-engridient-button">+ Добавки</button>
                    <div className="pizza__order">
                        <div className="pizza__select-order">
                            <div className="pizza__select-order__cost">{pizza.price} <span>₽</span></div>
                            <div className="pizza__select-order__count">
                                <button onClick={() => this.handleMinus} className={`count-button count-munus ${this.state.count >1 ? "count-button-active" : null}`}>-</button>
                                <div className="count">{this.state.count}</div>
                                <button onClick={() => this.handlePlus} className="count-button count-plus count-button-active">+</button>
                            </div>
                        </div>
                        {!this.state.ordered ? 
                        <button disabled={!pizza.availability} onClick={() => {
                            this.props.addToOrder(pizza.id, this.state.count);
                            this.setState({ordered: !this.state.ordered})}} 
                            className={`button pizza__order__button ${!pizza.availability ? "disabled" : ""}`}>
                                {pizza.availability ? "Добавить в корзину" : "Нет в наличии"}</button>
                                : <button disabled={!pizza.availability} onClick={() => 
                                    this.props.goToCart()} 
                                    className={`button pizza__order__button goto-cart__button ${!pizza.availability ? "disabled" : ""}`}>
                                        {pizza.availability ? "Перейти к корзине" : "Нет в наличии"}</button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Pizza;