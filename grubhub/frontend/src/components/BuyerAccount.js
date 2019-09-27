import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import BuyerProfile from './BuyerProfile';

//create the Navbar Component
class BuyerAccount extends Component {
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
            fetch('http://localhost:3101/buyer/details',{
                credentials: 'include'
             })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    fname: data.firstName,
                    lname: data.lastName,
                    phone: data.phone,
                    street: data.street,
                    unit: data.unit,
                    city: data.city,
                    state: data.state,
                    zip: data.zip
                });
            })
            .catch(err => console.log(err));

            fetch('http://localhost:3101/buyer/profilePic',{
                credentials: 'include'
            })
            .then(res => res.blob())
            .then(resAsBlob => {
                this.setState({
                    imgURL: URL.createObjectURL(resAsBlob)
                });
            })
        }
    }

    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/buyer/login"/>
        }
        // if(this.state.success){
        //     redirectVar = <Redirect to= "/buyer/login"/>
        // }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {this.state.fname}/>
                <BuyerProfile buyerDetails = {this.state} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default BuyerAccount;