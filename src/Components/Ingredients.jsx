import React, {useState} from "react";

const Ingredients = (props) => {
    const ingredients = props.ingredients ? Object.values(props.ingredients) : [];
    const [selectedIngredients, setSelectedIngredients] = useState(props.selectedIngredients || {});
    
    const toggleIngredient = (ingredient) => {
        const newIngredients = {
            ...selectedIngredients,
            [ingredient.id]: !selectedIngredients[ingredient.id] ? ingredient : null,
        };
        setSelectedIngredients(newIngredients);
        if (props.onIngredientsChange) {
            props.onIngredientsChange(newIngredients);
        }
    };

    if (!props.showIngredients) return null;
    
    return(
        <ul className="ingredients__list">
            {ingredients
                .filter(ingredient => ingredient && ingredient.available)
                .map(ingredient => (
                    <li 
                        key={ingredient.id} 
                        className={`ingredients__item ${selectedIngredients[ingredient.id] ? 'ingredient__item__selected' : ""}`} 
                        onClick={() => toggleIngredient(ingredient)}
                    >
                        <div className="ingredient__name">{ingredient.name}</div>
                        <div className="ingredient__price">+{ingredient.price} ₽</div>
                    </li>
                ))
            }
        </ul>   
    );
};

export default Ingredients;