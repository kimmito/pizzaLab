  import React from "react";
  import PropTypes from "prop-types";
  import { MdDeleteForever } from "react-icons/md";

  class EditEventsForm extends React.Component{

      handleEventChange = (event) => {
          const { name, value } = event.currentTarget;
          const updatedEvent = {
            ...this.props.event,
            [name]: value
          };
          this.props.updateEvents(this.props.event.id, updatedEvent);
      }

      handleDelete = (event) => {
          event.preventDefault();
          this.props.deleteFromEvents(this.props.event.id);
      }

      render(){
        const {event} = this.props; 
          return(
              <form className="editor-item event-edit">
                <input name="title" placeholder="Название" value={event.title} onChange={this.handleEventChange} autoComplete="off" type="text" className="editor-item__block editor-item__title event-edit__title" />
                <input name="background_image" placeholder="Изображение" value={event.background_image} onChange={this.handleEventChange} autoComplete="off" type="text" className="editor-item__block event-edit__image" />
                <input name="link" placeholder="Ссылка" value={event.link} onChange={this.handleEventChange} autoComplete="off" type="text" className="editor-item__block event-edit__link" />
                <select 
                    value={event.active ? "active" : "unactive"}
                    onChange={(e) => {
                      const updatedEvent = {
                        ...this.props.event,
                        active: e.target.value === "active"
                      };
                      this.props.updateEvents(this.props.event.id, updatedEvent);
                    }}
                    className="editor-item__block edit-status event-edit__status" 
                    name="status"
                  >
                    <option value="active">Активно</option>
                    <option value="unactive">Неактивно</option>
                  </select>
                  <button onClick={this.handleDelete} className="button admin-edit-button delete-menu-item__button delete-item--text">Удалить из списка</button>
                  <button onClick={this.handleDelete} className="button admin-edit-button delete-menu-item__button delete-item--icon"><MdDeleteForever /></button>
              </form>
          )
      }
  }
  
EditEventsForm.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    background_image: PropTypes.string,
    link: PropTypes.string,
    active: PropTypes.bool
  }).isRequired,
  updateEvents: PropTypes.func.isRequired,
  deleteFromEvents: PropTypes.func.isRequired
};

  export default EditEventsForm;