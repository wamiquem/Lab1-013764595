import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import backendURL from '../urlconfig';

//create the Navbar Component
class BuyerSearch extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            restaurants: null,
            menuItem: props.match.params.menuItem
        }
        this.searchRestaurants = this.searchRestaurants.bind(this);
        this.filterRestaurants = this.filterRestaurants.bind(this);
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
            this.searchRestaurants();
        }
    }
    
    searchRestaurants(){
        fetch(`${backendURL}/buyer/searchRestaurants/?menuItem=${this.state.menuItem}`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    restaurants: data.row
                })
            })
            .catch(err => console.log(err));
    }

    filterRestaurants(){
        fetch(`${backendURL}/buyer/filterRestaurants`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    restaurants: data.row
                })
            })
            .catch(err => console.log(err));
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
                {/* <Navbar firstName = {"test"} /> */}

                <div className="container">
                    <div className="add-section-form">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h4>Search Page</h4>
                                <hr/>
                                <div>
                                    <button onClick = {this.searchRestaurants} className="btn btn-primary">Find Restaurants                
                                        {/* <Link to="/buyer/search">Search Restaurants</Link> */}
                                    </button> 
                                </div>
                                <div>
                                <button onClick = {this.filterRestaurants} className="btn btn-primary">Filter Restaurants                
                                    </button> 
                                </div>
                                {/* <li> Name of the restaruant :  {this.state.restaurantName} </li> */}
                                <div>
                                    <table  style= {{border: 10, width:500}}>
                                        <thead>
                                            <th>Name</th>
                                            <th>City</th>
                                            <th>Street</th>
                                            <th>State</th>
                                        </thead>
                                        <tbody>
                                        { isRestaurants 
                                            ?
                                            this.state.restaurants.map(restaurant => {
                                                return (
                                                    <tr>
                                                    <td>{restaurant.name}</td>
                                                    <td>{restaurant.city}</td>
                                                    <td>{restaurant.street}</td>
                                                    <td><Link to={`/buyer/place-order/${restaurant.id}`}>{restaurant.id}</Link></td>
                                                    </tr>
                                                )
                                            })
                                            : <tr> NA </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyerSearch;