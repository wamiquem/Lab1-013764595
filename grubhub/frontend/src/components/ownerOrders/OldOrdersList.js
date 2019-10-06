import React,{Component} from 'react';
import OldOrder from './OldOrder';

class OldOrdersList extends Component {
     constructor(props){
        super(props);
        }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="owner-order-list">
                        <div className="main-div">
                            <div className="panel">
                                <h4>Old Orders</h4>
                                <hr/>
                                {
                                    this.props.orders.map(order => {
                                        return <OldOrder order = {order}/>
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

export default OldOrdersList;