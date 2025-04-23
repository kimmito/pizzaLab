import React from "react";
import { FaBoltLightning } from "react-icons/fa6";


class Home extends React.Component {
    render() {
        return (
            <div className="home-wrapper">
                <div className="home">
                    <h1 className="home__title"><span className="with-arrow">Быстрая <br/></span> доставка<FaBoltLightning  className="home__title-icon"/> пиццы</h1>
                    <p className="desc-text home__desc">Мы доставляем вкуснейшую пиццу для вашей семьи в течение 30 минут. Опоздаем - <span>пицца бесплатно</span>!</p>
                    <div className="home__cooking">
                        <span className="desc-text">Процесс приготовления:</span>
                        <div className="home__cooking-video">
                            <b>VIDEO</b>
                        </div>
                    </div>
                    <div className="to-menu">
                        <button className="button to-menu-button">Перейти к меню</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;