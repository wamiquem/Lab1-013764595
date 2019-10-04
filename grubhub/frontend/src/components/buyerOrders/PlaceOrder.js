import React,{Component} from 'react';
import Navbar from '../Navbar';
import { Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import Item from './Item'

class PlaceOrder extends Component {
     constructor(props){
        super(props);
        this.state = {
            sections: [],
            items: [],
            restId: props.match.params.restId
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        }
    
    componentDidMount(){
        // if(cookie.load('cookie')){
            fetch(`http://localhost:3101/restaurant/menuItems/${this.state.restId}`,{
                credentials: 'include'
                })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    items : this.state.items.concat(data.items)
                });
            })
            .catch(err => console.log(err));

            fetch(`http://localhost:3101/restaurant/sections/?restId=${this.state.restId}`,{
                credentials: 'include'
                })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    sections : this.state.sections.concat(data.sections)
                });
            })
            .catch(err => console.log(err));
    }

    handleDelete(menuId){
        this.props.onDelete(menuId);
    }

    handleEditChange(menuId, name, value){
        this.props.onEditChange(menuId, name, value);
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/buyer/login"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar/>
                    <div className="order-item-list">
                        <div className="main-div">
                            
                                <h4>Select Items</h4>
                                <hr/>
                                {
                                    this.state.sections.map(section => {
                                        return(
                                            <div>
                                                <label>{section.name}</label>
                                                <div style = {{display:'flex', flexWrap:'wrap'}}>
                                                {
                                                this.state.items.filter(item => item.section_id === section.id)
                                                .map(item => {
                                                    return <Item item = {item}/>
                                                })
                                                }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        
                    </div>
                </div>
            
            
        
        )
    }
}

export default PlaceOrder;