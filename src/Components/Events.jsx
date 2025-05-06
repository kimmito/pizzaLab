import React from "react"
import Event from "./Event";
import sampleEvents from "./../sample-events"

class Events extends React.Component{
    state = {
        events: sampleEvents,
    }

    renderEvents = () => {
        return this.state.events.map((event) => (
            <li key={event.id} className="events__item">
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