import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Profile extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            message: ""
        }
    }
    
    //input change handler to update state variable with the text entered by the user
    handleChange(e) {
        this.props.onChange(e.target);
      }

      updateProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = this.props.buyerDetails;
        console.log(data)
        fetch('http://localhost:3101/buyer/updateProfile', {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
            res.text().then(data => {
                console.log(data);
                let responseMessage = JSON.parse(data).message;
                this.setState({
                    message: responseMessage
                })
            });
        })
        .catch(err => console.log(err));
    }

    render(){          
        return(
            <div>
                
                <div className="container">
                    
                    <div className="profile-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h2>Buyer Profile</h2>
                                <p>View or Update Profile</p>
                            </div>
                            <div className="form-group form-inline">
                                <label >First Name</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="fname" placeholder="First Name"
                                value = {this.props.buyerDetails.fname}/>
                            
                            </div>
                            <div className="form-group form-inline">
                                <label >Last Name</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="lname" placeholder="Last Name"
                                value = {this.props.buyerDetails.lname}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Phone</label>
                                <input onChange = {this.handleChange} 
                                type="number" className="form-control" name="phone" placeholder="Phone"
                                value = {this.props.buyerDetails.phone}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Street</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="street" placeholder="Street"
                                value = {this.props.buyerDetails.street}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Unit</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="unit" placeholder="Unit"
                                value = {this.props.buyerDetails.unit}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >City</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="city" placeholder="City"
                                value = {this.props.buyerDetails.city}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >State</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="state" placeholder="State"
                                value = {this.props.buyerDetails.state}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Zip</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="zip" placeholder="Zip"
                                value = {this.props.buyerDetails.zip}/>
                            </div>
                            <button onClick = {this.updateProfile} className="btn btn-primary">Update</button>                 
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default Profile;