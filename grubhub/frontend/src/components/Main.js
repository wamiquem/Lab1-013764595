import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import BuyerLogin from './BuyerLogin';
import BuyerHome from './BuyerHome';
import BuyerSignup from './BuyerSignup';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" exact component={Landing}/>
                <Route path="/buyer/login" exact component={BuyerLogin}/>
                <Route path="/buyer/home" exact component={BuyerHome}/>
                <Route path="/buyer/signup" exact component={BuyerSignup}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;