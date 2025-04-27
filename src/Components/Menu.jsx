import React from 'react'
import Pizza from './Pizza';

const Menu = (props) => {
    return(
        <section className="menu">
            <h2 className="title-text menu__title">Меню</h2>
            <nav className="menu__navigation">
                <ul className="menu__navigation-list">
                    <li className="menu__navigation-item"><button className="button nav-button">Показать все</button></li>
                    <li className="menu__navigation-item not-active"><button className="button nav-button">Мясные</button></li>
                    <li className="menu__navigation-item not-active"><button className="button nav-button">Вегатерианские</button></li>
                    <li className="menu__navigation-item not-active"><button className="button nav-button">С морепродуктами</button></li>
                    <li className="menu__navigation-item not-active"><button className="button nav-button">Грибные</button></li>
                </ul>
            </nav>
            <div className="category-menu">
                <ul className="category-menu-list">
                    <li className="category-menu-item"><Pizza /></li>
                    <li className="category-menu-item"><Pizza /></li>
                    <li className="category-menu-item"><Pizza /></li>
                    <li className="category-menu-item"><Pizza /></li>
                </ul>
            </div>
            <div className="bestsellers">
                <div className="bestsellers__title">Бестселлеры</div>
                <ul className="bestsellers__list">
                    <li className="bestsellers__item"></li>
                    <li className="bestsellers__item"></li>
                    <li className="bestsellers__item"></li>
                    <li className="bestsellers__item"></li>
                </ul>
            </div>
        </section>
    )
}

export default Menu;