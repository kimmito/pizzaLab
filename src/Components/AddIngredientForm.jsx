import React from "react";
import PropTypes from "prop-types";
import { MdOutlineAddCircleOutline } from "react-icons/md";
class AddIngredientForm extends React.Component {
    state = {
        id: `${Date.now()}`,
        name: "",
        price: 0,
        available: true,
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const currentId = this.props.ingredients && this.props.ingredients.length > 0 
            ? Math.max(...this.props.ingredients.map(i => i.id || 0)) + 1 
            : 1;

        const newIngredientsItem = {
            id: currentId,
            name: this.state.name.trim(),
            price: Number(this.state.price) || 0,
            available: this.state.available,
        };

        if (this.props.addToIngredients) {
            this.props.addToIngredients(newIngredientsItem);
        }
        
        this.setState({
            name: "",
            price: 0,
            available: true,
        });
    }

    render() {
        return (
            <form className="editor-item ingredients-edit" onSubmit={this.handleSubmit}>
                <input 
                    name="name" 
                    placeholder="Название" 
                    value={this.state.name} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    type="text" 
                    className="editor-item__block editor-item__title ingredients-edit__title" 
                    required
                />
                <input 
                    name="price" 
                    placeholder="Цена" 
                    value={this.state.price} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    type="number" 
                    min="0"
                    step="10"
                    className="editor-item__block ingredients-edit__price" 
                    required
                />
                
                <select 
                    value={this.state.available ? "available" : "unavailable"}
                    onChange={(e) => {
                        this.setState({ available: e.target.value === "available" });
                    }}
                    className="editor-item__block edit-status ingredients-edit__availability" 
                >
                    <option value="available">Доступно</option>
                    <option value="unavailable">Недоступно</option>
                </select>
                
                <button type="submit" className="button admin-edit-button add-ingredients-item__button add-button--text">
                    Добавить ингредиент
                </button>
                <button type="submit" className="button admin-edit-button add-ingredients-item__button add-button--icon">
                    <MdOutlineAddCircleOutline />
                </button>
            </form>
        );
    }
}

AddIngredientForm.propTypes = {
  addToIngredients: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      available: PropTypes.bool
    })
  )
};

export default AddIngredientForm;