import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import food from '../images/food.jpeg'
import backendURL from '../urlconfig';

//create the Navbar Component
class BuyerHome extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            restaurants: "",
            menuItem: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    //get the first name of buyer from backend  
    componentDidMount(){
            if(cookie.load('cookie')){
            fetch(`${backendURL}/buyer/firstName`,{
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

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    render(){
        const isRestaurants = this.state.restaurants;
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}

                <Navbar firstName = {this.state.firstName} />
                <div className="container-fluid">
                    <div>
                        <img src={food} width="100%" height="670px" alt="Responsive image"/>
                        <div className="buyer-home">
                            <div class="col-md-12">
                                <h1 className="display-1">What would you like to eat today?</h1>
                            </div>
                            <div class="col-md-8 buyerInput">
                                <input type="search" class="form-control" size="100"  name = "menuItem" onChange = {this.changeHandler} placeholder="Pizza, Sushi, Biryani..." />
                            </div>
                            <div  class="col-md-4 buyerInput">
                                <Link to={`/buyer/search/${this.state.menuItem}`}>
                                    <button className="btn btn-primary">
                                        <span class="glyphicon glyphicon-search"></span>
                                            Search Restaurants
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyerHome;