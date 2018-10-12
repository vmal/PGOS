import React, { Component } from 'react';
import './CreateOrderButton.css'
class ModalOrder extends Component{
    constructor()
    {
        super();
        this.state = {
        };
    }

    render(){
        return(
            <div>
                <div className="col-12"><h3 className="font">Perfectly Ground Work Orders</h3></div>
                <div className="col-12"><p className="fontP">Instructional text would go here - Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
                    <br/>Nullam feugiat libero eget diam.</p></div>

            </div>
        )
    }
}

export default ModalOrder;

