import React, { useMemo } from 'react';
import Pizza from './Pizza';

const Bestsellers = ({ menu, order, addToOrder, deleteFromOrder, renderCart }) => {
    const popularPizzas = useMemo(() => {
        return menu.filter(pizza => pizza.tags?.includes("популярная"));
    }, [menu]);
    
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

    if (popularPizzas.length === 0) return null;

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
                                                    isOrdered={!!order[pizza.id]} 
                                                    pizza={pizza} 
                                                    addToOrder={addToOrder} 
                                                    deleteFromOrder={deleteFromOrder}
                                                    renderCart={renderCart}
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

export default React.memo(Bestsellers);