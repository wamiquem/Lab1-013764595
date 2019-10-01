import React,{Component} from 'react';
import cookie from 'react-cookies';
import MenuAddForm from './MenuAddForm';
import MenusList from './MenusList';

class Menus extends Component {
    constructor(props){
        super(props);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            sections: []
        }
    }

    handleDelete = sectionId => {
        this.setState( state => {
            const sections = state.sections.filter(section => section.id != sectionId);
            return {
                sections
            };
        });
    };

    handleAdd = section =>{
        this.setState(state => ({
            sections: [...state.sections, section]
          }))
    }

    handleEditChange(id, name) {
        this.setState(state => {
            const sections = state.sections.map(section => {
                // Find a section with the matching id
                if(section.id == id){
                    //Return a new object
                    return{
                        ...section, //copy the existing section
                        name: name //replace the name with new name
                    }
                }
                // Leave every other section unchanged
                return section;
            });
            return {
                sections
            };
        });
    }
    
    componentDidMount(){
        if(cookie.load('cookie')){
            fetch('http://localhost:3101/restaurant/sections',{
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
    }

    render(){
        console.log("Section state = ", this.state)
        return(
            <div>
                <MenuAddForm onAdd = {this.handleAdd}/>
                <MenusList sections = {this.state.sections}
                onDelete = {this.handleDelete}
                onEditChange = {this.handleEditChange}/>
            </div>
            
        
        )
    }
}

export default Menus;