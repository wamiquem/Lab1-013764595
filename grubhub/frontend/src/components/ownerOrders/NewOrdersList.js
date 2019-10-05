import React,{Component} from 'react';
import Order from './Order';

class NewOrdersList extends Component {
     constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        }
        
    handleDelete(menuId){
        this.props.onDelete(menuId);
    }

    handleEditChange(orderId, name, value){
        this.props.onEditChange(orderId, name, value);
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="owner-order-list">
                        <div className="main-div">
                            <div className="panel">
                                <h4>New Orders</h4>
                                <hr/>
                                {
                                    this.props.orders.map(order => {
                                        return <Order order = {order} onEditChange = {this.handleEditChange}/>
                                    })

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewOrdersList;