import React from "react";

const Event = (props) => {
    const { title, background_image, link, desc, active } = props.event || {};

    return (
        <div 
            className="event"
            style={{ backgroundImage: `url(${background_image})` }}
        >
            <div className="event-container">
                <h2 className="event__title">{title}</h2>
                {desc && <p className="desc-text event__desc">{desc}</p>}
                {active && <a className="button event__button event__more-link" href={link}>Подробнее..</a>}
            </div>
        </div>
    );
}

export default Event;