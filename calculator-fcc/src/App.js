import React from 'react';
//import ReactDOM from 'react-dom';
import './style.css';


// const variables for calculator clickable elements
const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const op = [ '/', '*', '-', '+'];
const ids = {
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'zero',
  '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
}

// initial state for last pressed button, calculation, and operator selected
class App extends React.Component {
  state = {
    lastPressed: undefined,
    calc: '0',
    operation: undefined
  }
  
  
  // calc and lastPressed will be saved to the current state
  // innerText of HTML element represents the rendered text content found in each button 
  // event.target will reference to the object on which the event originally occured...in this case the innerText
  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;
    
	// switch statement based on innerText selected 
	// if 'AC' is pressed then calculation set to '0' and also set to state	
    switch(innerText) {
      case 'AC': {
        this.setState({
          calc: '0',
        });
        break;
      }
      // if '=' is pressed then the javascript eval() function is applied. 
      // ...this new calculation is set to state.  
      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }
      //   
      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];
        
        if(!last.includes('.')) {
          this.setState({
            calc: calc+'.'
          })
        }
        
        break;
      }
      // if case match above not found then run default   
      default: {
        let e = undefined;
        // allow for user to input negative integers to be calculated
		// allow two or more operators but last operator is performeded
        if(op.includes(innerText)) {
          if(op.includes(lastPressed) && innerText !== '-') {
            const lastNumberIdx = calc.split('').reverse()
                .findIndex(char => char !== ' ' && nums.includes(+char)); 
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
			// template literals for calc and innerText expressions  
            e = `${calc} ${innerText} `;
          }
		  // conditional (ternary) operator if calc is '0'. 
		  // true = innerText
		  // false = (calc + innerText)
        } else {
          e = (calc === '0') ? innerText : (calc + innerText);
        }
        
        this.setState({
          calc: e
        });
      }
    }
    
    this.setState({
      lastPressed: innerText
    })
    
  }
  
  render() {
    const { calc } = this.state;
    
    return (
		// display element to display values based on {calc} inputted by user
      <div className="calculator">        
        <div id="display" className="display">
          {calc}
        </div>

        <div className="nums-container">
          <button 
            className="red wide" 
            onClick={this.handleClick} 
            id="clear"
            >
            AC
          </button>
          {/* numeric buttons mapped to respective ids and nums */}
          {nums.map(num => (
            <button 
              key={num} 
              onClick={this.handleClick}
              id={ids[num]}
             >
              {num}
            </button>
          ))}
          {/* clickable element for decimal */}
          <button 
            onClick={this.handleClick} 
            id="decimal"
           >
            .
          </button>
        </div>
		{/* container for numeric clickable elements*/}
		<div className="op-container">
          {op.map(op => (
            <button 
              className="orange" 
              key={op} 
              onClick={this.handleClick}
              id={ids[op]}
             >
              {op}
            </button>
          ))}
          
		  {/* clickable element for equals sign */}
          <button 
            className="mint long" 
            onClick={this.handleClick} 
            id="equals"
           >
            =
          </button>
        </div>
      </div>
    )
  }
}

//ReactDOM.render(<App />, document.getElementById('app'));

export default App