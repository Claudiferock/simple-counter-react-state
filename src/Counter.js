import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();
    this.increment = this.increment.bind(this);
    this.incrementFive = this.incrementFive.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  //methods
  increment() {
    this.setState((state) => {
      return { count: state.count + 1 };
    }, () => { 
      localStorage.setItem('counterState', JSON.stringify(this.state));
      console.log(localStorage);
    });
  }

  incrementFive() {
    this.setState((state, props) => {
      const { max, step } = props;
      if (state.count >= max) return;
      return { count: state.count + step };
    }, () => {
      return this.state.setTitle;
    }); 
  }

  decrement() {
    this.setState({ count: this.state.count - 1});
  }

  reset() {
    this.setState({ count: 0});
  }

  render() {
    const { count } = this.state;
    document.title = `😎 count: ${count}`;
    
    return (
      <div className="Counter">
        <p className="count">{ count }</p>
        <section className="controls">
          <button onClick={ this.increment }> +1 </button>
          <button onClick={ this.incrementFive }> +5 </button>
          <button onClick={ this.decrement }> -1 </button>
          <button onClick={ this.reset }>Reset</button>
        </section>
      </div>
    );
  }
}

// *** Class based component Counter *** //

/* 
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  //methods
  increment() {
    this.setState(( { count }) => {
      return { count: count + 1 };
    }); // (destructured) set it to current count(0) + 1 
    //this.setState({ count: this.state.count + 1}); // set it to 0 + 1
    //this.setState((state) => { return { count: state.count + 1 } }); // set it to current count(1) + 1
  }

  decrement() {
    this.setState({ count: this.state.count - 1});
  }

  reset() {
    this.setState({ count: 0});
  }

  render() {
    const { count } = this.state;
    document.title = `😎 count: ${count}`;
    
    return (
      <div className="Counter">
        <p className="count">{ count }</p>
        <section className="controls">
          <button onClick={ this.increment }>Increment</button>
          <button onClick={ this.decrement }>Decrement</button>
          <button onClick={ this.reset }>Reset</button>
        </section>
      </div>
    );
  }
} */

export default Counter;
