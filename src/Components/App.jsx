import React from 'react';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <span>main</span>
        </main>
      </div>
    );
  }
}

export default App;