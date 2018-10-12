import React, { Component } from 'react';
import './ModalOrder.css'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import CreateOrderButton from "./CreateOrderButton";

class ModalOrder extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            shipDate: moment(),
            coffeeName: "",
            brewMethod: "",
            numberOfCases: 0,
            packetsPerCase: 0,
            notes:"",
            priority: false
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);


    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleDateChange(date) {
        this.setState({
            shipDate: date
        });
    }

    render(){

        console.log(this.state);
        return(
            <div>
                <div className="col-12"><h3 className="font">Perfectly Ground Work Orders</h3></div>
                <div className="col-12"><p className="fontP">Instructional text would go here - Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
                    <br/>Nullam feugiat libero eget diam.</p></div>

                <form>
                    <div className="form-group col-md-6">
                        <label htmlFor="coffeeName">Coffee<p className="required">*</p></label>
                        <select name="coffeeName" className="form-control" value={this.state.coffeeName} onChange={evt=> this.handleInputChange(evt)}>
                            <option>Choose One</option>
                            <option>Giant Steps</option>
                            <option>Bella Donovan</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="brewMethod">Brew Method<p className="required">*</p></label>
                        <select name="brewMethod" className="form-control" value={this.state.brewMethod} onChange={evt=> this.handleInputChange(evt)}>
                            <option>Choose One</option>
                            <option>Aeropress</option>
                            <option>Coffee Maker</option>
                            <option>Cold Brew</option>
                            <option>French Press</option>
                            <option>Pour Over</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="shipDate">Ship Date<p className="required">*</p></label>
                            <DatePicker selected={this.state.shipDate} onChange={this.handleDateChange}  id="shipDate"/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="numberOfCases">Number Of Cases<p className="required">*</p></label>
                            <input type="text" className="form-control" name="numberOfCases" value={this.state.numberOfCases} onChange={evt=>this.handleInputChange(evt)}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="packetsPerCase">Packet Per Case<p className="required">*</p></label>
                            <select name="packetsPerCase" className="form-control" value={this.state.packetsPerCase} onChange={evt=>this.handleInputChange(evt)}>
                                <option>Choose One</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-md-6 notes">
                        <label htmlFor="notes">Notes</label>
                        <input type="text" className="form-control textbox" name="notes" value={this.state.notes} onChange={evt=>this.handleInputChange(evt)}/>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="priority" value={this.state.priority} onChange={evt=>this.handleInputChange(evt)}/>
                            <label className="form-check-label priority" htmlFor="priority">
                                Priority
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-6 notes">
                        <CreateOrderButton buttonName="SUBMIT WORK ORDER"/>
                    </div>

                </form>

            </div>
        )
    }
}

export default ModalOrder;

