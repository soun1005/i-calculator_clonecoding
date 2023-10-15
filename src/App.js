import './App.css';
import './normalize.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState(0);
  const [curState, setCurState] = useState(0);
  const [prevState, setPrevState] = useState(0);
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  /*******************
   *******************
   display
   *******************
   *******************/
  const displayNum = (e) => {
    const num = e.target.innerText;
    console.log(typeof num);

    // when , is already displayed, don't add up anymore
    if (num === ',' && input.includes(',')) return;

    curState === 0 ? setCurState(num) : setCurState((prev) => prev + num);
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
    if (prevState !== 0) {
      // calculate and save result to prevState
      setOperator(targetText);
      equals();
      // when it's first operator being clicked
    } else if (curState !== 0) {
      // here is a problem!!!!!! ->  when operator is secondly clicked -> because curState is empty -> prevState becomes empty
      setPrevState(curState);
      setCurState(0);
    }
  };

  const positiveNegative = (e) => {
    // positive => negative
    // negative => positive
  };

  const percentage = (e) => {
    // percentage
  };

  /*******************
   ********************
   Equals
   *******************
   *******************/
  const equals = (e) => {
    // prevState and curState into number from string
    const prevNum = parseFloat(prevState);
    const curNum = parseFloat(curState);

    let res;

    switch (operator) {
      case '/':
        res = String(prevNum / curNum);
        // res = parseFloat(prevState) / parseFloat(curState);
        break;
      case 'X':
        res = String(prevNum * curNum);
        // res = parseFloat(prevState) * parseFloat(curState);
        break;
      case '-':
        res = String(prevNum - curNum);
        // res = parseFloat(prevState) - parseFloat(curState);
        break;
      case '+':
        res = String(prevNum + curNum);
        // res = parseFloat(prevState) + parseFloat(curState);
        break;
      default:
        console.log('default');
    }

    // console.log(res);
    setPrevState(res);
    setCurState(0);
    setInput(res);
    setTotal(true);
    // setOperator(null);

    //
    if (prevState === '' && operator === null) return;
    // when equals is clicked -> empty operator
    // console.log('HELLo');
    // setOperator(null);
    setCurState(0);
  };

  /*******************
   ********************
   Reset 
   *******************
   *******************/
  const reset = () => {
    setCurState(0);
    setPrevState(0);
    setInput(0);
    setOperator(null);
  };

  // console.log('input:', input);
  console.log('curState type:', typeof curState);
  console.log('prevState type:', typeof prevState);
  console.log('operator', operator);

  return (
    <div className="container">
      <div className="wrap">
        <div className="outputScreen">
          <span className="output">{input}</span>
        </div>
        <div className="btn" onClick={reset}>
          AC
        </div>
        <div className="btn" onClick={positiveNegative}>
          +/-
        </div>
        <div className="btn" onClick={percentage}>
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
