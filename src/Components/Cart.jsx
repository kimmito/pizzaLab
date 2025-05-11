import React from "react";

class Cart extends React.Component{
    renderOrderItems = () => {
        const orderItems = Object.entries(this.props.order || {}).map(([id, item]) => {
            return(
                <li key={id} className="cart__order-item">
                    <span className="order__item-name">{item.name}</span>
                    <span className="order__item-count"> {item.count} шт.</span>
                    <span className="order__item-price"> {item.price * item.count} ₽</span>
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