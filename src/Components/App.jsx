import React from 'react';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
import Events from './Events';
import About from './About';
import Footer from './Footer';
import Cart from './Cart';
import sampleMenu from '../sample-menu';
import sampleEvents from "./../sample-events"
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js";
class App extends React.Component {
  state = {
    menu: sampleMenu,
    events: sampleEvents,
    currentCategory: null,
    order: {},
    showCart: false,
  }

  handleCategoryChange = (category) => {
    this.setState({ currentCategory: category });
  }

addToOrder = (id, state) => {
    const order = { ...this.state.order };
    order[id] = {
        ...state,
        price: state.price,
        totalPrice: state.totalPrice
    };
    this.setState({ order });
}

  renderCart = () => {
    this.setState({
      showCart: !this.state.showCart
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showCart && <Cart order={this.state.order} renderCart={this.renderCart}/>}
        <Header renderCart={this.renderCart}/>
        <main>
          <Home />
          <Menu 
            menu={this.state.menu} 
            currentCategory={this.state.currentCategory}
            handleCategoryChange={this.handleCategoryChange}
            addToOrder={this.addToOrder}
            renderCart={this.renderCart}
          />
          <Events events={this.state.events}/>
          <About />
        </main>
        <Footer handleCategoryChange={this.handleCategoryChange} events={this.state.events}/>

      </div>

    );
  }
}

export default App;
