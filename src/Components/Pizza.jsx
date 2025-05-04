import React from "react";
import hotImg from "../img/hot.png";

class Pizza extends React.Component{
    render(){
        if (!this.props.pizza){
            return null;
        }
        const { pizza } = this.props;
        const isHot = pizza.tags && pizza.tags.includes("острая");
        return(

            <div className="pizza">
                <img src={pizza.image || "https://i.postimg.cc/RZgYcL50/italiaono.png"}
                 alt={pizza.name} className="pizza__image" />
                {isHot ? <h3 className="pizza__name">{pizza.name}<img src={hotImg} alt="" className="hot"/></h3> : null}
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
                                <button className="count-button count-munus"></button>
                                <span className="count">1</span>
                                <button className="count-button count-plus count-button-active"></button>
                            </div>
                        </div>
                        <button className={`button pizza__order__button ${!pizza.availability ? "disabled" : ""}`}>{pizza.availability ? "Добавить в корзину" : "Нет в наличии"}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pizza;