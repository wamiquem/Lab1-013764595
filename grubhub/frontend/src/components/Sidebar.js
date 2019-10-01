import React,{Component} from 'react';
import {Link} from 'react-router-dom';

//create the Sidebar Component
class Sidebar extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        let menuOptions = this.props.options.map(option => {
            return(
                <li>
                    <Link to={`/owner/${this.props.module}/${option.toLowerCase()}`}>{option}</Link>
                </li>
            )
        })
        return(
            <nav class="navbar navbar-inverse navbar-fixed-left">
                  <div>
                    <ul class="nav navbar-nav">
                      {menuOptions}
                    </ul>
                  </div>
            </nav>
        )
    }
}

export default Sidebar;