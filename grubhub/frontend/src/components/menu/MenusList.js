import React,{Component} from 'react';
import Menu from './Menu';

class MenusList extends Component {
     constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        }
        
    handleDelete(sectionId){
        this.props.onDelete(sectionId);
    }

    handleEditChange(sectionId, sectionName){
        this.props.onEditChange(sectionId, sectionName);
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="sections-list">
                        <div className="main-div">
                            <div className="panel">
                                <h4>Sections</h4>
                                <hr/>
                                {
                                    this.props.sections.map(section => {
                                        return <Menu section = {section}
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