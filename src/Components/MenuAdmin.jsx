import React from "react"
import EditBurgerForm from "../Components/EditMenuForm"
import "../css/menuAdmin.css"

class MenuAdmin extends React.Component{
    state = {
        active: "menu",
    }



    renderEventsEditor = () => {
        return(
            <div className="editor">
                {this.props.events.map(((event, index) => {
                    return(
                        <div key={index} className="editor-item">
                            <div className="editor-item__block editor-item__title">{event.title}</div>
                            <div className="editor-item__block editor-item__image">{event.background_image}</div>
                            <div className="editor-item__block editor-item__link">{event.link}</div>
                            <div className="editor-item__block editor-item__active">{event.active ? "Активно" : "Неактивно"}</div>
                        </div>
                    )

                }))}

            </div>
        )
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
                                <EditBurgerForm 
                                  key={pizza.id}
                                  deleteFromMenu={this.props.deleteFromMenu} 
                                  updateMenu={this.props.updateMenu} 
                                  index={pizza.id} 
                                  pizza={pizza} 
                                />
                              ))
                            : this.state.active === "events" ? 
                              this.renderEventsEditor() 
                            : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuAdmin;