import React, {useState} from "react";
import sampleIngredients from "./../sample-ingredients"

const Ingredients = (props) => {
    const [selectedIngredients, updateIngredients] = useState({});
    
    const renderIngredients = () => {
        return(
        sampleIngredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredeints__item">
                <div className="ingredient__name">{ingredient.name}</div>
            </li>
        )))
    }
    const addIngredient = (id) => {
        const {ingredients} = selectedIngredients;
        ingredients[id] = ingredients[id] ? ingredients[id] + 1 : 0;
        updateIngredients(ingredients)
    }
    if (props.showIngredients){
        document.querySelector(".add-engridient-button").classList.add(".close-button");
        return(
            <div className="ingredients">
            <ul className="ingredients__list">
                {renderIngredients()}
            </ul>
        </div>
        )
    } else return null;
}

export default Ingredients;

