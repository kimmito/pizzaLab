import React, { useEffect, useState } from "react";

const Event = (props) => {
    const { title, background_image, link, desc, active } = props.event || {};
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (background_image) {
            const img = new Image();
            img.src = background_image;
            img.onload = () => setImageLoaded(true);
        }
    }, [background_image]);

    return (
        <div 
            className={`event ${imageLoaded ? 'event--loaded' : 'event--loading'}`}
            style={{ backgroundImage: imageLoaded ? `url(${background_image})` : "none" }}
        >
            <div className="event-container">
                <h2 className="event__title">{title}</h2>
                {desc ? <p className="desc-text event__desc">{desc}</p> : null}
                {active ? <a className="button event__button event__more-link" href={link}>Подробнее..</a> : null}
            </div>
        </div>
    );
}

export default Event;