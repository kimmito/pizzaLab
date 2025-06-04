import React, {useState} from "react";

const Ingredients = (props) => {
    // Добавляем проверку на существование и тип ingredients
    const ingredients = Array.isArray(props.ingredients) ? props.ingredients : [];
    const [selectedIngredients, setSelectedIngredients] = useState(props.selectedIngredients || {});
    
    const toggleIngredient = (ingredient) => {
        const newIngredients = {
            ...selectedIngredients,
            [ingredient.id]: !selectedIngredients[ingredient.id] ? ingredient : null, // Заменил 0 на null
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