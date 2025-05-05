import React, { useState, UseState, useMemo } from 'react'
import Pizza from './Pizza'

const Menu = (props) => {
    const [currentCategory, setCurrentCategory] = useState(null);

    const filteredPizzas = useMemo(() => {
        if (!currentCategory) return props.menu;
        return currentCategory
          ? props.menu.filter(pizza => pizza.tags?.includes(currentCategory))
          : props.menu;
    }, [props.menu, currentCategory]);  
    
    const popularPizzas = useMemo(() => {
        return props.menu.filter(pizza => pizza.tags?.includes("популярная"));
    }, [props.menu]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    }

    const renderMenu = () => {
        return(
            <ul className="menu-list">
              {filteredPizzas.map((pizza) => (
                  <li key={pizza.id} className="menu-item">
                      <Pizza pizza={pizza} />
                  </li>
              ))}
            </ul>
        ) 
      };
    
      return(
        <section className="menu" id="menu">
            <h2 className="title-text menu__title">Меню</h2>
            <nav className="menu__navigation">
                <ul className="menu__navigation-list">
                    <li className={`menu__navigation-item ${currentCategory !== null ? 'not-active' : null}`}><button className='button nav-button' onClick={() => handleCategoryChange(null)}>Показать все</button></li>
                    <li className={`menu__navigation-item ${currentCategory !== "мясная" ? 'not-active' : null}`}><button className="button nav-button" onClick={() => handleCategoryChange("мясная")}>Мясные</button></li>
                    <li className={`menu__navigation-item ${currentCategory !== "вегатерианская" ? 'not-active' : null}`}><button className="button nav-button" onClick={() => handleCategoryChange("вегатерианская")}>Вегатерианские</button></li>
                    <li className={`menu__navigation-item ${currentCategory !== "с морепродуктами" ? 'not-active' : null}`}><button className="button nav-button" onClick={() => handleCategoryChange("с морепродуктами")}>С морепродуктами</button></li>
                    <li className={`menu__navigation-item ${currentCategory !== "грибная" ? 'not-active' : null}`}><button className="button nav-button"onClick={() => handleCategoryChange("грибная")}>Грибные</button></li>
                </ul>
            </nav>
            <div className="category-menu">
                {renderMenu()}    
            </div>

            {popularPizzas ? 
                <div className="bestsellers" id="bestsellers">
                    <div className="title-text bestsellers__title">Самые популярные</div>
                    <div className="bestsellers-menu">
                        <div id="carousel" className="carousel slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="category-menu bestsellers-menu__slide">
                                        <ul className="menu-list">
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
                </div> : null
            }
            
        </section>
    )
}

export default Menu;