import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BuyerProfile from './BuyerProfile';

class BuyerAccount extends Component {

    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/buyer/login"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar/>
                <Sidebar user = {'buyer'} options = {['Profile', 'Past Orders', 'Upcoming Orders']} module = {'account'}/>
                <div >
                  <Switch>
                      <Route path="/buyer/account/profile" component={BuyerProfile}/>
                      {/* <Route path="/buyer/account/past-orders" component={Section}/>
                      <Route path="/buyer/account/upcoming-orders" component={Section}/> */}
                      {/* <Route path = {match.url} component={OwnerLogin}/>
                      <Route path = {match.url} component={OwnerHome}/>
                      <Route path = {match.url} component={OwnerSignup}/>
                      <Route path = {match.url} component={OwnerAccount}/> */}
                  </Switch>
                </div>
            </div>
        )
    }
}

export default BuyerAccount;