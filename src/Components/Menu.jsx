import React, { useMemo } from 'react';
import Pizza from './Pizza';

const Menu = (props) => {
    const { currentCategory, menu, handleCategoryChange } = props;
    
    const filteredPizzas = useMemo(() => {
        if (!currentCategory) return menu;
        return menu.filter(pizza => pizza.tags?.includes(currentCategory));
    }, [menu, currentCategory]);  
    
    const popularPizzas = useMemo(() => {
        return menu.filter(pizza => pizza.tags?.includes("популярная"));
    }, [menu]);

    const renderMenu = () => {
        return (
            <ul className="menu-list">
                {filteredPizzas.map((pizza) => (
                    <li key={pizza.id} className="menu-item">
                        <Pizza pizza={pizza} addToOrder={props.addToOrder} goToCart={props.goToCart}/>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section className="menu" id="menu">
            <h2 className="title-text menu__title">Меню</h2>
            <nav className="menu__navigation">
                <ul className="menu__navigation-list">
                    <li id="all" className={`menu__navigation-item ${currentCategory !== null ? 'not-active' : ''}`}>
                        <button className='button nav-button' onClick={() => handleCategoryChange(null)}>
                            Показать все
                        </button>
                    </li>
                    <li id="meat" className={`menu__navigation-item ${currentCategory !== "мясная" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("мясная")}>
                            Мясные
                        </button>
                    </li>
                    <li id="vegan" className={`menu__navigation-item ${currentCategory !== "вегатерианская" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("вегатерианская")}>
                            Вегатерианские
                        </button>
                    </li>
                    <li id="sea" className={`menu__navigation-item ${currentCategory !== "с морепродуктами" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("с морепродуктами")}>
                            С морепродуктами
                        </button>
                    </li>
                    <li id="mushroom" className={`menu__navigation-item ${currentCategory !== "грибная" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("грибная")}>
                            Грибные
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="category-menu">
                {renderMenu()}    
            </div>

            {popularPizzas.length > 0 && (
                <div className="bestsellers" id="bestsellers">
                    <div className="title-text bestsellers__title">Самые популярные</div>
                    <div className="bestsellers-menu">
                        <div id="carousel" className="carousel slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="category-menu bestsellers-menu__slide">
                                        <ul className="menu-list">
                                            {popularPizzas.map((pizza) => (
                                                <li key={pizza.id} className="menu-item">
                                                    <Pizza pizza={pizza} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Menu;