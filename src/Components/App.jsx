import React from 'react';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
import Events from './Events';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js";
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Home />
          <Menu />
          <Events />
        </main>
      </div>
    );
  }
}

export default App;