import React from "react"
import EditMenuForm from "../Components/EditMenuForm"
import EditEventsForm from "../Components/EditEventsForm"
import "../css/menuAdmin.css"

class MenuAdmin extends React.Component{
    state = {
        active: "menu",
    }

    render(){
        return(
            <div className="animate__animated animate__backInRight menu-admin__overlay">
                <div className="menu-admin__wrapper">
                    <div className="menu-admin__header">
                        <button onClick={() => this.props.toggleMenuAdmin()} className="menu-admin__close-button">x</button>
                        <h2 className="title-text menu-admin__title">Админ Панель</h2>
                    </div>
                    <nav className="menu-admin__nav">
                        <ul className="menu-admin__nav-list">
                            <li onClick={() => this.setState({active: "menu"})} className="menu-admin__nav-item">Меню</li>
                            <span className="decorative-line"></span>
                            <li onClick={() => this.setState({active: "events"})} className="menu-admin__nav-item">События</li>
                        </ul>
                    </nav>
                    <div className="menu-admin__content">
                        <div className="editor">
                            {this.state.active === "menu" ?        
                              this.props.menu.map(pizza => (
                                <EditMenuForm 
                                  key={pizza.id}
                                  deleteFromMenu={this.props.deleteFromMenu} 
                                  updateMenu={this.props.updateMenu} 
                                  index={pizza.id} 
                                  pizza={pizza} 
                                />
                              ))
                                : this.state.active === "events" &&
                                    this.props.events.map(event => (
                                        <EditEventsForm
                                            key={event.id}
                                            index={event.id}
                                            event={event}
                                            deleteFromEvents={this.props.deleteFromEvents} 
                                            updateEvents={this.props.updateEvents} 
                                        />
                                    ))
                                }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuAdmin;