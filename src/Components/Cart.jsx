import React from "react";

class Cart extends React.Component{
    renderOrderItems = () => {
        const orderItems = Object.entries(this.props.order || {}).map(([id, item]) => {
            return(
                <li key={id} className="cart__order-item">
                    <div className="order__item-info__block">
                        <img src={item.image} alt="" className="order__item-image" />
                        <div className="order__item-desc">
                            <div className="order__item-names">
                                <span className="order__item-name">{item.name}</span>
                                <span className="order__item-size">
                                  {{
                                    0: '22 см',
                                    1: '28 см',
                                    2: '33 см'
                                  }[item.selectedSize]}
                                </span>
                            </div>

                            <div className="order__item-total">
                                <span className="order__item-count"> {item.count} шт.</span>
                                <span className="order__item-price"> {item.price * item.count} ₽</span>
                            </div>
                        </div>
                    </div>
                    <div className="order__item-ingredients">
                      {item.selectedIngredients && Object.keys(item.selectedIngredients).length > 0 ? (
                        <>
                          <div className="ingredients__title">Добавки: </div>
                          {Object.values(item.selectedIngredients)
                            .filter(ingr => ingr?.name)
                            .map(ingr => ingr.name)
                            .join(', ')}
                        </>
                      ) : null}
                    </div>
                </li>
            )
            
        })
        return orderItems.length > 0 ? orderItems : <li className="order__empty">Корзина пуста</li>
    }
    calculateTotal = () => {
        return 0;
    }

    render(){
        return(
            <div className="cart">
                <div className="cart__wrapper">
                    <button className="cart__close-button" onClick={() => this.props.renderCart()}>x</button>
                    <div className="cart__content">
                        <h2 className="title-text cart__title">Корзина</h2>
                        <ul className="cart__order-list">
                            {this.renderOrderItems()}
                        </ul>

                        <div className="cart__total">
                            <span>Итого: {this.calculateTotal()} ₽</span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Cart;