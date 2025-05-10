import React, {useState} from "react";
import sampleIngredients from "./../sample-ingredients"

const Ingredients = (props) => {
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const toggleIngredient = (ingredient) => {
        const newIngredients = {
            ...selectedIngredients,
            [ingredient.id]: !selectedIngredients[ingredient.id] ? ingredient : 0,
        }
        setSelectedIngredients(newIngredients);
        props.onIngredientsChange(newIngredients);
    };
    if (!props.showIngredients) return null;
    return(
        <ul className="ingredients__list">
            {
                sampleIngredients.filter(ingredient => ingredient.available).map((ingredient) => (
                    ingredient.available && 
                    <li key={ingredient.id} className={`ingredients__item ${selectedIngredients[ingredient.id] ? 'ingredient__item__selected' : ""}`} onClick={() => toggleIngredient(ingredient)}>
                        <div className="ingredient__name">{ingredient.name}</div>
                        <div className="ingredient__price">+{ingredient.price} ₽</div>
                    </li>
                ))
            }
        </ul>
    )
}

export default Ingredients;

