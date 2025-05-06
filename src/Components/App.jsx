import React from 'react';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
import Events from './Events';
import About from './About';
import Footer from './Footer';
import sampleMenu from '../sample-menu';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js";
class App extends React.Component {
  state = {
    menu: sampleMenu,
    currentCategory: null,
    events: {},
    order: {},
  }

  handleCategoryChange = (category) => {
    this.setState({ currentCategory: category });
  }

  addToOrder = (id, count) => {
    const order = this.state.order;
    order[id] = count;
    this.setState({order});
  }

  goToCart = () => {
    console.log('1');
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Home />
          <Menu 
            menu={this.state.menu} 
            currentCategory={this.state.currentCategory}
            handleCategoryChange={this.handleCategoryChange}
            addToOrder={this.addToOrder}
            goToCart={this.goToCart}
          />
          <Events />
          <About />
        </main>
        <Footer handleCategoryChange={this.handleCategoryChange} />
      </div>
    );
  }
}

export default App;
