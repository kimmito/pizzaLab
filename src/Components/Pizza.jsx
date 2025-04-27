import React from "react";

class Pizza extends React.Component{
    render(){
        return(
            <div className="pizza">
                <img src="../img/menu/italian.png" alt="PizzaImage" className="pizza__image" />
                <h3 className="pizza__name">pizzaName</h3>
                <p className="desc-text pizza__desc">desc</p>
                <div className="pizza__sizes">
                    <ul className="pizza__sizes-list">
                        <li className="pizza__sizes-item">22</li>
                        <li className="pizza__sizes-item">28</li>
                        <li className="pizza__sizes-item">33</li>
                    </ul>
                </div>
                <div className="pizza__add-engridient">+ Добавки</div>
                <div className="pizza__order">
                    <div className="pizza__select-order">
                        <div className="pizza__select-order__cost">700 ₽</div>
                        <div className="pizza__select-order__count">1</div>
                    </div>
                    <button className="button pizza__order__button">Добавить в корзину</button>
                </div>
            </div>
        )
    }
}

export default Pizza;