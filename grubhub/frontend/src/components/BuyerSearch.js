import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import menuImage from '../images/menu_default_image.png'
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
            menuItem: props.match.params.menuItem,
            dropdown: false,
            cuisines: null,
            cuisineName: "",
            filteredCuisine: "",
            initialrestaurants: null
        }
        this.searchRestaurants = this.searchRestaurants.bind(this);
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
            this.state.menuItem = "";
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
                    restaurants: data.row,
                    initialrestaurants: data.row
                })
            })
            .catch(err => console.log(err));
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleEditChange = e => {
        this.state.restaurants = this.state.initialrestaurants;
        const filteredRestaurants = this.state.restaurants.filter(function (restaurant) {
            return restaurant.cuisine === e.target.value;
          });
        if (e.target.value === 'Select Cuisine') {
            this.setState({
                restaurants: this.state.initialrestaurants
            })
        } else {
            this.setState({
            restaurants: filteredRestaurants
        })
        }
        
    }

    render(){
        const isRestaurants = this.state.restaurants;
        const initialrestaurants = this.state.initialrestaurants;
        const result = [];
        const map = new Map();
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}

                <Navbar firstName = {this.state.firstName} />
                <div>
                <div className="container">
                    <div className="owner-order-list">
                        <div className="main-div">
                            <div className="panel">
                                <h4>Restaurants</h4>
                                <hr/>
                                <div class="col-md-12">
                                    <div class="col-md-6">
                                        <input type="search" className="input" size="75"  height="100%" name = "menuItem" onChange = {this.changeHandler} placeholder="Pizza, Sushi, Biryani..."/>
                                    </div>
                                    <div class="col-md-4">
                                        <button onClick = {this.searchRestaurants} className="btn btn-primary">Find Restaurants</button>
                                    </div>
                                    { initialrestaurants 
                                            ?
                                            this.state.initialrestaurants.map(restaurant => {
                                                if(!map.has(restaurant.cuisine)){
                                                    map.set(restaurant.cuisine, true);    // set any value to Map
                                                        result.push({
                                                            cuisine: restaurant.cuisine,
                                                            id: restaurant.id,
                                                            name: restaurant.name
                                                    });
                                                } 
                                            })
                                            : <tr>  </tr>
                                    }
                                    <div style = {{display:'flex'}}>
                                            <div class="form-group">
                                            <label>Filter:</label>
                                            <select style = {{display:'inline', width:'auto'}} class="form-control" name="orderStatus"
                                                onChange = {this.handleEditChange}>
                                                <option selected>Select Cuisine</option>
                                                { result
                                                    ?
                                                    result.map(cuisineData => {
                                                        return (
                                                            <option>{cuisineData.cuisine}</option>
                                                     )
                                                        })
                                                    :
                                                        <tr>  </tr>
                                                    }
                                            </select>
                                            </div>
                                    </div>
                                </div>

                                <div>
                                { isRestaurants 
                                            ?
                                            this.state.restaurants.map(restaurant => {
                                                return (
                                                    <div className="BuyerSearchList">
                                                        <Link to={`/buyer/place-order/${restaurant.id}`}>
                                                        <div> <img className="rounded float-left img-thumbnail" src = {menuImage} alt="Responsive image"></img>
                                                            {restaurant.name} {restaurant.city} {restaurant.stree} {restaurant.state}</div>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                            : <tr> NA </tr>
                                        }
                                </div>
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