import React from 'react';
import Key from './Key';

class Keypad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keys : ['1','2','3','+',
            '4','5','6','-'
            ,'7','8','9','/'
            ,'0','.','=','*']
        }
    }

    handleClick(i) {
        this.props.onClick(this.state.keys[i]);
      }

    renderKey(i) {
      return <Key value = {this.state.keys[i]}
      onClick = {() => this.handleClick(i)}/>;
    }
  
    render() {
  
      return (
        <div>
          <div className="key-row">
            {this.renderKey(0)}
            {this.renderKey(1)}
            {this.renderKey(2)}
            {this.renderKey(3)}
          </div>
          <div className="key-row">
            {this.renderKey(4)}
            {this.renderKey(5)}
            {this.renderKey(6)}
            {this.renderKey(7)}
          </div>
          <div className="key-row">
            {this.renderKey(8)}
            {this.renderKey(9)}
            {this.renderKey(10)}
            {this.renderKey(11)}
          </div>
          <div className="key-row">
            {this.renderKey(12)}
            {this.renderKey(13)}
            {this.renderKey(14)}
            {this.renderKey(15)}
          </div>
        </div>
      );
    }
  }

  export default Keypad;