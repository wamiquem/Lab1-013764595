import React,{Component} from 'react';
import backendURL from '../../urlconfig';

class OldOrder extends Component {
     constructor(props){
        super(props);

        this.state = {
            menuItems: []
        }
    }

    componentDidMount(){
        fetch(`${backendURL}/restaurant/orderedItems/${this.props.order.orderId}`,{
                credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                menuItems: data.menuItems
            })
        })
        .catch(err => console.log(err));
    }

    render(){
        console.log(this.state)
        let itemDetails = this.state.menuItems.map(item => {
            return(
                <div style = {{display:'flex'}}>
                    <label>Menu Item:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.name}</h7>
                    <label style = {{paddingLeft:'25px'}}>Quanity:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.quantity}</h7>
                    <label style = {{paddingLeft:'25px'}}>Price:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.price}</h7>
                </div>
            );
        });
        return(
            <div>
                <h2 style= {{color:"red"}}>{this.state.message}</h2>
                <label style = {{fontSize:'17px'}}>Order# {this.props.order.orderId}</label>
                <h5 style = {{textDecoration:'underline'}}>Buyer Details</h5>
                <div style = {{display:'flex'}}>
                    <label>Buyer Name:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.buyerName}</h7>
                    <label style = {{paddingLeft:'25px'}}>Buyer Address:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.buyerAddress}</h7>
                </div>
                <h5 style = {{textDecoration:'underline'}}>Order Details</h5>
                {itemDetails}
                <div style = {{display:'flex'}}>
                    <label>Total Price:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.orderPrice}</h7>
                </div>
                <div style = {{display:'flex'}}>
                    <label>Order Status:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.orderStatus}</h7>
                </div>
                {/* <div style = {{display:'flex'}}>
                    <div class="form-group">
                        <label>Status:</label>
                        <select style = {{display:'inline', width:'auto'}} class="form-control" name="orderStatus"
                        onChange = {this.handleEditChange}>
                            <option selected>Select Status</option>
                            {statuses.map( status => {
                                if(status === this.props.order.orderStatus){
                                    return <option selected>{status}</option> ;
                                } else {
                                    return <option>{status}</option> ;
                                }
                            }
                            
                            )}
                        </select>
                    </div>
                    <button onClick = {this.updateStatus}
                    className="btn btn-primary btn-status-change">Change Status</button> */}
                {/* </div> */}
                
                <hr/>
            </div>
        )
    }
}

export default OldOrder;