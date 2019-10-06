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
                                    <div  class="col-md-4">
                                        <button className="buyerhomeButton">
                                            <Link to={`/buyer/search/${this.state.menuItem}`}>Search Restaurants</Link>
                                        </button>
                                    </div>
                                </div>
                    </div>
            </div>
        )
    }
}

export default BuyerHome;