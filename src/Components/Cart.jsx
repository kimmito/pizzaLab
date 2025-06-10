import React from "react";
import "../css/cart.css"
import PropTypes from "prop-types";

class Cart extends React.Component {
    state = {
        total: 0,
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        this.updateTotal();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.order !== this.props.order) {
            this.updateTotal();
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = '';
    }

    handleIncreaseCount = (id) => {
        const item = this.props.order[id];
        if (!item) return;
        
        const updatedItem = {
            ...item,
            count: item.count + 1,
            totalPrice: (item.price + this.calcIngredientsPrice(item.selectedIngredients)) * (item.count + 1)
        };
        
        this.props.updateOrderItem(id, updatedItem);
    }

    handleDecreaseCount = (id) => {
        const item = this.props.order[id];
        if (!item) return;
        
        if (item.count > 1) {
            const updatedItem = {
                ...item,
                count: item.count - 1,
                totalPrice: (item.price + this.calcIngredientsPrice(item.selectedIngredients)) * (item.count - 1)
            };
            
            this.props.updateOrderItem(id, updatedItem);
        } else {
            this.props.deleteFromOrder(id);
        }
    }

    calcIngredientsPrice = (selectedIngredients) => {
        if (!selectedIngredients) return 0;
        
        return Object.values(selectedIngredients)
            .filter(ingredient => ingredient)
            .reduce((total, ingredient) => total + (ingredient.price || 0), 0);
    }

    renderOrderItems = () => {
        const orderItems = Object.entries(this.props.order || {}).map(([id, item]) => {
            return (
                <li key={id} className="cart__order-item" data-item-id={id}>
                    <button onClick={() => this.props.deleteFromOrder(id)} className="order__item__delete-button">✖</button>
                    <div className="order-item__block">
                        <div className="order__item-info__block">
                            <img src={item.image} alt="" className="order__item-image" />
                            <div className="order__item-about">
                                <div className="order__item-desc">
                                    <div className="order__item-names">{item.name}</div>
                                    <div className="order__item-total">
                                        <span className="order__item-size">
                                            {{
                                                0: '22 см',
                                                1: '28 см',
                                                2: '33 см'
                                            }[item.selectedSize]}
                                        </span>
                                        <div className="order__item-count">
                                            <div 
                                                className={`cart__count-button order__item-count__minus ${item.count > 1 ? 'cart__count-button-active' : ''}`}
                                                onClick={() => this.handleDecreaseCount(id)}
                                            >-</div>
                                            {item.count} шт
                                            <div 
                                                className="cart__count-button order__item-count__plus cart__count-button-active"
                                                onClick={() => this.handleIncreaseCount(id)}
                                            >+</div>
                                        </div>
                                        <span className="order__item-price"> {item.totalPrice} ₽</span>
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
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
        return orderItems.length > 0 ? orderItems : <li className="order__empty">Корзина пуста</li>
    }

    updateTotal = () => {
        const { order } = this.props;
        if (!order) {
            this.setState({ total: 0 });
            return;
        }

        const total = Object.values(order).reduce((sum, item) => {
            return sum + (item.totalPrice || 0);
        }, 0);

        this.setState({ total });
    }

    handleClose = () => {
        this.props.renderCart();
    }

    render() {
        return (
            <div className="cart">
                <div className="cart__overlay" onClick={this.handleClose}></div>
                <div className="cart__wrapper">
                    <button className="cart__close-button" onClick={this.handleClose}>x</button>
                    <div className="cart__content">
                        <h2 className="title-text cart__title">Корзина</h2>
                        <ul className="cart__order-list">
                            {this.renderOrderItems()}
                        </ul>
                        {this.state.total ? 
                        <div className="cart__payment">
                            <div className="cart__total">
                                <span>Итого: {this.state.total} ₽</span>
                            </div> 
                            <button className="button cart__payment__button">К оплате</button>
                        </div>
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

Cart.propTypes = {
  order: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
      totalPrice: PropTypes.number,
      selectedIngredients: PropTypes.object,
      selectedSize: PropTypes.number
    })
  ),
  renderCart: PropTypes.func.isRequired,
  addToOrder: PropTypes.func,
  deleteFromOrder: PropTypes.func.isRequired,
  updateOrderItem: PropTypes.func.isRequired
};

export default Cart;