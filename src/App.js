import './App.css';
import './normalize.css';
import './breakpoints.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState(0);
  const [curState, setCurState] = useState(0);
  const [prevState, setPrevState] = useState(0);
  const [operator, setOperator] = useState(null);

  /*******************************
   ***********Display*************
   *******************************/
  const displayNum = (e) => {
    const num = e.target.innerText;

    // when comma (,) is already displayed, don't add up anymore
    if (num === ',' && input.includes(',')) return;

    curState === 0 ? setCurState(num) : setCurState((prev) => prev + num);
  };

  // input = curState (when curState changes and there is value, input is updated)
  useEffect(() => {
    curState && setInput(curState);
  }, [curState]);

  /*******************************
   ***********Calculate***********
   *******************************/

  // plus, minus, multiply, divide
  const operators = (e) => {
    const targetText = e.target.innerText;
    setOperator(targetText);

    // when prevState contains something => which means operator is clicked second time
    if (prevState !== 0 && operator && curState !== 0) {
      // calculate and save result to prevState
      setOperator(targetText);
      equals();
      // when it's first operator being clicked
    } else if (curState !== 0 && prevState === 0) {
      // here is a problem!!!!!! ->  when operator is secondly clicked -> because curState is empty -> prevState becomes empty
      setPrevState(curState);
      setCurState(0);
    }
  };
  /*******************************
   ********Positive/negative******
   *******************************/
  const positiveNegative = (e) => {
    // 1. Input should be bigger than 0
    // 2. if the value is curState -> stay as curState
    // 3. if the value is prevState -> stay as prevState
    // when the value is bigger than 0 -> make it negative
    // else -> make it positive

    // when no operator is clicked = first number
    if (operator === null) {
      if (input > 0) {
        setCurState(parseFloat(input * -1));
      } else {
        setCurState(parseFloat(Math.abs(input)));
      }
      // when operator is clicked = second number
    } else if (operator !== null && prevState !== 0 && curState !== 0) {
      if (input > 0) {
        setCurState(parseFloat(input * -1));
      } else {
        setCurState(parseFloat(Math.abs(input)));
      }
      // when there is only prevState value
    } else if (operator !== null && prevState !== 0 && curState === 0) {
      if (prevState > 0) {
        setPrevState(parseFloat(input * -1));
        setInput(parseFloat(input * -1));
      } else {
        setPrevState(parseFloat(Math.abs(input)));
        setInput(parseFloat(Math.abs(input)));
      }
    }
  };

  /*******************************
   ***********Percentage**********
   *******************************/
  const percentage = (e) => {
    if (input) {
      setCurState(curState / 100);
    }
    if (prevState !== 0 && curState === 0) {
      setPrevState(input / 100);
      setInput(input / 100);
    }
  };

  /*******************************
   *************Equals************
   *******************************/
  const equals = (e) => {
    // prevState and curState into number from string
    const prevNum = parseFloat(prevState);
    const curNum = parseFloat(curState);

    let res;

    switch (operator) {
      case '/':
        if (curNum === 0) {
          alert('cannot be divided by 0');
          setCurState(0);
          return;
        }
        const firstVal = prevNum / curNum;
        res = firstVal.toFixed(10);
        break;
      case 'X':
        res = prevNum * curNum;
        break;
      case '-':
        res = prevNum - curNum;
        break;
      case '+':
        res = prevNum + curNum;
        break;
      default:
        console.log('default');
    }

    setPrevState(res);
    setCurState(0);
    setInput(res);

    //
    if (prevState === 0 && operator === null) return;

    setCurState(0);
  };

  /*******************************
   *************Reset*************
   *******************************/
  const reset = () => {
    setCurState(0);
    setPrevState(0);
    setInput(0);
    setOperator(null);
  };

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
