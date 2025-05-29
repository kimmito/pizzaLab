import React from 'react';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
import Events from './Events';
import About from './About';
import Footer from './Footer';
import Cart from './Cart';
import MenuAdmin from './MenuAdmin';
import sampleMenu from '../sample-menu';
import sampleEvents from "./../sample-events"
import { BsCart2 } from "react-icons/bs";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js";
class App extends React.Component {
  state = {
    authorized: false,
    menu: sampleMenu,
    events: sampleEvents,
    currentCategory: null,
    order: {},
    showCart: false,
    showMenuAdmin: true,
  }

handleCategoryChange = (category) => {
  this.setState({ currentCategory: category });
}

addToOrder = (id, pizzaState) => {
    const order = { ...this.state.order };
    order[id] = {
        ...order[id],
        ...pizzaState,
        price: pizzaState.price,
        totalPrice: pizzaState.totalPrice,
        count: pizzaState.count || 1
    };
    this.setState({ order });
}

deleteFromOrder = (id) => {
  const itemElement = document.querySelector(`[data-item-id="${id}"]`);
  if (itemElement) {
    itemElement.classList.add("animate__animated", "animate__bounceOutRight");

    itemElement.addEventListener('animationend', () => {
      const order = { ...this.state.order };
      delete order[id];
      this.setState({ order });
    });
  } else {
    const order = { ...this.state.order };
    delete order[id];
    this.setState({ order });
  }
}

renderCart = () => {
    this.setState({
      showCart: !this.state.showCart
  
  })
}

calcOrderCount = () => {
  return Object.values(this.state.order).reduce((total, item) => total + (item?.count || 1), 0);
}

tempAuth = () => {
  this.setState(prev => ({
    authorized: !prev.authorized
  }))
}

toggleMenuAdmin = () => {
    this.setState(prev => ({
        ...prev,
        showMenuAdmin: !prev.showMenuAdmin
    }))
}

updateMenu = (id, updatedPizza) => {
  this.setState(prevState => ({
    menu: prevState.menu.map(pizza => 
      pizza.id === id ? updatedPizza : pizza
    )
  }));
}

deleteFromMenu = (id) => {
  this.setState(prevState => ({
    menu: prevState.menu.filter(pizza => pizza.id !== id)
  }));
}

updateEvents = (id, updatedEvent) => {
  this.setState(prevState => ({
    events: prevState.events.map(event => 
      event.id === id ? updatedEvent : event
    )
  }));
}

deleteFromEvents = (id) => {
  this.setState(prevState => ({
    events: prevState.events.filter(event => event.id !== id)
  }));
}

  render() {
    return (
      <div className="app">
        {this.state.showCart && (
          <Cart 
            order={this.state.order} 
            renderCart={this.renderCart} 
            addToOrder={this.addToOrder} 
            deleteFromOrder={this.deleteFromOrder}
            updateOrderItem={this.addToOrder}
          />
        )}
        {this.state.showMenuAdmin && (
          <MenuAdmin 
            updateMenu={this.updateMenu} 
            deleteFromMenu={this.deleteFromMenu}
            updateEvents={this.updateEvents} 
            deleteFromEvents={this.deleteFromEvents}
            toggleMenuAdmin={this.toggleMenuAdmin} 
            menu={this.state.menu} 
            events={this.state.events}
          />
        )}
        <Header 
          toggleMenuAdmin={this.toggleMenuAdmin} 
          authorization={this.tempAuth} 
          authorized={this.state.authorized}
          renderCart={this.renderCart} 
          calcOrderCount={this.calcOrderCount}
        />
        <main>
          <Home />
          <Menu 
            menu={this.state.menu} 
            currentCategory={this.state.currentCategory}
            handleCategoryChange={this.handleCategoryChange}
            addToOrder={this.addToOrder}
            deleteFromOrder={this.deleteFromOrder}
            renderCart={this.renderCart}
            order={this.state.order}
          />
          <Events events={this.state.events}/>
          <About />
          <button 
              onClick={this.renderCart} 
              type="button" 
              className={`button cart-button cart-button__static ${this.calcOrderCount() > 0 ? 'cart-active' : ''}`}
              >
              <BsCart2 className={`cart-icon ${this.calcOrderCount() > 0 ? 'cart-active' : ''}`}/>
              {this.calcOrderCount() > 0 && (
                  <span className="cart__count">{this.calcOrderCount()}</span>
              )}
          </button>
        </main>
        <Footer handleCategoryChange={this.handleCategoryChange} events={this.state.events}/>

      </div>

    );
  }
}

export default App;
