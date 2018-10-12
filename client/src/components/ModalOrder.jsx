import React, { Component } from 'react';
import './ModalOrder.css'
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

                <div className="col-12">
                    <div className="col-sm-6"><label>Coffee<p className="required">*</p></label></div>
                    <div className="col-sm-6"><label>Brew MethodCoffee<p className="required">*</p></label></div>
                </div>
                <div className="col-12">
                    <div className="col-sm-6">
                        <span className="custom-dropdown">
                            <select>
                                <option>Giant Steps</option>
                                <option>Bella Donovan</option>
                            </select>
                        </span>
                    </div>
                    <div className="col-sm-6">
                        <span className="custom-dropdown">
                            <select>
                                <option>Aeropress</option>
                                <option>Coffee Maker</option>
                                <option>Cold Brew</option>
                                <option>French Press</option>
                                <option>Pour Over</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className="col-12">
                    <div className="col-sm-6"><label>Ship Date<p className="required">*</p></label></div>
                    <div className="col-sm-3"><label>Number of Cases<p className="required">*</p></label></div>
                    <div className="col-sm-3"><label>Packets Per case<p className="required">*</p></label></div>
                </div>
                <div className="col-12">
                    <div className="col-sm-6">
                        <span className="custom-dropdown">
                            <select>
                                <option>Giant Steps</option>
                                <option>Bella Donovan</option>
                            </select>
                        </span>
                    </div>
                    <div className="col-sm-3">
                        <span className="custom-dropdown">
                            <select>
                                <option>Aeropress</option>
                                <option>Coffee Maker</option>
                                <option>Cold Brew</option>
                                <option>French Press</option>
                                <option>Pour Over</option>
                            </select>
                        </span>
                    </div>
                    <div className="col-sm-3">
                        <span className="custom-dropdown">
                            <select>
                                <option>25</option>
                                <option>50</option>
                            </select>
                        </span>
                    </div>
                </div>



            </div>
        )
    }
}

export default ModalOrder;

