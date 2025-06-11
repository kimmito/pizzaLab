import React from "react";
import PropTypes from "prop-types";
import { MdOutlineAddCircleOutline } from "react-icons/md";

class AddMenuItemForm extends React.Component {
    state = {
        name: "",
        image: "/images/menu/image.png",
        desc: "",
        prices: [0, 0, 0],
        tags: [],
        availability: true,
        newTagInput: ""
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handlePriceChange = (index, value) => {
        const prices = [...this.state.prices];
        prices[index] = Number(value) || 0;
        this.setState({ prices });
    }

    handleTagChange = (index, value) => {
        const tags = [...this.state.tags];
        tags[index] = value;
        this.setState({ tags });
    }

    handleNewTagChange = (e) => {
        this.setState({ newTagInput: e.target.value });
    }

    handleAddTag = (e) => {
        e.preventDefault();
        const { newTagInput, tags } = this.state;
        const trimmedValue = newTagInput.trim();
        
        if (trimmedValue !== "" && !tags.includes(trimmedValue)) {
            this.setState({
                tags: [...tags, trimmedValue],
                newTagInput: ""
            });
        }
    }

    handleTagKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleAddTag(e);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, image, desc, prices, tags, availability } = this.state;
        
        const newMenuItem = {
            id: `${Date.now()}`,
            name,
            image,
            description: desc,
            price: prices,
            tags,
            availability,
        };
        
        if (this.props.addToMenu) {
            this.props.addToMenu(newMenuItem);
        }
        
        this.setState({
            name: "",
            image: "/images/menu/image.png",
            desc: "",
            prices: [0, 0, 0],
            tags: [],
            availability: true,
            newTagInput: ""
        });
    }

    render() {
        const { tags, availability, newTagInput } = this.state;
        
        return (
            <form className="editor-item pizza-edit" onSubmit={this.handleSubmit}>
                <input 
                    name="name" 
                    placeholder="Название" 
                    value={this.state.name} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    type="text" 
                    className="editor-item__block editor-item__title pizza-edit__title" 
                    required
                />
                <input 
                    name="image" 
                    placeholder="Изображение" 
                    value={this.state.image} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    type="text" 
                    className="editor-item__block pizza-edit__image" 
                    required
                />
                <textarea 
                    name="desc"
                    placeholder="Описание" 
                    value={this.state.desc} 
                    onChange={this.handleInputChange} 
                    autoComplete="off" 
                    className="editor-item__block pizza-edit__desc" 
                />
                <div className="editor-item__block pizza-edit__prices">
                    {this.state.prices.map((price, index) => (
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
                            required
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
                    <div className="tag-input-container">
                        <input
                            placeholder={`Добавить тег ${tags.length + 1}`}
                            value={newTagInput}
                            onChange={this.handleNewTagChange}
                            onKeyDown={this.handleTagKeyDown}
                            autoComplete="off"
                            type="text"
                            onBlur={this.handleAddTag}
                            className="editor-item__block pizza-edit__tags__item pizza-add-tag"
                        />
                    </div>
                </div>
                
                <select 
                    value={availability ? "available" : "unavailable"}
                    onChange={(e) => {
                        this.setState({ availability: e.target.value === "available" });
                    }}
                    className="editor-item__block edit-status pizza-edit__availability" 
                >
                    <option value="available">Доступно</option>
                    <option value="unavailable">Недоступно</option>
                </select>
                
                <button type="submit" className="button admin-edit-button add-menu-item__button add-button--text">
                    Добавить в меню
                </button>
                <button type="submit" className="button admin-edit-button add-menu-item__button add-button--icon">
                    <MdOutlineAddCircleOutline />
                </button>
            </form>
        );
    }
}

AddMenuItemForm.propTypes = {
  addToMenu: PropTypes.func.isRequired
};

export default AddMenuItemForm;