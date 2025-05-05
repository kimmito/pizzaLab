import React from "react";
import { FaBoltLightning } from "react-icons/fa6";

class Home extends React.Component {
    render() {
        return (
            <section className="home-wrapper" id="home">
                <div className="home">
                    <h1 className="title-text   home__title"><span>Быстрая</span> <br/>доставка<FaBoltLightning  className="home__title-icon"/> пиццы</h1>
                    <p className="desc-text home__desc">Мы доставляем вкуснейшую пиццу для вашей семьи в течение 30 минут. Опоздаем - <span>пицца бесплатно</span>!</p>
                    <div className="home__cooking">
                        <span className="desc-text">Процесс приготовления:</span>
                        <div className="video-wrapper">
                            <iframe title="video" className="video" src="https://vk.com/video_ext.php?oid=-146644551&id=456239067&hash=362e9a94724be246"></iframe>
                        </div>
                    </div>
                    <div className="to-menu">
                        <a href="#menu" className="button to-menu-link">Перейти к меню</a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Home;