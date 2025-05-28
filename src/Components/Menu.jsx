import React, { useMemo } from 'react';
import Pizza from './Pizza';
import Bestsellers from './Bestsellers';

const Menu = ({ 
    currentCategory, 
    menu, 
    order,
    handleCategoryChange, 
    addToOrder, 
    deleteFromOrder, 
    renderCart 
}) => {
    const filteredPizzas = useMemo(() => {
        if (!currentCategory) return menu;
        return menu.filter(pizza => pizza.tags?.includes(currentCategory));
    }, [menu, currentCategory]);

    const renderMenu = () => {
        if (!menu || menu.length === 0) {
            return <div>Меню загружается...</div>;
        }
        return (
            <ul className="menu-list">
                {filteredPizzas.map((pizza) => (
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
        );
    };

    return (
        <section className="menu" id="menu">
            <h2 className="title-text menu__title">Меню</h2>
            <nav className="menu__navigation">
                <ul className="menu__navigation-list">
                    <li className={`menu__navigation-item ${currentCategory !== null ? 'not-active' : ''}`}>
                        <button className='button nav-button' onClick={() => handleCategoryChange(null)}>Показать все</button>
                    </li>
                    <li className={`menu__navigation-item ${currentCategory !== "мясная" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("мясная")}>Мясные</button>
                    </li>
                    <li className={`menu__navigation-item ${currentCategory !== "вегатерианская" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("вегатерианская")}>Вегатерианские</button>
                    </li>
                    <li className={`menu__navigation-item ${currentCategory !== "с морепродуктами" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("с морепродуктами")}>С морепродуктами</button>
                    </li>
                    <li className={`menu__navigation-item ${currentCategory !== "грибная" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("грибная")}>Грибные</button>
                    </li>
                </ul>
            </nav>
            <div className="category-menu">
                {renderMenu()}    
            </div>

            <Bestsellers 
                menu={menu}
                order={order}
                addToOrder={addToOrder}
                deleteFromOrder={deleteFromOrder}
                renderCart={renderCart}
            />
        </section>
    );
};

export default React.memo(Menu);