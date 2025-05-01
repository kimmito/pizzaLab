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
                <div id="category-carousel" className="carousel slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#category-carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#category-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#category-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="category-menu__slide">
                                    <ul className="menu-list">
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="category-menu__slide">
                                    <ul className="menu-list">
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="category-menu__slide">
                                    <ul className="menu-list">
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#category-carousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#category-carousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden"></span>
                        </button>
                    </div>
            </div>
            <div className="bestsellers">
                <div className="title-text bestsellers__title">Самые популярные</div>
                <div className="bestsellers-menu">
                    <div id="carousel" className="carousel slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="bestsellers-menu__slide">
                                    <ul className="menu-list">
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="bestsellers-menu__slide">
                                    <ul className="menu-list">
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="bestsellers-menu__slide">
                                    <ul className="menu-list">
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
                                        <li className="menu-item"><Pizza /></li>
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
        </section>
    )
}

export default Menu;