import React, {useState} from "react";
import sampleIngredients from "./../sample-ingredients"

const Ingredients = (props) => {
    const [selectedIngredients, updateIngredients] = useState({});
    
    const renderIngredients = () => {
        return(
        sampleIngredients.map((ingredient) => (
            ingredient.available ? 
            <li key={ingredient.id} className={`ingredients__item`} onClick={addIngredient}>
                <div className="ingredient__name">{ingredient.name}</div>
                <div className="ingredient__price">{ingredient.price} ₽</div>
            </li>
            : null
        )))
    }
    const addIngredient = (id) => {
        const ingredients = selectedIngredients;
        ingredients[id] = ingredients[id] ? 1 : 0;
        updateIngredients(ingredients)
    }
    if (props.showIngredients){
        return(
            <ul className="ingredients__list">
                {renderIngredients()}
            </ul>
        )
    } else return null;
}

export default Ingredients;

