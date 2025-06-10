import React from "react";
import PropTypes from "prop-types";
class EditIngredientsForm extends React.Component {
  
    handleIngredientChange = (event) => {
    const { name, value } = event.currentTarget;
    const updatedIngredient = {
      ...this.props.ingredient,
      [name]: name === "price" ? Number(value) : value
    };
    this.props.updateIngredients(this.props.ingredient.id, updatedIngredient);
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.props.deleteFromIngredients(this.props.ingredient.id);
  }

  render() {
    const { ingredient } = this.props;
    return (
      <form className="editor-item ingredient-edit">
        <input 
          name="name" 
          placeholder="Название" 
          value={ingredient.name} 
          onChange={this.handleIngredientChange} 
          autoComplete="off" 
          type="text" 
          className="editor-item__block editor-item__title ingredient-edit__name" 
        />
        <input 
          name="price" 
          placeholder="Цена" 
          value={ingredient.price} 
          onChange={this.handleIngredientChange} 
          autoComplete="off" 
          type="number" 
          min="0"
          step="10"
          className="editor-item__block ingredient-edit__price" 
        />
        <select 
          value={ingredient.available ? "available" : "unavailable"}
          onChange={(e) => {
            const updatedIngredient = {
              ...this.props.ingredient,
              available: e.target.value === "available"
            };
            this.props.updateIngredients(this.props.ingredient.id, updatedIngredient);
          }}
          className="editor-item__block edit-status ingredient-edit__status" 
          name="status"
        >
          <option value="available">Доступен</option>
          <option value="unavailable">Недоступен</option>
        </select>
        <button onClick={this.handleDelete} className="button admin-edit-button delete-menu-item__button">
          Удалить ингредиент
        </button>
      </form>
    )
  }
}


EditIngredientsForm.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    available: PropTypes.bool
  }).isRequired,
  updateIngredients: PropTypes.func.isRequired,
  deleteFromIngredients: PropTypes.func.isRequired
};

export default EditIngredientsForm;