import React from "react"
import EditMenuForm from "../Components/EditMenuForm"
import EditEventsForm from "../Components/EditEventsForm"
import "../css/menuAdmin.css"
import EditIngredientsForm from "./EditIngredientsForm"
import AddMenuItemForm from "./AddMenuItemForm"
import AddEventForm from "./AddEventForm"
import AddIngredientForm from "./AddIngredientForm"
import PropTypes from "prop-types"

class MenuAdmin extends React.Component {
    state = {
        active: "menu",
    }

    render() {
        return (
            <div className="animate__animated animate__backInRight menu-admin__overlay">
                <div className="menu-admin__wrapper">
                    <div className="menu-admin__header">
                        <button onClick={() => this.props.toggleMenuAdmin()} className="menu-admin__close-button">×</button>
                        <h2 className="title-text menu-admin__title">Админ Панель</h2>
                    </div>
                    <nav className="menu-admin__nav">
                        <ul className="menu-admin__nav-list">
                            <li 
                                onClick={() => this.setState({ active: "menu" })} 
                                className={`menu-admin__nav-item ${this.state.active === "menu" ? "active" : ""}`}
                            >
                                Меню
                            </li>
                            <span className="decorative-line"></span>
                            <li 
                                onClick={() => this.setState({ active: "events" })} 
                                className={`menu-admin__nav-item ${this.state.active === "events" ? "active" : ""}`}
                            >
                                События
                            </li>
                            <span className="decorative-line"></span>
                            <li 
                                onClick={() => this.setState({ active: "ingredients" })} 
                                className={`menu-admin__nav-item ${this.state.active === "ingredients" ? "active" : ""}`}
                            >
                                Ингредиенты
                            </li>
                        </ul>
                    </nav>
                    <div className="menu-admin__content">
                        <div className="editor">
                            {(() => {
                                switch (this.state.active) {
                                    case "menu":
                                        return (
                                            <>
                                                {this.props.menu && Object.entries(this.props.menu).map(([key, pizza]) => (
                                                    <EditMenuForm
                                                        key={key}
                                                        deleteFromMenu={this.props.deleteFromMenu}
                                                        updateMenu={this.props.updateMenu}
                                                        index={key}
                                                        pizza={pizza}
                                                    />
                                                ))}
                                                <AddMenuItemForm addToMenu={this.props.addToMenu}/>
                                                <button 
                                                    className="button load-sample-button" 
                                                    onClick={this.props.loadSampleMenu}
                                                >
                                                    Загрузить стандартное меню
                                                </button>
                                            </>
                                        );
                                    
                                    case "events":
                                        return (
                                            <>
                                                {this.props.events && Object.entries(this.props.events).map(([key, event]) => (
                                                    <EditEventsForm
                                                        key={key}
                                                        index={key}
                                                        event={event}
                                                        deleteFromEvents={this.props.deleteFromEvents}
                                                        updateEvents={this.props.updateEvents}
                                                    />
                                                ))}
                                                <AddEventForm addToEvents={this.props.addToEvents}/>
                                                <button 
                                                    className="button load-sample-button" 
                                                    onClick={this.props.loadSampleEvents}
                                                >
                                                    Загрузить стандартные события
                                                </button>
                                            </>
                                        );
                                    
                                    case "ingredients":
                                        return (
                                            <>
                                                {this.props.ingredients && Object.entries(this.props.ingredients).map(([key, ingredient]) => (
                                                    <EditIngredientsForm
                                                        key={key}
                                                        index={key}
                                                        ingredient={ingredient}
                                                        deleteFromIngredients={this.props.deleteFromIngredients}
                                                        updateIngredients={this.props.updateIngredients}
                                                    />
                                                ))}
                                                <AddIngredientForm addToIngredients={this.props.addToIngredients}/>
                                                <button 
                                                    className="button load-sample-button" 
                                                    onClick={this.props.loadSampleIngredients}
                                                >
                                                    Загрузить стандартные ингредиенты
                                                </button>
                                            </>
                                        );
                                    
                                    default:
                                        return null;
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MenuAdmin.propTypes = {
  toggleMenuAdmin: PropTypes.func.isRequired,
  menu: PropTypes.object,
  events: PropTypes.object,
  ingredients: PropTypes.object,
  deleteFromMenu: PropTypes.func,
  updateMenu: PropTypes.func,
  addToMenu: PropTypes.func,
  loadSampleMenu: PropTypes.func,
  deleteFromEvents: PropTypes.func,
  updateEvents: PropTypes.func,
  addToEvents: PropTypes.func,
  loadSampleEvents: PropTypes.func,
  deleteFromIngredients: PropTypes.func,
  updateIngredients: PropTypes.func,
  addToIngredients: PropTypes.func,
  loadSampleIngredients: PropTypes.func
};

export default MenuAdmin;