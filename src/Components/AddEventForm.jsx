import React from "react";
import PropTypes from 'prop-types';
class AddEventForm extends React.Component {

    state = {
        title: "",
        background_image: "images/events/image.jpg",
        link: "",
        active: true,
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const newEventsItem = {
            title: this.state.title,
            background_image: this.state.background_image,
            link: this.state.link,
            active: this.state.active
        };

        if (this.props.addToEvents) {
            this.props.addToEvents(newEventsItem);
        }
        
        this.setState({
            title: "",
            background_image: "images/events/image.jpg",
            link: "",
            active: true,
        });
    }

    render() {
        return (
            <form className="editor-item events-edit" onSubmit={this.handleSubmit}>
                <input 
                    name="title" 
                    placeholder="Название" 
                    value={this.state.title} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    type="text" 
                    className="editor-item__block editor-item__title events-edit__title" 
                    required
                />
                <input 
                    name="background_image" 
                    placeholder="Изображение" 
                    value={this.state.background_image} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    type="text" 
                    className="editor-item__block events-edit__image" 
                    required
                />
                <input 
                    name="link" 
                    placeholder="Ссылка" 
                    value={this.state.link} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    type="url" 
                    className="editor-item__block events-edit__link" 
                    required
                />
                
                <select 
                    value={this.state.active ? "active" : "unactive"}
                    onChange={(e) => {
                        this.setState({ active: e.target.value === "active" });
                    }}
                    className="editor-item__block edit-status events-edit__availability" 
                >
                    <option value="active">Активно</option>
                    <option value="unactive">Неактивно</option>
                </select>
                
                <button type="submit" className="button admin-edit-button add-events-item__button">
                    Добавить мероприятие
                </button>
            </form>
        );
    }
}

AddEventForm.propTypes = {
  addToEvents: PropTypes.func.isRequired
};

export default AddEventForm;