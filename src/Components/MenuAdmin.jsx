import React from "react"

class MenuAdmin extends React.Component{
    render(){
        return(
            <div className="menu-admin__overlay">
                <div className="menu-admin__wrapper"></div>
                <button onClick={() => this.props.onClose()} className="menu-admin__close-button">x</button>
                <div className="menu-admin__content">
                    <h2 className="title-text menu-admin__title">Админ Панель</h2>
                </div>
            </div>
        )
    }
}

export default MenuAdmin;