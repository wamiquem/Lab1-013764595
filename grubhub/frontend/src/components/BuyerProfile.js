import React,{Component} from 'react';
import backendURL from '../urlconfig';

//create the Buyer Profile Component
class BuyerProfile extends Component {
    constructor(props){
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);

        this.state = {
            message: "",
            isEditable:false,
            isNewImage: false
        }
    }
    
    //input change handler to update state variable with the text entered by the user
    handleChange(e) {
        this.props.onChange(e.target);
    }

    editProfile = () => {
        this.setState({
            isEditable: true
        });
    }

    cancelEdit = () => {
        this.setState({
            isEditable: false
        });
    }

    handleFileUpload = (e) => {
        const fileField = document.querySelector('input[type="file"]');
        var output = document.getElementById('pic');
        output.src = URL.createObjectURL(fileField.files[0]);
        this.setState({
            isNewImage: true
        })
    }

    handleFileSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', document.querySelector('input[type="file"]').files[0]);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        
        fetch(`${backendURL}/upload/buyer-profile-image`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if(res.status === 200){
                res.text().then(data => {
                    console.log(data);
                    this.setState({
                        message: JSON.parse(data).message
                    })
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                });
            }
        })
        .catch(err => console.log(err));
    }

    updateProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = this.props.buyerDetails;
        fetch(`${backendURL}/buyer/updateProfile`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200){
                res.text().then(data => {
                    console.log(data);
                    this.setState({
                        message: JSON.parse(data).message,
                        isEditable: false
                    })
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                });
            }
        })
        .catch(err => console.log(err));
    }

    render(){        
        let imageEdit = null;
        let profileEdit = null;
        let profileUpdate = null;
        
        if(this.state.isEditable){
            imageEdit = (<div>
                <form>
                    <div class="form-group user-image">
                        <input className = "upload-image" type="file" id="upload" onChange= {this.handleFileUpload}/>
                        <button className = "btn btn-primary btn-sm" 
                        disabled={!this.state.isNewImage} type="submit" onClick={this.handleFileSubmit}>Change Pic
                        </button>
                    </div>
                </form>
            </div>);
            
            profileUpdate = (
                <div className = "btn-toolbar">
                    <button onClick = {this.updateProfile} className="btn btn-success">Update</button>
                    <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
                </div>
                
            );
        }else{
            profileEdit = (
                <div>
                    <button onClick = {this.editProfile} className="btn btn-primary">Edit</button>
                </div>
            );
        }
        
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
                            <div class = "profile-image">
                                <label>Image</label>
                                <img className="rounded float-left img-thumbnail" id="pic" 
                                src={this.props.buyerDetails.imgURL} alt="Responsive image"></img>
                            </div>
                            {imageEdit}
                            <div className="form-group form-inline">
                                <label >First Name</label>
                                <input disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="fname" placeholder="First Name"
                                value = {this.props.buyerDetails.fname}/>
                            
                            </div>
                            <div className="form-group form-inline">
                                <label >Last Name</label>
                                <input disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="lname" placeholder="Last Name"
                                value = {this.props.buyerDetails.lname}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Phone</label>
                                <input  disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" className="form-control" name="phone" placeholder="Phone"
                                value = {this.props.buyerDetails.phone}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Street</label>
                                <input disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="street" placeholder="Street"
                                value = {this.props.buyerDetails.street}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Unit</label>
                                <input disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="unit" placeholder="Unit"
                                value = {this.props.buyerDetails.unit}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >City</label>
                                <input disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="city" placeholder="City"
                                value = {this.props.buyerDetails.city}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >State</label>
                                <input disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="state" placeholder="State"
                                value = {this.props.buyerDetails.state}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Zip</label>
                                <input disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="zip" placeholder="Zip"
                                value = {this.props.buyerDetails.zip}/>
                            </div>
                                {profileUpdate}   
                                {profileEdit}          
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default BuyerProfile;