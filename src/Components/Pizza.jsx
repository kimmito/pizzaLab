import React from "react";
import hotImg from "../img/hot.png";
import { GiQueenCrown } from "react-icons/gi";
import { BsCart2 } from "react-icons/bs";
import Ingredients from "./Ingredients";

class Pizza extends React.Component {
    state = {
        image: this.props.pizza?.image,
        name: this.props.pizza?.name,
        count: 1,
        selectedSize: 1,
        price: this.props.pizza?.price?.[1] || 0,
        selectedIngredients: {},
        available: this.props.pizza?.availability || false,
        showIngredients: false,
        totalPrice: this.props.pizza.price[1],
    }
    handleAddToCart = () => {
        this.props.addToOrder(this.props.pizza.id, {
            ...this.state,
            image: this.props.pizza.image,
            name: this.props.pizza.name,
            totalPrice: this.state.totalPrice
        });
    }

    handleGoToCart = (e) => {
        const icon = e.currentTarget.querySelector('.goto-cart-icon');
        if (icon) {
            icon.classList.add('animate');
        }
        setTimeout(() => {
            if (icon) icon.classList.remove('animate');
            this.props.renderCart();
        }, 500);
    }
    
    handleMinus = () => {
        this.setState(prevState => ({
            count: prevState.count > 1 ? prevState.count - 1 : prevState.count
        }), this.updateTotalPrice);
    }
    
    handlePlus = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }), this.updateTotalPrice);
    };

    handleSelectSize = (sizeIndex) => {
        const { pizza } = this.props;
        const price = Array.isArray(pizza.price) && pizza.price[sizeIndex] !== undefined 
            ? pizza.price[sizeIndex] 
            : 0;
        
        this.setState({
            selectedSize: sizeIndex,
            price: price,
            available: price !== 0 && pizza.availability
        }, this.updateTotalPrice);
    }

    handleShowIngredients = () => {
        this.setState(prevState => ({
            showIngredients: !prevState.showIngredients
        }));
    }

    handleIngredientsChange = (selectedIngredients) => {
    this.setState({selectedIngredients: selectedIngredients}, () => {
        this.updateTotalPrice();
        if (this.state.ordered) {
            this.props.addToOrder(this.props.pizza.id, {
                ...this.state,
                selectedIngredients,
                totalPrice: this.state.totalPrice
            });
        }
    });
}
    calcIngredientsPrice = () => {
        if (!this.state.selectedIngredients) return 0;
        
        return Object.values(this.state.selectedIngredients)
            .filter(ingredient => ingredient)
            .reduce((total, ingredient) => total + ingredient.price, 0);
    }

    updateTotalPrice = () => {
    const ingredientsPrice = this.calcIngredientsPrice();
    const basePrice = this.state.price;
    const count = this.state.count;

    const newTotalPrice = (basePrice + ingredientsPrice) * count;
    
    this.setState({totalPrice: newTotalPrice}, () => {
        if (this.state.ordered) {
            this.props.addToOrder(this.props.pizza.id, {
                ...this.state,
                totalPrice: newTotalPrice
            });
        }
    });
}

    render() {
        if (!this.props.pizza) {
            return null;
        }
        
        const { pizza, isOrdered} = this.props;
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
                                    onClick={() => {
                                        this.handleSelectSize(sizeIndex); 
                                        this.state.ordered && this.props.addToOrder(pizza.id, this.state);
                                    }}
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
                            <button onClick={this.handleShowIngredients} className="add-engridient-button">Добавки {
                                Object.keys(this.state.selectedIngredients).length > 0 && <span className="ingredients__count">{`(${Object.keys(this.state.selectedIngredients).length})`}</span>
                            }</button>
                        ) : (
                            <>
                                <button onClick={this.handleShowIngredients} className="add-engridient-button close-button">Закрыть</button>
                                <Ingredients selectedIngredients={this.state.selectedIngredients} onIngredientsChange={this.handleIngredientsChange} showIngredients={this.state.showIngredients} />
                            </>
                        )}
                    </div>

                    <div className="pizza__order">
                        <div className="pizza__select-order">
                            <div className="pizza__select-order__cost">{this.state.totalPrice} <span>₽</span></div>
                            <div className="pizza__select-order__count">
                                <button 
                                    onClick={() => {
                                    if (this.state.count > 1) {
                                        this.handleMinus();
                                        this.props.addToOrder(pizza.id, {
                                        ...this.state,
                                        count: this.state.count - 1,
                                        totalPrice: (this.state.price + this.calcIngredientsPrice()) * (this.state.count - 1)
                                        });
                                    } else {
                                        this.props.deleteFromOrder(pizza.id);
                                    }
                                    }}
                                    className={`count-button count-minus ${this.state.count > 1 ? "count-button-active" : ""}`}
                                >-</button>

                                <div className="count">{this.state.count}</div>
                            
                                <button 
                                    onClick={() => {
                                    this.handlePlus();
                                    this.props.addToOrder(pizza.id, {
                                        ...this.state,
                                        count: this.state.count + 1,
                                        totalPrice: (this.state.price + this.calcIngredientsPrice()) * (this.state.count + 1)
                                    });
                                    }} 
                                    className="count-button count-plus count-button-active"
                                >+</button>
                                </div>
                            </div>
                            {!isOrdered ? 
                            <button disabled={!this.state.available} onClick={() => {this.props.addToOrder(pizza.id, this.state); this.setState({showIngredients: false})}} 
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
                                        icon.classList.remove('animate')
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