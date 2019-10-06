import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link} from 'react-router-dom';
import Navbar from '../Navbar';
import backendURL from '../../urlconfig';

class Checkout extends Component {
     constructor(props){
        super(props);
        this.state = {
            street: "",
            unit: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            message: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateBuyerDetails = this.updateBuyerDetails.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(cookie.load('cookie')){
            fetch(`${backendURL}/buyer/address`,{
                credentials: 'include'
             })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    street: data.buyerAddress.street,
                    unit: data.buyerAddress.unit_no,
                    city: data.buyerAddress.city,
                    state: data.buyerAddress.state,
                    zip: data.buyerAddress.zip_code,
                    phone: data.buyerAddress.phone
                });
            })
            .catch(err => console.log(err));
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    updateBuyerDetails = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = this.state;
        fetch(`${backendURL}/buyer/updateAddress`, {
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

    placeOrder = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            buyerAddress: `${this.state.unit}, ${this.state.street}, ${this.state.city}, ${this.state.state}, ${this.state.zip}`,
            restId: this.props.location.state.restId,
            items: this.props.location.state.items,
            totalPrice: this.props.location.totalPrice
        }
        fetch(`${backendURL}/restaurant/placeOrder`, {
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
    
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/buyer/login"/>
        }
        if(!this.props.location.state){
            redirectVar = <Redirect to= "/buyer/cart"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar/>
                <div className="container">
                    <div className="buyer-checkout">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h4>Checkout</h4>
                                <hr/>
                                <h4>Please review address and phone</h4>
                                <div style = {{display:'flex', flexWrap:'wrap'}}>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input type="text" className="form-control" name="street" placeholder="Street"
                                        onChange = {this.handleChange} value = {this.state.street}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input type="text" className="form-control" name="unit" placeholder="Unit"
                                        onChange = {this.handleChange} value = {this.state.unit}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input type="text" className="form-control" name="city" placeholder="City"
                                        onChange = {this.handleChange} value = {this.state.city}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input type="text" className="form-control" name="state" placeholder="State"
                                        onChange = {this.handleChange} value = {this.state.state}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input type="text" className="form-control" name="zip" placeholder="Zip"
                                        onChange = {this.handleChange} value = {this.state.zip}/>
                                    </div>
                                    <div className="form-group" style = {{paddingRight:'30px'}}>
                                        <input type="text" className="form-control" name="phone" placeholder="Phone"
                                        onChange = {this.handleChange} value = {this.state.zip}/>
                                    </div>
                                </div>
                                <button onClick = {this.updateBuyerDetails} className="btn btn-primary btn-sm">Update Address and Phone</button><hr/>
                                <button onClick = {this.placeOrder} className="btn btn-primary">Place Order</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;