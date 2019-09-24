import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';

//create the Navbar Component
class BuyerHome extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: ""
        }
        
    }

    //get the books data from backend  
    componentDidMount(){
            if(cookie.load('cookie')){
            fetch('http://localhost:3101/buyer/firstName',{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    firstName: data.firstName
                })
            })
            .catch(err => console.log(err));
        }
    }
    
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}

                <Navbar firstName = {this.state.firstName} />
            </div>
            
        
        )
    }
}

export default BuyerHome;