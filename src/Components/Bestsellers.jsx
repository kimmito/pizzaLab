import React, { useMemo } from 'react';
import Pizza from './Pizza';
import PropTypes from 'prop-types';

const Bestsellers = ({ menu, order, addToOrder, deleteFromOrder, renderCart, ingredients }) => {
    const menuArray = useMemo(() => {
        if (!menu) return [];
        return Object.values(menu);
    }, [menu]);

    const popularPizzas = useMemo(() => {
        return menuArray.filter(pizza => {
            if (!pizza || !Array.isArray(pizza.tags)) return false;
            return pizza.tags.includes("популярная");
        });
    }, [menuArray]);
    
    const getPopularPizzaSlides = () => {
        const slides = [];
        const itemsPerSlide = 4;
        
        for (let i = 0; i < popularPizzas.length; i += itemsPerSlide) {
            slides.push(popularPizzas.slice(i, i + itemsPerSlide));
        }
        
        return slides;
    };

    const popularSlides = getPopularPizzaSlides();
    const showControls = popularSlides.length > 1;

    if (menu === undefined) {
        return <div className="bestsellers">Загрузка популярных пицц...</div>;
    }

    if (popularPizzas.length === 0) {
        return (
            <div className="bestsellers" id="bestsellers">
                <div className="title-text bestsellers__title">Самые популярные</div>
                <div className="bestsellers-menu">
                    <p>Нет популярных пицц в меню</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bestsellers" id="bestsellers">
            <div className="title-text bestsellers__title">Самые популярные</div>
            <div className="bestsellers-menu">
                <div id="carousel" className="carousel slide">
                    {showControls && (
                        <div className="carousel-indicators">
                            {popularSlides.map((_, index) => (
                                <button 
                                    key={index}
                                    type="button" 
                                    data-bs-target="#carousel" 
                                    data-bs-slide-to={index} 
                                    className={index === 0 ? "active" : ""} 
                                    aria-label={`Slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                    <div className="carousel-inner">
                        {popularSlides.map((slidePizzas, index) => (
                            <div 
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <div className="category-menu bestsellers-menu__slide">
                                    <ul className="menu-list">
                                        {slidePizzas.map((pizza) => (
                                            <li key={pizza.id} className="menu-item">
                                                <Pizza 
                                                    isOrdered={!!order?.[pizza.id]} 
                                                    pizza={pizza} 
                                                    addToOrder={addToOrder} 
                                                    deleteFromOrder={deleteFromOrder}
                                                    renderCart={renderCart}
                                                    ingredients={ingredients}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showControls && (
                        <>
                            <button 
                                className="carousel-control-prev" 
                                type="button" 
                                data-bs-target="#carousel" 
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button 
                                className="carousel-control-next" 
                                type="button" 
                                data-bs-target="#carousel" 
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

Bestsellers.propTypes = {
  menu: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.arrayOf(PropTypes.number),
      tags: PropTypes.arrayOf(PropTypes.string),
      availability: PropTypes.bool
    })
  ),
  order: PropTypes.object,
  addToOrder: PropTypes.func,
  deleteFromOrder: PropTypes.func,
  renderCart: PropTypes.func,
  ingredients: PropTypes.object
};

export default React.memo(Bestsellers);