import React, { Component } from 'react';
import './ModalOrder.css'
import 'react-datepicker/dist/react-datepicker.css';
import CreateOrderButton from "./CreateOrderButton";
import axios from "axios";
import moment from "moment";
/*
This Component deals with rendering a Modal view for either creating an order or view an order.
 */
class ModalOrder extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            shipDate: {},
            coffeeName: "",
            brewMethod: "",
            numberOfCases: "",
            packetsPerCase: "",
            notes:"",
            priority: false,
            isView: false
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNewOrder = this.createNewOrder.bind(this);
        this.renderView = this.renderView.bind(this);

    }

    // This handles the state change when the user is typing in the input box.
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //This handles the shipping date selected by the users
    handleDateChange = (e) => {
        this.setState({
            shipDate: e.target.value
        });
    };

    //Sends a post request to the server to create a new order.
    createNewOrder() {
        let data = {
            coffeeName: this.state.coffeeName,
            brewMethod: this.state.brewMethod,
            shipDate: this.state.shipDate,
            numberOfCases: this.state.numberOfCases,
            priority: this.state.priority,
            packetsPerCase: this.state.packetsPerCase,
            notes: this.state.notes
        };

        if (data.coffeeName !== "" && data.brewMethod !== "" && data.numberOfCases !== "" && data.shipDate !== "" && data.packetsPerCase !== "") {

            axios.post('http://localhost:4000/workorder/createorder', {data})
                .then(res => {
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    //This function is called when the modal is opened in Read only mode.
    renderView(isView,json){
        this.setState({
            isView: isView,
            shipDate: moment(json.shipDate).format("YYYY-MM-DD"),
            coffeeName: json.coffeeName,
            brewMethod: json.brewMethod,
            numberOfCases: json.numberOfCases,
            packetsPerCase: json.packetsPerCase,
            notes:json.notes,
            priority: json.priority
        })
    }

    //Decides whether the Modal is to opened in View only mode or not.
    componentDidMount()
    {
        let isView = this.props.isView;
        let json = this.props.sendJson;

        if(isView)
            this.renderView(isView,json);
    }

    render(){

        return(
            <div>
                <div className="col-12"><h3 className="font">Perfectly Ground Work Orders</h3></div>
                <div className="col-12"><p className="fontP">Instructional text would go here - Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
                    <br/>Nullam feugiat libero eget diam.</p></div>
                <div className="col-12">
                    <form>
                        <div className="form-group col-md-6">
                            <label htmlFor="coffeeName">Coffee<p className="required">*</p></label>
                            <select name="coffeeName" className="form-control" required value={this.state.coffeeName} onChange={evt=> this.handleInputChange(evt)} disabled={this.state.isView}>
                                <option value=''>Choose One</option>
                                <option value='Giant Steps'>Giant Steps</option>
                                <option value='Bella Donovan'>Bella Donovan</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="brewMethod">Brew Method<p className="required">*</p></label>
                            <select name="brewMethod" className="form-control" required value={this.state.brewMethod} onChange={evt=> this.handleInputChange(evt)} disabled={this.state.isView}>
                                <option value=''>Choose One</option>
                                <option value='Aeropress'>Aeropress</option>
                                <option value='Coffee Maker'>Coffee Maker</option>
                                <option value='Cold Brew'>Cold Brew</option>
                                <option value= 'French Press'>French Press</option>
                                <option value= 'Pour Over'>Pour Over</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="shipDate">Ship Date<p className="required">*</p></label>
                            <div className='input-group date' id='datetimepicker2'>
                                <input type="date" className="form-control" value={this.state.shipDate} disabled={this.state.isView} required selected={this.state.shipDate} onChange={this.handleDateChange.bind(this)}  id="shipDate"/>
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-calendar"/>
                                </span>
                            </div>
                        </div>
                        <div className="form-group adjLabel col-md-3">
                            <label htmlFor="numberOfCases">Number Of Cases<p className="required">*</p></label>
                            <input disabled={this.state.isView} type="number" min="0" required className="form-control" name="numberOfCases" value={this.state.numberOfCases} onChange={evt=>this.handleInputChange(evt)} placeholder="#"/>
                        </div>
                        <div className="form-group adjLabel col-md-3">
                            <label htmlFor="packetsPerCase">Packet Per Case<p className="required">*</p></label>
                            <select disabled={this.state.isView} name="packetsPerCase" className="form-control" required value={this.state.packetsPerCase} onChange={evt=>this.handleInputChange(evt)}>
                                <option value=''>Choose One</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6 notes">
                            <label htmlFor="notes">Notes</label>
                            <input disabled={this.state.isView} type="text" className="form-control textbox" name="notes" value={this.state.notes} onChange={evt=>this.handleInputChange(evt)}/>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="form-check">
                                <input disabled={this.state.isView} className="form-check-input" type="checkbox" name="priority" value={this.state.priority} onChange={evt=>this.handleInputChange(evt)}/>
                                <label className="form-check-label priorityCheck" htmlFor="priority">
                                    Priority
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-md-6 notes">
                            <CreateOrderButton isView={this.state.isView} buttonName="SUBMIT WORK ORDER" onClick={this.createNewOrder.bind(this)}/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default ModalOrder;

