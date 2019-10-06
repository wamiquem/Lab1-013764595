import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import OldOrdersList from './ownerOrders/OldOrdersList';
import NewOrdersList from './ownerOrders/NewOrdersList';
import backendURL from '../urlconfig';

class OwnerHome extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            orders: []
        }
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(cookie.load('cookie')){
            fetch(`${backendURL}/owner/firstName`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    firstName: data.firstName
                })
            })
            .catch(err => console.log(err));

            fetch(`${backendURL}/restaurant/allOrders`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {                
                this.setState({
                    firstName: data.firstName,
                    orders: data.orders
                })
            })
            .catch(err => console.log(err));
        }
    }
    
    render(){
        const oldOrders = [];
        const newOrders =[];
        this.state.orders.forEach(order => (order.orderStatus === 'Delivered' ? oldOrders : newOrders).push(order));
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {this.state.firstName} />
                <NewOrdersList orders = {newOrders}/>
                <OldOrdersList orders = {oldOrders}/>
            </div>
        )
    }
}

export default OwnerHome;