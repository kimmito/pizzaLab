import React from "react";
import pizza1 from "../img/menu/about1.png"
import pizza2 from "../img/menu/about2.png"
import pizza3 from "../img/menu/about3.png"
import pizza4 from "../img/menu/about4.png"
import pizza5 from "../img/menu/about5.png"

const About = (props) => {
    return(
        <div className="about" id="about">
            <div className="about__container">
                <h2 className="title-text about__title">О нас</h2>
                <p className="desc-text about__desc">Всего за пару лет мы открыли 6 торговых точек в разных городах: Казани, Челябинске, Уфе, Самаре, Ижевске, а в будущем планируем развивать сеть и в других крупных городах России.</p>
                <div className="about__pizza-images">
                    <img src={pizza1} alt="" className="pizza-image" />
                    <img src={pizza2} alt="" className="pizza-image" />
                    <img src={pizza3} alt="" className="pizza-image" />
                    <img src={pizza4} alt="" className="pizza-image" />
                    <img src={pizza5} alt="" className="pizza-image" />
                    
                </div>
                <p className="desc-text about__desc">Кухня каждой точки составляет не менее: 400-500 кв. метров, сотни сотрудников, слаженно выполняющих работу по приему/приготовлению/формированию/доставке заказов клиентов в срок.</p>
            </div>
        </div>
    )

}

export default About;