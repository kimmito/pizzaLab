import React from "react";

class AddMenuItemForm extends React.Component {
    state = {
        name: "",
        image: "/images/menu/image.png",
        desc: "",
        prices: [0, 0, 0],
        tags: [],
        availability: true,
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

    handleAddTag = (e) => {
        if (e.target.value.trim() !== "") {
            this.setState(prevState => ({
                tags: [...prevState.tags, e.target.value],
            }));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newMenuItem = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.desc,
            price: this.state.prices,
            tags: this.state.tags,
            availability: this.state.availability,
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
        });
    }

    render() {
        const { tags, availability } = this.state;
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
                    {this.state.tags.map((tag, index) => (
                        <div key={index} className="tag-item">
                            <input 
                                placeholder={`Тег ${index + 1}`}
                                value={tag}
                                onChange={(e) => this.handleTagChange(index, e.target.value)}
                                autoComplete="off"
                                type="text"
                                className="editor-item__block pizza-edit__tags__item"
                            />
                            <button 
                                type="button"
                                onClick={() => {
                                    const newTags = [...this.state.tags];
                                    newTags.splice(index, 1);
                                    this.setState({ tags: newTags });
                                }}
                                className="remove-tag-button"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <input
                        placeholder={`Добавить тег ${tags.length + 1}`}
                        onBlur={this.handleAddTag}
                        autoComplete="off"
                        type="text"
                        className="editor-item__block pizza-edit__tags__item"
                    />
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
                
                <button type="submit" className="button add-menu-item__button">
                    Добавить в меню
                </button>
            </form>
        );
    }
}

export default AddMenuItemForm;