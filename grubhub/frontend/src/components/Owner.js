import React from 'react';
import { Switch, Route ,Link} from 'react-router-dom';
import OwnerLogin from './OwnerLogin';
import OwnerHome from './OwnerHome';
import OwnerSignup from './OwnerSignup';
import OwnerAccount from './OwnerAccount';
import AddRestaurant from './AddRestaurant';
import Restaurant from './Restaurant';

const pages = ["login", "home", "signup", "account"]

class Owner extends React.Component{
    
    render(){
        let match = this.props.match
        console.log("Owner props= ", this.props);
        let pageId = match.params.id
        console.log(match)
        // return <div style={{display:"flex"}}>
        return (
        <div >
            {/* <div style={{
                border:"1px solid black",
                width: "100px",
                display: pageId === "login"?"none":"block"
            }}>
            
            {
                pages.map(page => {
                    return <div key={page} style={{color: page === pageId ? "blue":"black"}}>
                        <Link to={page}>{page}</Link>
                    </div>
                })
            }
            
            </div> */}
            <Switch>
                <Route path="/owner/login" component={OwnerLogin}/>
                <Route path="/owner/home" component={OwnerHome}/>
                <Route path="/owner/signup" component={OwnerSignup}/>
                <Route path="/owner/addRestaurant" component={AddRestaurant}/>
                {/* <Route path="/owner/account" component={OwnerAccount}/> */}
                <Route path="/owner/account/:id" component={OwnerAccount}/>
                <Route path="/owner/restaurant/:id" component={Restaurant}/>

                {/* <Route path = {match.url} component={OwnerLogin}/>
                <Route path = {match.url} component={OwnerHome}/>
                <Route path = {match.url} component={OwnerSignup}/>
                <Route path = {match.url} component={OwnerAccount}/> */}

            </Switch>
        </div>
        )
    }

}

export default Owner