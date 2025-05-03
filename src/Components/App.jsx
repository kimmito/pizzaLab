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
    menu: {sampleMenu},
    events: {},
    order: {},
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Home />
          <Menu />
          <Events />
          <About />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;