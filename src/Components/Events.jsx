import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
class Events extends React.Component {
    getEventsArray = () => {
        const { events } = this.props;
        if (!events) return [];
        return Object.values(events);
    };

    renderEvents = () => {
        const eventsArray = this.getEventsArray();

        if (eventsArray.length === 0) {
            return (
                <li className="events__item events__item--empty">
                    На данный момент мероприятий нет
                </li>
            );
        }

        return eventsArray.map((event) => {
            if (!event || !event.id) return null;
            
            return (
                <li 
                    id={`event${event.id}`} 
                    key={event.id} 
                    className="events__item"
                >
                    <Event event={event} />
                </li>
            );
        });
    };

    render() {
        if (this.props.events === undefined) {
            return (
                <section className="events" id="events">
                    <div>Загрузка мероприятий...</div>
                </section>
            );
        }

        return (
            <section className="events" id="events">
                <ul className="events__list">
                    {this.renderEvents()}
                </ul>
            </section>
        );
    }
}

Events.propTypes = {
  events: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      background_image: PropTypes.string,
      link: PropTypes.string,
      desc: PropTypes.string,
      active: PropTypes.bool
    })
  )
};

export default Events;