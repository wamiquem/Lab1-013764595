import React,{Component} from 'react';

class Item extends Component {
     constructor(props){
        super(props);

        this.state = {
            imgURL: "",
            message: "",
            cart: []

        }
        //Bind the handlers to this class
        // this.updateLocalStorage = this.updateLocalStorage.bind(this);
        // this.updateStatus = this.updateStatus.bind(this);
    }

    componentDidMount(){
        fetch(`http://localhost:3101/restaurant/menuImage/${this.props.item.id}`,{
                credentials: 'include'
            })
            .then(res => res.blob())
            .then(resAsBlob => {
                this.setState({
                    imgURL: URL.createObjectURL(resAsBlob)
                });
        })
    }

    // updateLocalStorage = e => {
    //     let selectedItem = {
    //         itemName: this.props.item.name,
    //         itemPrice: this.props.item.price,
    //         restId: this.props.item.rest_id
    //     }
    //     let cart = localStorage.getItem('cart');
    //     localStorage.setItem('cart',cart.concat(selectedItem));
    //     // sections : this.state.sections.concat(data.sections)
    // }

    render(){
        console.log(this.state)
        return(
                <div className="item-list-panel">
                    <div style = {{display:'flex'}}>
                        <div class="item-image">
                            <img class="rounded float-left img-thumbnail" id= {`item-pic-${this.props.item.id}`}
                            src= {this.state.imgURL} alt="Responsive image"/>
                        </div>
                        <div>
                            <label style = {{paddingLeft:'5px'}}>{this.props.item.name}</label>  
                            <p style = {{paddingLeft:'5px'}}>{this.props.item.description}</p>
                            <p style = {{paddingLeft:'5px'}}>{`$${this.props.item.price}`}</p>
                            <button style = {{paddingLeft:'5px'}}
                            onClick = {this.updateLocalStorage}
                            className="btn btn-primary btn-sm">Add to Cart</button>
                        </div> 
                    </div>
                </div>
        )
    }
}

export default Item;