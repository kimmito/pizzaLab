import React from "react"
import Event from "./Event";

class Events extends React.Component{
    renderEvents = () => {
        return this.props.events.map((event) => (
            <li id={`event${event.id}`} key={event.id} className="events__item">
                <Event event={event} />
            </li>
        ));
    }
    render(){
        return(
            <section className="events" id="events">
                <ul className="events__list">
                    {this.renderEvents()}
                </ul>
            </section>
        )
    }
}

export default Events;