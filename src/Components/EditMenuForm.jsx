import React from "react";

class EditMenuForm extends React.Component{

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
        prices[index] = value;
        const updatedPizza = {
          ...this.props.pizza,
          price: prices
        };
        this.props.updateMenu(this.props.pizza.id, updatedPizza);
    }

    handleTagChange = (index, value) => {
        const tags = [...this.props.pizza.tags];
        tags[index] = value;
        const updatedPizza = {
          ...this.props.pizza,
          tags: tags
        };
        this.props.updateMenu(this.props.pizza.id, updatedPizza);
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.deleteFromMenu(this.props.pizza.id);
    }

    render(){
        const {pizza} = this.props;
        const prices = pizza.price || [];
        const tags = pizza.tags || [];
        const availability = pizza.availability || "unavailable";
        return(
            <form className="editor-item pizza-edit">
                <input name="name" placeholder="Название" value={pizza.name} onChange={this.handleMenuChange} autoComplete="off" type="text" className="editor-item__block editor-item__title pizza-edit__title" />
                <input name="image" placeholder="Изображение" value={pizza.image} onChange={this.handleMenuChange} autoComplete="off" type="text" className="editor-item__block pizza-edit__image" />
                <textarea name="desc" placeholder="Описание" value={pizza.description} onChange={this.handleMenuChange} autoComplete="off" type="text" className="editor-item__block pizza-edit__desc" />
                <div className="editor-item__block pizza-edit__prices">
                  {prices.map((price, index) => (
                    <input 
                          key={index}
                          placeholder={`Цена ${index + 1}`}
                          value={price}
                          onChange={(e) => this.handlePriceChange(index, e.target.value)}
                          autoComplete="off"
                          type="text"
                          className="editor-item__block pizza-edit__prices__item"
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
                </div>
                <select 
                  value={availability ? "available" : "unavailable"}
                  onChange={(e) => {
                    const updatedPizza = {
                      ...this.props.pizza,
                      availability: e.target.value === "available"
                    };
                    this.props.updateMenu(this.props.pizza.id, updatedPizza);
                  }}
                  className="editor-item__block pizza-edit__availability" 
                  name="status"
                >
                  <option value="available">Доступно</option>
                  <option value="unavailable">Недоступно</option>
                </select>
                
                <button onClick={this.handleDelete} className="button deleteMenuItem">Удалить из меню</button>

            </form>
        )
    }
}

export default EditMenuForm;