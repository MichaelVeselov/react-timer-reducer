import classes from './Timer.module.css';

import { useEffect, useReducer } from 'react';
import Button from '../UI/button/Button';

const countReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case 'START':
      return {
        ...state,
        isCounting: true,
      };

    case 'STOP':
      return {
        ...state,
        isCounting: false,
      };

    case 'RESET':
      return {
        count: 0,
        isCounting: false,
      };

    case 'TICK':
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return { state };
  }
};

const setCounterInitialValue = () => {
  const userCount = localStorage.getItem('count');
  return userCount ? Number(userCount) : 0;
};

function Timer() {
  const [{ count, isCounting }, dispatch] = useReducer(countReducer, {
    count: setCounterInitialValue(),
    isCounting: false,
  });

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  useEffect(() => {
    let timerId = null;
    if (isCounting) {
      timerId = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }

    return () => {
      timerId && clearInterval(timerId);
      timerId = null;
    };
  }, [isCounting]);

  return (
    <div>
      <h2 className={classes.title}>Timer:</h2>
      <h2 className={classes.counter}>{count}</h2>
      {!isCounting ? (
        <Button onClick={() => dispatch({ type: 'START' })} feature={'start'}>
          Start
        </Button>
      ) : (
        <Button onClick={() => dispatch({ type: 'STOP' })} feature={'stop'}>
          Stop
        </Button>
      )}
      <Button onClick={() => dispatch({ type: 'RESET' })} feature={'reset'}>
        Reset
      </Button>
    </div>
  );
}

export default Timer;
