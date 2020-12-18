import React, { useState, useEffect /* Component */ } from 'react';

// const getStateFromLocalStorage = () => {
//   const storage = localStorage.getItem('counterState');
//   console.log('(NOT IN USE) Fetched from local storage...', storage);
//   if (storage) return JSON.parse(storage).count;
//   return { count: 0 };
// };

// const storeStateInLocalStorage = count => {
//   localStorage.setItem('counterState', JSON.stringify({ count }));
//   console.log('(NOT IN USE) Storing...', localStorage);
// };


// const useLocalStorage = (initialState, key) => {
//   const get = () => {
//     const storage = localStorage.getItem(key);
//     console.log('Fetching from local storage...', value);
//     if (storage) return JSON.parse(storage)[value];
//     return initialState;
//   };
  
//   const [value, setValue] = useState(get());
  
//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify({ value }));
//     console.log('Adding to local storage...', value);
//   }, [value]);

//   return [value, setValue];
// };

// refactored from class base component
const Counter = ({ max, step }) => {
  const [count, setCount] =  useState(0); //useLocalStorage(0, 'count');  //  previously useState(0)
  const countRef = React.useRef();

  let message = '';
  const stats = `Count is`;
  (countRef.current < count) ? (message = 'Higher | ' +  stats) : message = 'Lower | ' +  stats;

  countRef.current = count;

  const increment = () => {
    setCount(c => c + 1);
    // console.log('1 count:', count);  //gives initial count b4 operation
    // setCount(c => c + 1); // gives prevValue + 1 -> (1 + 1)
    // console.log('2 count:', count);  //gives initial count b4 operation
    // setCount(c => c + 1); // gives prevValue + 1 -> (2 + 1)
    // console.log('3 count:', count);  //gives initial count b4 operation
  };
  const incrementFive = () => setCount(c => {
    if  (c >= max) return c; // here we need to return the value (c) or it goes to shit without any warnings
    return c + step;
  });
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(`Count: ${count}`);
    }, 2000);
    return () => clearInterval(id); // without it it would just create as many new setintervals (and their counts)
                                    // as the times you have changed the count
  }, [count]);

  return (
    <div className="Counter">
      <p> { message } </p>
      <p className="count">{ count }</p>
      <section className="controls">
        <button onClick={ increment }> +1 </button>
        <button onClick={ incrementFive }> +5 </button>
        <button onClick={ decrement }> -1 </button>
        <button onClick={ reset }>Reset</button>
      </section>
    </div>
  );
};

// *** Class based component Counter *** //

/* 
const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
}

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    console.log('Fetching from local storage...', value);
    if (storage) return JSON.parse(storage)[value];
    return initialState;
  };

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
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

  //increment() {
    //this.setState(( { count }) => {
      //return { count: count + 1 };
    //}); // (destructured) set it to current count(0) + 1 
    //this.setState({ count: this.state.count + 1}); // set it to 0 + 1
    //this.setState((state) => { return { count: state.count + 1 } }); // set it to current count(1) + 1
  }

    incrementFive() {
    this.setState((state, props) => {
      const { max, step } = props;
      if (state.count >= max) return;
      return { count: state.count + step };
    }, () => {
      console.log('your count:', state.count);
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
} */

export default Counter;
