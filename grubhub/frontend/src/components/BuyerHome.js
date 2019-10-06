import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import burger from '../images/main_page_burger.jpg'
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
                 <div className="container">
                                <img width = '100%' height = '10%' src={burger} alt="Responsive image"/>
                                <div className="buyer-home">
                                    <div class="col-md-12"><h4>Home Page - Who Deliver in your neighbourhood?</h4></div>
                                    <div class="col-md-8">
                                    <input type="text" className="input" size="100"  name = "menuItem"
                                    onChange = {this.changeHandler} placeholder="Pizza, Sushi, Biryani..." />
                                    </div>
                                    {/* {/<button onClick = {this.getRestaurants} className="btn btn-primary">Find Restaurants</button>/} */}
                                    <div  class="col-md-4"><button className="buyerhomeButton"><Link to={`/buyer/search/${this.state.menuItem}`}>Search Restaurants</Link></button></div>
                                </div>
                        {/* <div className="main-div-buyer-home">
                            <div>
                                <div><h4>Home Page - Who Deliver in your neighbourhood?</h4></div>
                                <img width = '100%' height = '10%' src={burger} alt="Responsive image"></img>
                                <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h4>Home Page - Who Deliver in your neighbourhood?</h4>
                                <div className="buyer-home">
                                    <input type="text" className="input" name = "menuItem"
                                    onChange = {this.changeHandler} placeholder="Pizza, Sushi, Biryani..." />
                                    <button onClick = {this.getRestaurants} className="btn btn-primary">Find Restaurants</button>
                                    <button><Link to={`/buyer/search/${this.state.menuItem}`}>Search Restaurants</Link></button>
                                </div>
                            </div>
                                <li> Name of the restaruant :  {this.state.restaurantName} </li>
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
                                                    <td>{restaurant.state}</td>
                                                    </tr>
                                                )
                                            })
                                            : <tr> </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                    </div>
            </div>
        )
    }
}

export default BuyerHome;