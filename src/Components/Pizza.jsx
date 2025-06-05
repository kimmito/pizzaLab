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

    componentDidUpdate(prevProps) {
        if (prevProps.pizza.price !== this.props.pizza.price) {
            this.setState({
              price: this.props.pizza.price[this.state.selectedSize] || 0,
              available: this.props.pizza.availability
            }, this.updateTotalPrice);
        }
        if (prevProps.pizza.availability !== this.props.pizza.availability) {
            this.setState({
                available: this.props.pizza.availability
            });
        }
        if (this.props.isOrdered && prevProps.order !== this.props.order) {
            const orderItem = this.props.order[this.props.pizza.id];
            if (orderItem) {
                this.setState({
                    count: orderItem.count,
                    selectedSize: orderItem.selectedSize,
                    price: orderItem.price,
                    selectedIngredients: orderItem.selectedIngredients || {},
                    totalPrice: orderItem.totalPrice
                });
            }
        }
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
        const { pizza, isOrdered } = this.props;
        const { count, price } = this.state;

        if (count > 1) {
            const newCount = count - 1;
            const newTotalPrice = (price + this.calcIngredientsPrice()) * newCount;

            if (isOrdered) {
                this.props.addToOrder(pizza.id, {
                    ...this.state,
                    count: newCount,
                    totalPrice: newTotalPrice
                });
            }

            this.setState({
                count: newCount,
                totalPrice: newTotalPrice
            });
        } else {
            this.props.deleteFromOrder(pizza.id);
        }
    };

    handlePlus = () => {
        const { pizza, isOrdered } = this.props;
        const { price } = this.state;
        const newCount = this.state.count + 1;
        const newTotalPrice = (price + this.calcIngredientsPrice()) * newCount;

        if (isOrdered) {
            this.props.addToOrder(pizza.id, {
                ...this.state,
                count: newCount,
                totalPrice: newTotalPrice
            });
        }
    
        this.setState({
            count: newCount,
            totalPrice: newTotalPrice
        });
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
        const ingredientsPrice = this.calcIngredientsPrice(selectedIngredients);
        const newTotalPrice = (this.state.price + ingredientsPrice) * this.state.count;

        this.setState({
            selectedIngredients,
            totalPrice: newTotalPrice
        }, () => {
            if (this.props.isOrdered) {
                this.props.addToOrder(this.props.pizza.id, {
                    ...this.state,
                    selectedIngredients: selectedIngredients,
                    totalPrice: newTotalPrice
                });
            }
        });
    }
    
    calcIngredientsPrice = (ingredients = this.state.selectedIngredients) => {
        if (!ingredients) return 0;

        return Object.values(ingredients)
            .filter(ingredient => ingredient !== null && ingredient !== undefined)
            .reduce((total, ingredient) => total + (ingredient.price || 0), 0);
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
            <div className={`pizza ${!this.state.available && "unavailable"}`}>
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
                    <div className={[
                        "ingredients",
                        this.state.showIngredients && "shows",
                        Object.keys(this.state.selectedIngredients).length > 0 && "ingredients--active"
                    ].filter(Boolean).join(' ')}>
                        {!this.state.showIngredients ? (
                            <button onClick={this.handleShowIngredients} className="add-engridient-button">Добавки {
                                Object.keys(this.state.selectedIngredients).length > 0 && <span className="ingredients__count">{`(${Object.keys(this.state.selectedIngredients).length})`}</span>
                            }</button>
                        ) : (
                            <>
                                <button onClick={this.handleShowIngredients} className="add-engridient-button close-button">Закрыть</button>
                                <Ingredients ingredients={this.props.ingredients} selectedIngredients={this.state.selectedIngredients} onIngredientsChange={this.handleIngredientsChange} showIngredients={this.state.showIngredients} />
                            </>
                        )}
                    </div>

                    <div className="pizza__order">
                        <div className="pizza__select-order">
                            <div className="pizza__select-order__cost">{this.state.totalPrice} ₽</div>
                            <div className="pizza__select-order__count">
                                <button 
                                    onClick={this.handleMinus}
                                    className={`count-button count-minus ${this.state.count > 1 ? "count-button-active" : ""}`}
                                >-</button>
                            
                                <div className="count">{this.state.count}</div>
                                                
                                <button 
                                    onClick={this.handlePlus} 
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