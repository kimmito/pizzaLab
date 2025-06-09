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
    renderCart,
    ingredients
}) => {

    
    const filteredPizzas = useMemo(() => {
        if (!menu) return [];
        const menuArray = Object.values(menu);
        if (!currentCategory) return menuArray;
        
        return menuArray.filter(pizza => {
            if (!pizza || !Array.isArray(pizza.tags)) return false;
            return pizza.tags.some(tag => 
                typeof tag === 'string' && tag.toLowerCase() === currentCategory.toLowerCase()
            );
        });
    }, [menu, currentCategory]);

    const renderMenu = () => {
        if (menu === undefined) {
            return <div>Меню загружается...</div>;
        }
        
        if (menu === null || !Array.isArray(filteredPizzas)) {
            return <div>Не удалось загрузить меню</div>;
        }

        if (filteredPizzas.length === 0) {
            return <div>Пицц в этой категории не найдено</div>;
        }

        return (
            <ul className="menu-list">
                {filteredPizzas.map((pizza) => (
                    <li key={pizza.id} className="menu-item">
                        <Pizza 
                            isOrdered={!!order[pizza.id]} 
                            pizza={{...pizza, id: pizza.id}} 
                            addToOrder={addToOrder} 
                            deleteFromOrder={deleteFromOrder}
                            renderCart={renderCart}
                            ingredients={ingredients}
                            order={order}
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
                    <li className={`menu__navigation-item ${currentCategory ? 'not-active' : ''}`}>
                        <button className='button nav-button' onClick={() => handleCategoryChange(null)}>Показать все</button>
                    </li>
                    <li className={`menu__navigation-item ${currentCategory !== "мясная" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("мясная")}>Мясные</button>
                    </li>
                    <li className={`menu__navigation-item ${currentCategory !== "вегетарианская" ? 'not-active' : ''}`}>
                        <button className="button nav-button" onClick={() => handleCategoryChange("вегатерианская")}>Вегетарианские</button>
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
                ingredients={ingredients}
            />
        </section>
    );
};

export default React.memo(Menu);