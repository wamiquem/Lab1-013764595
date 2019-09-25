import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem('userType');
    }

    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        let navAccount = null;
        if(cookie.load('cookie')){
            if(localStorage.getItem('userType') === 'buyer'){
                navAccount = <li><Link to="/buyer/account">Account</Link></li>;
            }else{
                navAccount = <li><Link to="/owner/account">Account</Link></li>;
            }
            console.log("Able to read cookie");
            navLogin = (
                // <ul class="nav navbar-nav navbar-right">
                //         <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                // </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hi,{this.props.firstName}!!! <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            {navAccount}
                            {/* <li><Link to="/buyer/account">Account</Link></li> */}
                            <li><Link to="/" onClick = {this.handleLogout}>Sign Out</Link></li>
                            {/* <li><a href="#">Something else here</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a href="#">Separated link</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a href="#">One more separated link</a></li> */}
                        </ul>
                    </li>
                </ul>
                
            );
        }
        
        return(
            <div>
            <nav className="navbar navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {/* <a class="navbar-brand" href="#">Book Store App</a> */}
                            <Link to="/" className="navbar-brand" style={{fontFamily: "Impact",color:"red", fontSize:'25px'} }>GRUBHUB</Link>
                        </div>
                        {navLogin}
                    </div>
                    
                </nav>
        </div>
        )
    }
}

export default Navbar;