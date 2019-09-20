import React from 'react';

class DisplayBox extends React.Component {
    render() {
      return (
          <div className = "display-box">
            {this.props.input}
          </div>
      );
    }
  }

export default DisplayBox;