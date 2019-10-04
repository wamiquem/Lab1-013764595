import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import OldOrdersList from './ownerOrders/OldOrdersList';
import NewOrdersList from './ownerOrders/NewOrdersList';

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
        this.handleEditChange = this.handleEditChange.bind(this);
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(cookie.load('cookie')){
            fetch('http://localhost:3101/owner/firstName',{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    firstName: data.firstName
                })
            })
            .catch(err => console.log(err));

            fetch('http://localhost:3101/restaurant/allOrders',{
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

    handleEditChange(id, name, value) {
        this.setState(state => {
            const orders = state.orders.map(order => {
                // Find a order with the matching id
                if(order.orderId == id){
                    //Return a new object
                    return{
                        ...order, //copy the existing section
                        [name]: value  //replace the name with new name
                    }
                }
                // Leave every other section unchanged
                return order;
            });
            return {
                orders
            };
        });
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
                <NewOrdersList orders = {newOrders} onEditChange = {this.handleEditChange}/>
            </div>
        )
    }
}

export default OwnerHome;