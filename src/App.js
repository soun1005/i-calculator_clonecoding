import './App.css';
import './normalize.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState(0);
  const [curState, setCurState] = useState(0);
  const [prevState, setPrevState] = useState(0);
  const [operator, setOperator] = useState([]);

  /*******************
   *******************
   display
   *******************
   *******************/
  const displayNum = (e) => {
    const num = e.target.innerText;

    // when , is already displayed, don't add up anymore
    if (num === ',' && input.includes(',')) return;

    curState ? setCurState((prev) => prev + num) : setCurState(num);
  };

  // input = curState (when curState changes input is updated)
  useEffect(() => {
    setInput(curState);
  }, [curState]);

  /******************
  *******************
  Calculate 
  *******************
  *******************/
  // plus, minus, multiply, divide
  const calcul = (e) => {
    const targetText = e.target.innerText;

    // set operator as chosen operator
    // if operator is empty

    // 1. 오퍼레이터에 아무것도 없을때
    // 클릭한값을 오퍼레이터로 등록하기
    if (operator.length === 0) {
      setOperator([...targetText]);
      // curState를 prev로 등록하기
      setPrevState(curState);
      setCurState(0);
    }

    // 2. 이미 오퍼레이터가 있을경우 => 계산해서 결과를 curState로 만들기
    if (operator.length > 0 && prevState && curState) {
      // 1. add operator as operator[0] 첫번째 순서가 되게 배열에 넣기
      setOperator([...targetText, ...operator]);

      // 2. get cur, prev numbers
      const prevNum = parseFloat(prevState.replace(',', '.'));
      const curNum = parseFloat(curState.replace(',', '.'));

      // Perform the calculation based on the operator
      let result;

      switch (operator[0]) {
        case '+':
          result = prevNum + curNum;
          break;
        case '-':
          result = prevNum - curNum;
          break;
        case 'X':
          result = prevNum * curNum;
          break;
        case '/':
          if (curNum === 0) {
            return;
          }
          result = prevNum / curNum;
          break;
        default:
          alert('Invalid operator');
          return;
      }

      // Update the previous state with the result with two first numbers
      setCurState(result);
    }
  };

  /*******************
   ********************
   Equals 
   *******************
   *******************/
  const equals = (e) => {
    // const target = e.target.innerText;
    // parseFloat turns string to number

    if (prevState && curState) {
      const prevNum = parseFloat(prevState.replace(',', '.'));
      const curNum = parseFloat(curState.replace(',', '.'));
      switch (operator[0]) {
        case '/':
          setCurState(prevState / curState);
          break;
        case 'X':
          setCurState(prevState * curState);
          break;
        case '-':
          setCurState(prevState - curState);
          break;
        case '+':
          // setInput(prevState + curState); -> this returns 3+3 = 33
          const result = parseFloat(prevNum) + parseFloat(curNum);
          setCurState(result.toString());
          break;
        default:
          console.log('default');
      }
    }

    if (prevState === 0 && operator === null) return;
    // when equals is clicked -> empty operator
    setOperator([]);
    // setCurState(0);
    // return setInput(prevState + operator + curState);
  };

  /*******************
   ********************
   Reset 
   *******************
   *******************/
  const reset = () => {
    setCurState(0);
    setOperator([]);
  };

  console.log('input:', input);
  console.log('curState:', curState);

  return (
    <div className="container">
      <div className="wrap">
        <div className="outputScreen">
          <span className="output">
            {input !== '' || input === '0' ? curState : prevState}
          </span>
        </div>
        <div className="btn" onClick={reset}>
          AC
        </div>
        <div className="btn" onClick={calcul}>
          +/-
        </div>
        <div className="btn" onClick={calcul}>
          %
        </div>
        <div className="btn orange" onClick={calcul}>
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
        <div className="btn orange" onClick={calcul}>
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
        <div className="btn orange" onClick={calcul}>
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
        <div className="btn orange" onClick={calcul}>
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
