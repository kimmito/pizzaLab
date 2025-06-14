import React from "react";
import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";
class EditMenuForm extends React.Component {
    state = {
        newTagInput: ""
    }

    handleMenuChange = (event) => {
        const { name, value } = event.currentTarget;
        const updatedPizza = {
            ...this.props.pizza,
            [name]: value
        };
        this.props.updateMenu(this.props.pizza.id, updatedPizza);
    }

    handlePriceChange = (index, value) => {
        const prices = [...this.props.pizza.price];
        prices[index] = Number(value) || 0;
        const updatedPizza = {
            ...this.props.pizza,
            price: prices
        };
        this.props.updateMenu(this.props.pizza.id, updatedPizza);
    }

    handleTagChange = (index, value) => {
        const currentTags = [...this.props.pizza.tags];
        const newTags = currentTags.map((tag, i) => 
            i === index ? value.trim() : tag
        ).filter(tag => tag !== "");
        
        const updatedPizza = {
            ...this.props.pizza,
            tags: newTags
        };
        this.props.updateMenu(this.props.pizza.id, updatedPizza);
    }

    handleNewTagChange = (e) => {
        this.setState({ newTagInput: e.target.value });
    }

    handleAddTag = (e) => {
        e.preventDefault();
        const { newTagInput } = this.state;
        const { pizza } = this.props;
        const trimmedValue = newTagInput.trim();
        
        if (trimmedValue !== "" && !pizza.tags.includes(trimmedValue)) {
            const updatedPizza = {
                ...pizza,
                tags: [...pizza.tags, trimmedValue]
            };
            this.props.updateMenu(pizza.id, updatedPizza);
            this.setState({ newTagInput: "" });
        }
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.deleteFromMenu(this.props.pizza.id);
    }

    render() {
        const { pizza } = this.props;
        const { newTagInput } = this.state;
        const prices = pizza.price || [];
        const tags = pizza.tags || [];
        
          return(
              <form className="editor-item pizza-edit">
                  <input name="name" placeholder="Название" value={pizza.name} onChange={this.handleMenuChange} autoComplete="off" type="text" className="editor-item__block editor-item__title pizza-edit__title" />
                  <input name="image" placeholder="Изображение" value={pizza.image} onChange={this.handleMenuChange} autoComplete="off" type="text" className="editor-item__block pizza-edit__image" />
                  <textarea 
                    name="description"
                    placeholder="Описание" 
                    value={pizza.description} 
                    onChange={this.handleMenuChange} 
                    autoComplete="off" 
                    type="text" 
                    className="editor-item__block pizza-edit__desc" 
                  />
                  <div className="editor-item__block pizza-edit__prices">
                    {prices.map((price, index) => (
                      <input 
                            key={index}
                            placeholder={`Цена ${index + 1}`}
                            value={price}
                            onChange={(e) => this.handlePriceChange(index, e.target.value)}
                            autoComplete="off"
                            type="number"
                            className="editor-item__block pizza-edit__prices__item"
                            min="0"
                          step="50"
                      />
                    ))}
                  </div>
                
                  <div className="editor-item__block pizza-edit__tags">
                    {tags.map((tag, index) => (
                        <input 
                            key={index}
                            placeholder={`Тег ${index + 1}`}
                            value={tag}
                            onChange={(e) => this.handleTagChange(index, e.target.value)}
                            autoComplete="off"
                            type="text"
                            className="editor-item__block pizza-edit__tags__item"
                        />
                    ))}
                    <input
                        placeholder={`Добавить тег ${tags.length + 1}`}
                        value={newTagInput}
                        onChange={this.handleNewTagChange}
                        onBlur={this.handleAddTag}
                        onKeyDown={(e) => e.key === 'Enter' && this.handleAddTag(e)}
                        autoComplete="off"
                        type="text"
                        className="editor-item__block pizza-edit__tags__item"
                    />
                  </div>
                  <select 
                    value={pizza.availability ? "available" : "unavailable"}
                    onChange={(e) => {
                      const updatedPizza = {
                        ...this.props.pizza,
                        availability: e.target.value === "available"
                      };
                      this.props.updateMenu(this.props.pizza.id, updatedPizza);
                    }}
                    className="editor-item__block edit-status pizza-edit__availability" 
                    name="status"
                  >
                    <option value="available">Доступно</option>
                    <option value="unavailable">Недоступно</option>
                  </select>
                  
                  <button onClick={this.handleDelete} className="button admin-edit-button delete-menu-item__button delete-item--text">Удалить из меню</button>
                  <button onClick={this.handleDelete} className="button admin-edit-button delete-menu-item__button delete-item--icon"><MdDeleteForever /></button>

              </form>
          )
      }
  }

  EditMenuForm.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.arrayOf(PropTypes.number),
    tags: PropTypes.arrayOf(PropTypes.string),
    availability: PropTypes.bool
  }).isRequired,
  updateMenu: PropTypes.func.isRequired,
  deleteFromMenu: PropTypes.func.isRequired
};

  export default EditMenuForm;