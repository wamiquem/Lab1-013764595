import React from 'react';
import { Switch, Route ,Link} from 'react-router-dom';
import BuyerLogin from './BuyerLogin';
import BuyerHome from './BuyerHome';
import BuyerSignup from './BuyerSignup';
import BuyerAccount from './BuyerAccount';
import PlaceOrder from './buyerOrders/PlaceOrder';

const pages = ["login", "home", "signup", "account"]

class Buyer extends React.Component{
    
    render(){
        return(
            <div>
                <Switch>
                    {/* <Route path="/buyer"  exact component={BuyerLogin}/> */}
                    <Route path="/buyer/login" component={BuyerLogin}/>
                    <Route path="/buyer/home" component={BuyerHome}/>
                    <Route path="/buyer/signup" component={BuyerSignup}/>
                    <Route path="/buyer/account" component={BuyerAccount}/>
                    <Route path="/buyer/place-order/:restId" component={PlaceOrder}/>
                    {/* <Route path = {match.url} component={BuyerLogin}/>
                    <Route path = {match.url} component={BuyerHome}/>
                    <Route path = {match.url} component={BuyerSignup}/>
                    <Route path = {match.url} component={BuyerAccount}/> */}
                </Switch>
            </div>
            )
    }

}

export default Buyer