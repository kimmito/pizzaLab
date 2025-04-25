import React from 'react';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Home />
          <Menu />
        </main>
      </div>
    );
  }
}

export default App;