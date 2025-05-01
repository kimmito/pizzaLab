import React from "react";


const Event = (props) => {
    return(
        <div className="event" style={{ backgroundImage: `url(${props.image})`}}>
            <div className="event-container">
                <h2 className="event__title">Наш блог</h2>
                <div className="button event__more-button">Подробнее..</div>
            </div>
        </div>
    )
}

export default Event;
