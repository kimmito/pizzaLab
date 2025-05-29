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
          prices[index] = Number(value) || 0;
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
                      key={tags.length}
                      placeholder={`Добавить тег ${tags.length + 1}`}
                      value=""
                      onChange={(e) => {
                        if (e.target.value.trim() !== "") {
                          const newTags = [...tags, e.target.value];
                          const updatedPizza = {
                            ...this.props.pizza,
                            tags: newTags
                          };
                          this.props.updateMenu(this.props.pizza.id, updatedPizza);
                        }
                      }}
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
                  
                  <button onClick={this.handleDelete} className="button delete-menu-item__button">Удалить из меню</button>

              </form>
          )
      }
  }

  export default EditMenuForm;