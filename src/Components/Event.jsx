import React from "react";

const Event = (props) => {
    const { title, background_image, link, desc, active } = props.event || {};

    return (
        <div className="event" style={{ backgroundImage: background_image ? `url(${background_image})` : "none" }}>
            <div className="event-container">
                <h2 className="event__title">{title}</h2>
                {desc ? <p className="desc-text event__desc">{desc}</p> : null}
                {active ? <a className="button event__button event__more-link" href={link}>Подробнее..</a> : null}
            </div>
        </div>
    );
}

export default Event;
