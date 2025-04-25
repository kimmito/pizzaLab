import React from 'react'

const Menu = (props) => {
    return(
        <section className="menu">
            <h2 className="menu__title">Меню</h2>
            <nav className="menu__navigation">
                <ul className="menu__navigation-list">
                    <li className="menu__navigation-item">Показать все</li>
                    <li className="menu__navigation-item">Мясные</li>
                    <li className="menu__navigation-item">Вегатерианские</li>
                    <li className="menu__navigation-item">С морепродуктами</li>
                    <li className="menu__navigation-item">Грибные</li>
                </ul>
            </nav>
            <div className="category-menu">
                <ul className="category-menu-list">
                    <li className="category-menu-item">
                        <div className="pizza">
                            <span>img</span>
                            <h3 className="pizza__name">Italian</h3>
                            <p className="desc-text pizza__desc">desc</p>
                            <div className="pizza__sizes">
                                <ul className="pizza__sizes-list">
                                    <li className="pizza__sizes-item">22</li>
                                    <li className="pizza__sizes-item">28</li>
                                    <li className="pizza__sizes-item">33</li>
                                </ul>
                            </div>
                            <div className="pizza__add-engridient">Добавки</div>
                            <div className="pizza__order">
                                <div className="pizza__select-order">
                                    <div className="pizza__select-order__cost">700 ₽</div>
                                    <div className="pizza__select-order__count">1</div>
                                </div>
                                <button className="button pizza__order__button">Добавить в корзину</button>
                            </div>
                        </div>
                    </li>
                    <li className="category-menu-item"></li>
                    <li className="category-menu-item"></li>
                    <li className="category-menu-item"></li>
                </ul>
            </div>
        </section>
    )
}

export default Menu;