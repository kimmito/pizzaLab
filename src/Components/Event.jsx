import React from "react";
import PropTypes from "prop-types";

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

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    background_image: PropTypes.string,
    link: PropTypes.string,
    desc: PropTypes.string,
    active: PropTypes.bool,
    id: PropTypes.string
  })
};

export default Event;