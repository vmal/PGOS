import React, { Component } from 'react';
import './CreateOrderButton.css'

/*
This is a Button Component which can be used for Submitting Order or Opening a Modal.
 */
class CreateOrderButton extends Component{

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

