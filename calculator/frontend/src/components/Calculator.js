import React from 'react';
import Keypad from './Keypad';
import DisplayBox from './DisplayBox'
  
  class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first: "",
            second: "",
            operator: "",
            ip : ""
        }
    }

    handleClick = (input) => {
        var regex = /^[+*-/]/g
        if(!(regex.test(input) && !this.state.ip)){
            let ip = this.state.ip;
        ip += input;
        this.setState({
            ip:ip
        });
        }
        
      }
    render() {
      return (
        <div className="calculator">
       
            
        
          <div className="cal-board">
          <tr><DisplayBox input = {this.state.ip}/></tr>
          
            <tr><Keypad onClick = {this.handleClick}/></tr>
          </div>
          <div className="cal-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  export default Calculator;