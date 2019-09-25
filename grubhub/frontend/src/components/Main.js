import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import BuyerLogin from './BuyerLogin';
import BuyerHome from './BuyerHome';
import BuyerSignup from './BuyerSignup';
import BuyerAccount from './BuyerAccount';
import OwnerLogin from './OwnerLogin';
import OwnerHome from './OwnerHome';
import OwnerSignup from './OwnerSignup';
import OwnerAccount from './OwnerAccount';

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
                <Route path="/buyer/account" exact component={BuyerAccount}/>
                <Route path="/owner/login" exact component={OwnerLogin}/>
                <Route path="/owner/home" exact component={OwnerHome}/>
                <Route path="/owner/signup" exact component={OwnerSignup}/>
                <Route path="/owner/account" exact component={OwnerAccount}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;