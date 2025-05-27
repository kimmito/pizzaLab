import React from "react"
import "../css/menuAdmin.css"

class MenuAdmin extends React.Component{
    state = {
        active: "menu",
    }

    renderMenuEditor = () => {
        return(
            <div className="editor">
                {this.props.menu.map((pizza => {
                    return(
                        <div className="editor-item pizza-edit">
                            <div className="editor-item__block editor-item__title pizza-edit__title">{pizza.name}</div>
                            <div className="editor-item__block pizza-edit__image">{pizza.image}</div>
                            <div className="editor-item__block pizza-edit__desc">{pizza.description}</div>
                            <div className="editor-item__block pizza-edit__prices">{pizza.price.map(price => {
                                return(<div className="editor-item__block pizza-edit__prices__item">{price}</div>)
                            })}
                            </div>
                            <div className="editor-item__block pizza-edit__tags">{pizza.tags.map(tag => {
                                return(<div className="editor-item__block pizza-edit__tags__item">{tag}</div>)
                            })}
                            </div>
                            <div className="editor-item__block pizza-edit__availability">{pizza.availability ? "Доступно" : "Недоступно"}</div>
                        </div>
                    )

                }))}

            </div>
        )
    }

    renderEventsEditor = () => {
        return(
            <div className="editor">
                {this.props.events.map((event => {
                    return(
                        <div className="editor-item">
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
                        {this.state.active === "menu" ? 
                            this.renderMenuEditor()
                        : this.state.active === "events" ? 
                        this.renderEventsEditor() : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuAdmin;