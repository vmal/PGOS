import React, { Component } from 'react';
import './CreateOrderButton.css'
class CreateOrderButton extends Component{
    constructor()
    {
        super();
        this.state = {
        };
    }
    render(){
        let buttonName = this.props.buttonName;
        console.log(this.props.isView);
        return(
            <div>
                <button disabled={this.props.isView} onClick={this.props.onClick} name="button" type="submit"
                        className="btn btn-primary createOrder">
                    {buttonName}
                </button>
            </div>
        )
    }
}

export default CreateOrderButton;

