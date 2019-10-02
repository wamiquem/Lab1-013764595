import React,{Component} from 'react';
import Menu from './Menu';

class MenusList extends Component {
     constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        }
        
    handleDelete(menuId){
        this.props.onDelete(menuId);
    }

    handleEditChange(menuId, name, value){
        this.props.onEditChange(menuId, name, value);
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="menus-list">
                        <div className="main-div">
                            <div className="panel">
                                <h4>Menus</h4>
                                <hr/>
                                {
                                    this.props.menus.map(menu => {
                                        return <Menu menu = {menu} sections = {this.props.sections}
                                        onDelete = {this.handleDelete}
                                        onEditChange = {this.handleEditChange}/>
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

export default MenusList;