import React from "react";

class Pizza extends React.Component{
    render(){
        return(
            <div className="pizza">
                <div className="pizza__wrapper">
                    <img src="https://i.postimg.cc/RZgYcL50/italiaono.png"
                     alt="PizzaName" className="pizza__image" />
                    <h3 className="pizza__name">Маргарита</h3>
                    <p className="desc-text pizza__desc">Lorem ipsum dolor sit, amet conse adipisicing elit.</p>
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
                            <div className="pizza__select-order__cost">700 <span>₽</span></div>
                            <div className="pizza__select-order__count">
                                <button className="count-button count-munus"></button>
                                <span className="count">1</span>
                                <button className="count-button count-plus count-button-active"></button>
                            </div>
                        </div>
                        <button className="button pizza__order__button">Добавить в корзину</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pizza;