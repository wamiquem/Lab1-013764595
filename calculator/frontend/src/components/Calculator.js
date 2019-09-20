import React from 'react';
import Keypad from './Keypad';
import DisplayBox from './DisplayBox'
  
  class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ip : ""
        }
    }

    handleClick = (input) => {
        var regex = /^[+*-/=]/g
        if(!(regex.test(input) && !this.state.ip)){
                let ip = this.state.ip;
                ip += input;
                this.setState({
                    ip:ip
                });
        }
        if(input==='=' && this.state.ip){
          const data = {
            expression: this.state.ip
          }
          fetch('http://localhost:4002/', {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         })
         .then(res => {
          console.log(res);
          if(res.status === 200){
            res.text().then(data => {
              console.log(data);
              this.setState({
                  ip: JSON.parse(data)
              })
          })
          }else{
              this.setState({
                ip: 'Error'
              })
          }
          // return res.json();
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