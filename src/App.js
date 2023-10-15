import './App.css';
import './normalize.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState(0);
  const [curState, setCurState] = useState('');
  const [prevState, setPrevState] = useState('');
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  /*******************
   *******************
   display
   *******************
   *******************/
  const displayNum = (e) => {
    const num = e.target.innerText;

    // when , is already displayed, don't add up anymore
    if (num === ',' && input.includes(',')) return;

    curState === '' ? setCurState(num) : setCurState((prev) => prev + num);
  };

  // input = curState (when curState changes input is updated)
  useEffect(() => {
    curState && setInput(curState);
  }, [curState]);

  /******************
  *******************
  Calculate
  *******************
  *******************/
  // plus, minus, multiply, divide
  const operators = (e) => {
    const targetText = e.target.innerText;
    setOperator(targetText);

    // if (curState === '') return;

    // when prevState contains something => which means operator is clicked second time
    if (prevState !== '') {
      // calculate and save result to prevState
      equals();
      // when it's first operator being clicked
    } else {
      setPrevState(curState);
      setCurState('');
    }
  };

  /*******************
   ********************
   Equals
   *******************
   *******************/
  const equals = (e) => {
    // prevState and curState into number from string
    const prevNum = parseFloat(prevState.replace(',', '.'));
    const curNum = parseFloat(curState.replace(',', '.'));

    let res;

    switch (operator) {
      case '/':
        res = String(prevNum / curState);
        break;
      case 'X':
        res = String(prevNum * curState);
        break;
      case '-':
        res = String(prevNum - curState);
        break;
      case '+':
        // setInput(prevState + curState); -> this returns 3+3 = 33
        res = String(prevNum + curNum);
        break;
      default:
        console.log('default');
    }

    // console.log(res);
    setPrevState(res);
    setCurState('');
    setInput(res);
    setTotal(true);

    //
    if (prevState === '' && operator === null) return;
    // when equals is clicked -> empty operator
    // console.log('HELLo');
    setOperator(null);
    setCurState('');
    // return setInput(prevState + operator + curState);
  };

  /*******************
   ********************
   Reset 
   *******************
   *******************/
  const reset = () => {
    setCurState('');
    setPrevState('');
    setInput(0);
    setOperator(null);
  };

  // console.log('input:', input);
  console.log('curState:', curState);
  console.log('prevState:', prevState);

  return (
    <div className="container">
      <div className="wrap">
        <div className="outputScreen">
          <span className="output">{input}</span>
        </div>
        <div className="btn" onClick={reset}>
          AC
        </div>
        <div className="btn" onClick={operators}>
          +/-
        </div>
        <div className="btn" onClick={operators}>
          %
        </div>
        <div className="btn orange" onClick={operators}>
          /
        </div>

        <div className="btn num" onClick={displayNum}>
          7
        </div>
        <div className="btn num" onClick={displayNum}>
          8
        </div>
        <div className="btn num" onClick={displayNum}>
          9
        </div>
        <div className="btn orange" onClick={operators}>
          X
        </div>

        <div className="btn num" onClick={displayNum}>
          4
        </div>
        <div className="btn num" onClick={displayNum}>
          5
        </div>
        <div className="btn num" onClick={displayNum}>
          6
        </div>
        <div className="btn orange" onClick={operators}>
          -
        </div>

        <div className="btn num" onClick={displayNum}>
          1
        </div>
        <div className="btn num" onClick={displayNum}>
          2
        </div>
        <div className="btn num" onClick={displayNum}>
          3
        </div>
        <div className="btn orange" onClick={operators}>
          +
        </div>

        <div className="btn zero num" onClick={displayNum}>
          0
        </div>
        <div className="btn num" onClick={displayNum}>
          ,
        </div>
        <div className="btn orange" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
