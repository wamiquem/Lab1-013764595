import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import OwnerProfile from './OwnerProfile';

//create the Navbar Component
class OwnerAccount extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            
        }
        // this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.name]: e.value });
    }

    componentDidMount(){
        if(cookie.load('cookie')){
            fetch('http://localhost:3101/owner/details',{
            credentials: 'include'
             })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    fname: data.firstName,
                    lname: data.lastName,
                    phone: data.phone,
                    restName: data.restName,
                    restZip: data.restZip
                });
            })
            .catch(err => console.log(err));
        }
    }

    render(){
        //if Cookie is set render Owner Home Page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/owner/login"/>
        }
        // if(this.state.success){
        //     redirectVar = <Redirect to= "/owner/login"/>
        // }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {this.state.fname}/>
                <OwnerProfile ownerDetails = {this.state} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default OwnerAccount;