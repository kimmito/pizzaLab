import React, {useState} from "react";
import sampleIngredients from "./../sample-ingredients"

const Ingredients = (props) => {
    const [selectedIngredients, setSelectedIngredients] = useState({});
    
    const renderIngredients = () => {
        return(
        sampleIngredients.map((ingredient) => (
            ingredient.available && 
            <li key={ingredient.id} className={`ingredients__item ${selectedIngredients[ingredient.id] ? 'ingredient__item__selected' : ""}`} onClick={() => toggleIngredient(ingredient)}>
                <div className="ingredient__name">{ingredient.name}</div>
                <div className="ingredient__price">+{ingredient.price} ₽</div>
            </li>
        )))
    }
    const toggleIngredient = (ingredient) => {
        !selectedIngredients[ingredient.id] ?
        setSelectedIngredients({
            ...selectedIngredients,
            [ingredient.id]: ingredient, 
        }) : setSelectedIngredients({
            ...selectedIngredients,
            [ingredient.id]: 0,
        })
    }
    if (!props.showIngredients) return null;
    return(
        <ul className="ingredients__list">
            {renderIngredients()}
        </ul>
    )
}

export default Ingredients;

