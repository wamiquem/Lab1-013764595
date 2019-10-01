import React from 'react';
import { Switch, Route ,Link} from 'react-router-dom';
import BuyerLogin from './BuyerLogin';
import BuyerHome from './BuyerHome';
import BuyerSignup from './BuyerSignup';
import BuyerAccount from './BuyerAccount';

const pages = ["login", "home", "signup", "account"]

class Buyer extends React.Component{
    
    render(){
        let match = this.props.match
        console.log("Buyer props= ", this.props);
        let pageId = match.params.id
        console.log(match)
        return <div style={{display:"flex"}}>
            <div style={{
                border:"1px solid black",
                width: 100,
                display: pageId === "login"?"none":"block"
            }}>
            
            {
                pages.map(page => {
                    return <div key={page} >
                        <Link to={page} style={{color: page === pageId ? "blue":"red"}}>{page}</Link>
                    </div>
                })
            }
            
            </div>
            <Switch>
                {/* <Route path="/buyer"  exact component={BuyerLogin}/> */}
                <Route path="/buyer/login" component={BuyerLogin}/>
                <Route path="/buyer/home" component={BuyerHome}/>
                <Route path="/buyer/signup" component={BuyerSignup}/>
                <Route path="/buyer/account" component={BuyerAccount}/>
                {/* <Route path = {match.url} component={BuyerLogin}/>
                <Route path = {match.url} component={BuyerHome}/>
                <Route path = {match.url} component={BuyerSignup}/>
                <Route path = {match.url} component={BuyerAccount}/> */}
            </Switch>
        </div>
    }

}

export default Buyer