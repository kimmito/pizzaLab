import React from "react"
import Event from "./Event";

class Events extends React.Component{
    render(){
        return(
            <section className="events" id="events">
                <div className="events-container">
                    <div className="events__item">
                        <Event />
                    </div>
                    <div className="events__item">
                        <Event />
                    </div>
                    <div className="events__item">
                        <div className="events__item__title">
                            <h2 className="title-text events-title">События</h2>
                            <p className="desc-text events-desc">
                             У нас регулярно проводятся акции, которые позволят вам отведать вкусные блюда по более низкой цене!
                            </p>
                        </div>
                    </div>
                    <div className="events__item">
                        <Event />
                    </div>
                    <div className="events__item">
                        <Event />
                    </div>
                    <div className="events__item">
                        <Event />
                    </div>
                    <div className="events__item">
                        <Event />
                    </div>
                    <div className="events__item">
                        <Event />
                    </div>
                </div>
            </section>
        )
    }
}

export default Events;