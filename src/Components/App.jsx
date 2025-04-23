import React from 'react';
import Header from './Header';
import Home from './Home';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Home />
        </main>
      </div>
    );
  }
}

export default App;