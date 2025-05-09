import React from "react";
import hotImg from "../img/hot.png";
import { GiQueenCrown } from "react-icons/gi";
import { BsCart2 } from "react-icons/bs";
import Ingredients from "./Ingredients";

class Pizza extends React.Component {
    state = {
        name: this.props.pizza.name,
        count: 1,
        selectedSize: 1,
        ordered: false,
        price: this.props.pizza.price[1],
        ingredients: {},
        available: this.props.pizza.availability,
        showIngredients: false,
    }
    
    handleMinus = () => {
        this.setState(prevState => ({
            count: prevState.count > 1 ? prevState.count - 1 : prevState.count
        }));
    }
    
    handlePlus = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    };

    calcIngredientsPrice = () => {
        return 0;
    }
    
    calcPrice = () => {
        return (this.state.price + this.calcIngredientsPrice()) * this.state.count;
    }
    
    handleSelectSize = (sizeIndex) => {
        const { pizza } = this.props;
        const price = Array.isArray(pizza.price) && pizza.price[sizeIndex] !== undefined 
            ? pizza.price[sizeIndex] 
            : 0;
        
        this.setState({
            selectedSize: sizeIndex,
            price: price,
            available: price !== 0 && pizza.availability
        });
    }

    handleShowIngredients = () => {
        this.setState(prevState => ({
            showIngredients: !prevState.showIngredients
        }));
    }

    render() {
        if (!this.props.pizza) {
            return null;
        }
        
        const { pizza } = this.props;
        const isHot = pizza.tags?.includes("острая");
        const isPremium = pizza.tags?.includes("премиум");
        const sizes = ["22", "28", "33"];

        return (
            <div className="pizza">
                <img 
                    src={pizza.image || "https://i.postimg.cc/RZgYcL50/italiaono.png"}
                    alt={pizza.name} 
                    className="pizza__image" 
                />
                {isHot ? (
                    <h3 className="pizza__name">
                        {pizza.name}
                        <img src={hotImg} alt="" className="hot-icon"/>
                    </h3>
                ) : isPremium ? (
                    <h3 className="pizza__name">
                        {pizza.name}
                        <GiQueenCrown className="premium-icon"/>
                    </h3>
                ) : (
                    <h3 className="pizza__name">{pizza.name}</h3>
                )}
                <div className="pizza__wrapper">
                    <p className="desc-text pizza__desc">{pizza.description}</p>
                    <div className="pizza__sizes">
                        <ul className="pizza__sizes-list">
                            {[0, 1, 2].map((sizeIndex) => (
                                <li 
                                    key={sizeIndex}
                                    onClick={() => {this.handleSelectSize(sizeIndex); 
                                        this.setState({ordered: false})}}
                                    className={`pizza__sizes-item ${
                                        this.state.selectedSize === sizeIndex ? "selected" : ""
                                    }`}
                                >
                                    {sizes[sizeIndex]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`ingredients ${this.state.showIngredients && "shows"}`}>
                        {!this.state.showIngredients ? (
                            <button onClick={this.handleShowIngredients} className="add-engridient-button">Добавки</button>
                        ) : (
                            <>
                                <button onClick={this.handleShowIngredients} className="add-engridient-button close-button">Закрыть</button>
                                <Ingredients showIngredients={this.state.showIngredients} />
                            </>
                        )}
                    </div>

                    <div className="pizza__order">
                        <div className="pizza__select-order">
                            <div className="pizza__select-order__cost">{this.calcPrice()} <span>₽</span></div>
                            <div className="pizza__select-order__count">
                                <button onClick={() => {this.handleMinus(); this.setState({ordered: false})}} className={`count-button count-munus ${this.state.count >1 ? "count-button-active" : null}`}>-</button>
                                <div className="count">{this.state.count}</div>
                                <button onClick={() => {this.handlePlus(); this.setState({ordered: false})}} className="count-button count-plus count-button-active">+</button>
                            </div>
                        </div>
                        {!this.state.ordered ? 
                        <button disabled={!this.state.available} onClick={() => {
                            this.props.addToOrder(pizza.id, this.state);
                            this.setState({ordered: !this.state.ordered})}} 
                            className={`button pizza__order__button ${!this.state.available ? "disabled" : ""}`}>
                                {this.state.available ? "Добавить в корзину" : "Нет в наличии"}</button>
                                : <button 
                                disabled={!this.state.available} 
                            onClick={(e) => {
                                    const icon = e.currentTarget.querySelector('.goto-cart-icon');
                                    if (icon) {
                                        icon.classList.add('animate');
                                    }
                                    setTimeout(() => {
                                        this.props.renderCart();
                                    }, 500);
                                }} 
                                className={`button pizza__order__button goto-cart__button ${!this.state.available ? "disabled" : ""}`}>
                                    {this.state.available ? 
                                    (<>
                                        <BsCart2 className="goto-cart-icon"/>
                                        <span>К корзине</span>
                                    </>)
                                    : "Нет в наличии"}
                            </button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Pizza;