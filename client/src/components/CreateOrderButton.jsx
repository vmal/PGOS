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
        return(
            <div>
                <button onClick={this.props.onClick} name="button" type="submit"
                        className="btn btn-primary createOrder">
                    {buttonName}
                </button>
            </div>
        )
    }
}

export default CreateOrderButton;

