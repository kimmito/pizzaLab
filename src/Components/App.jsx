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
import sampleEvents from '../sample-events';
import sampleIngredients from '../sample-ingredients';
import { BsCart2 } from "react-icons/bs";
import { database, ref, onValue, set, off } from '../firebase_setup/firebase';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js";

class App extends React.Component {
  state = {
    authorized: false,
    menu: {},
    events: {},
    ingredients: {},
    currentCategory: null,
    order: {},
    showCart: false,
    showMenuAdmin: false,
    loading: true,
    showLoginForm: false
  }

  menuListener = null;
  eventsListener = null;
  ingredientsListener = null;
  auth = getAuth();

  componentDidMount() {
    const savedOrder = JSON.parse(localStorage.getItem('pizzaOrder'));
    
    if (savedOrder) {
      const order = {};
      Object.keys(savedOrder).forEach(key => {
        order[key] = {
          ...savedOrder[key],
          selectedIngredients: savedOrder[key].selectedIngredients 
            ? {...savedOrder[key].selectedIngredients} 
            : {}
        };
      });
      this.setState({ order });
    }

    onAuthStateChanged(this.auth, (user) => {
      this.setState({
        authorized: !!user,
        loading: false
      });
      localStorage.setItem('isAuthorized', !!user);
    });

    this.setupFirebaseListeners();
  }

  componentWillUnmount() {
    if (this.menuListener) off(ref(database, 'menu'), this.menuListener);
    if (this.eventsListener) off(ref(database, 'events'), this.eventsListener);
    if (this.ingredientsListener) off(ref(database, 'ingredients'), this.ingredientsListener);
  }

  setupFirebaseListeners = () => {
    this.menuListener = onValue(ref(database, 'menu'), (snapshot) => {
      const menu = snapshot.val() || {};
      this.setState({ menu });
    });

    this.eventsListener = onValue(ref(database, 'events'), (snapshot) => {
      const events = snapshot.val() || {};
      this.setState({ events });
    });

    this.ingredientsListener = onValue(ref(database, 'ingredients'), (snapshot) => {
      const ingredients = snapshot.val() || {};
      this.setState({ ingredients });
    });
  }

  writeDataToDatabase = (path, data) => {
    set(ref(database, path), data);
  };

  handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.setState({ 
        authorized: true,
        showLoginForm: false 
      });
      return true;
    } catch (error) {
      console.error("Ошибка входа:", error);
      return false;
    }
  };

  handleLogout = () => {
    signOut(this.auth)
      .then(() => {
        this.setState({ authorized: false });
      });
  };

  toggleLoginForm = () => {
    this.setState(prev => ({ showLoginForm: !prev.showLoginForm }));
  };

  handleCategoryChange = (category) => {
    this.setState({ currentCategory: category });
  }

  addToOrder = (id, pizzaState) => {
    if (!this.state.menu[id] || !this.state.menu[id].availability) {
      alert('Этот продукт больше не доступен');
      return;
    }

    const order = { ...this.state.order };
    order[id] = {
      ...order[id],
      ...pizzaState,
      price: pizzaState.price,
      totalPrice: pizzaState.totalPrice,
      count: pizzaState.count || 1,
      selectedIngredients: pizzaState.selectedIngredients 
      ? {...pizzaState.selectedIngredients} 
      : {}
      };
    
    this.setState({ order }, () => {
      localStorage.setItem('pizzaOrder', JSON.stringify(this.state.order));
    });
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
      this.setState({ order }, () => {
        localStorage.setItem('pizzaOrder', JSON.stringify(this.state.order));
      });
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


  toggleMenuAdmin = () => {
    this.setState(prev => ({
      ...prev,
      showMenuAdmin: !prev.showMenuAdmin
    }))
  }

  addToMenu = (newItem) => {
    const menu = { ...this.state.menu };
    const key = `item${Date.now()}`;
    menu[key] = newItem;
    this.setState({ menu }, () => {
      this.writeDataToDatabase('menu', this.state.menu);
    });
  }

  deleteFromMenu = (key) => {
  const menu = { ...this.state.menu };
  delete menu[key];
  
  const order = { ...this.state.order };
  if (order[key]) {
    delete order[key];
  }
  this.setState({ menu, order }, () => {
    localStorage.setItem('pizzaOrder', JSON.stringify(this.state.order));
    this.writeDataToDatabase('menu', this.state.menu);
  });
}

updateMenu = (key, updatedPizza) => {
  const menu = { ...this.state.menu };
  menu[key] = updatedPizza;
  
  const order = { ...this.state.order };
  if (order[key]) {
    order[key] = {
      ...order[key],
      name: updatedPizza.name,
      image: updatedPizza.image,
      description: updatedPizza.description,
      price: updatedPizza.price,
      tags: updatedPizza.tags,
      availability: updatedPizza.availability,
      selectedIngredients: order[key].selectedIngredients || [],
      count: order[key].count || 1,
      totalPrice: (order[key].count || 1) * updatedPizza.price
    };
    
    if (!updatedPizza.availability) {
      delete order[key];
    }
  }
  
  this.setState({ menu, order }, () => {
    localStorage.setItem('pizzaOrder', JSON.stringify(this.state.order));
    this.writeDataToDatabase('menu', this.state.menu);
  });
}

  addToEvents = (newItem) => {
    const events = { ...this.state.events };
    const key = `event${Date.now()}`;
    events[key] = newItem;
    this.setState({ events }, () => {
      this.writeDataToDatabase('events', this.state.events);
    });
  }

  updateEvents = (key, updatedEvent) => {
    const events = { ...this.state.events };
    events[key] = updatedEvent;
    this.setState({ events }, () => {
      this.writeDataToDatabase('events', this.state.events);
    });
  }

  deleteFromEvents = (key) => {
    const events = { ...this.state.events };
    delete events[key];
    this.setState({ events }, () => {
      this.writeDataToDatabase('events', this.state.events);
    });
  }

  addToIngredients = (newItem) => {
    const ingredients = { ...this.state.ingredients };
    const key = `ingredient${Date.now()}`;
    ingredients[key] = newItem;
    this.setState({ ingredients }, () => {
      this.writeDataToDatabase('ingredients', this.state.ingredients);
    });
  }

  updateIngredients = (key, updatedIngredient) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[key] = updatedIngredient;
    this.setState({ ingredients }, () => {
      this.writeDataToDatabase('ingredients', this.state.ingredients);
    });
  }

  deleteFromIngredients = (key) => {
    const ingredients = { ...this.state.ingredients };
    delete ingredients[key];
    this.setState({ ingredients }, () => {
      this.writeDataToDatabase('ingredients', this.state.ingredients);
    });
  }

  loadSampleMenu = () => {
      if (!window.confirm("Вы уверены? Все текущие данные меню будут заменены.")) {
          return;
      }
      this.writeDataToDatabase('menu', sampleMenu);
  }
  
  loadSampleEvents = () => {
      if (!window.confirm("Вы уверены? Все текущие данные событий будут заменены.")) {
          return;
      }
      this.writeDataToDatabase('events', sampleEvents);
  }
  
  loadSampleIngredients = () => {
      if (!window.confirm("Вы уверены? Все текущие данные ингредиентов будут заменены.")) {
          return;
      }
      this.writeDataToDatabase('ingredients', sampleIngredients);
  }

  render() {
    if (this.state.loading) {
      return <div className="loading">Загрузка данных...</div>;
    }

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
            addToMenu={this.addToMenu}
            updateEvents={this.updateEvents} 
            deleteFromEvents={this.deleteFromEvents}
            addToEvents={this.addToEvents}
            updateIngredients={this.updateIngredients} 
            deleteFromIngredients={this.deleteFromIngredients}
            addToIngredients={this.addToIngredients}
            toggleMenuAdmin={this.toggleMenuAdmin} 
            menu={this.state.menu} 
            events={this.state.events}
            ingredients={this.state.ingredients}
            loadSampleEvents={this.loadSampleEvents}
            loadSampleMenu={this.loadSampleMenu}
            loadSampleIngredients={this.loadSampleIngredients}
          />
        )}
        <Header 
          toggleMenuAdmin={this.toggleMenuAdmin} 
          authorized={this.state.authorized}
          renderCart={this.renderCart} 
          calcOrderCount={this.calcOrderCount}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          showLoginForm={this.state.showLoginForm}
          toggleLoginForm={this.toggleLoginForm}
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
            ingredients={this.state.ingredients}
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