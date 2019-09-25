import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class OwnerProfile extends Component {
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
        const data = this.props.ownerDetails;
        console.log(data)
        fetch('http://localhost:3101/owner/updateProfile', {
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
                                <h2>Owner Profile</h2>
                                <p>View or Update Profile</p>
                            </div>
                            <div className="form-group form-inline">
                                <label >First Name</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="fname" placeholder="First Name"
                                value = {this.props.ownerDetails.fname}/>
                            
                            </div>
                            <div className="form-group form-inline">
                                <label >Last Name</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="lname" placeholder="Last Name"
                                value = {this.props.ownerDetails.lname}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Phone</label>
                                <input onChange = {this.handleChange} 
                                type="number" className="form-control" name="phone" placeholder="Phone"
                                value = {this.props.ownerDetails.phone}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Restaurant Name</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="restName" placeholder="Restaurant Name"
                                value = {this.props.ownerDetails.restName}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Restaurant Zip</label>
                                <input onChange = {this.handleChange} 
                                type="text" className="form-control" name="restZip" placeholder="Restaurant Zip"
                                value = {this.props.ownerDetails.restZip}/>
                            </div>
                            <button onClick = {this.updateProfile} className="btn btn-primary">Update</button>                 
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default OwnerProfile;