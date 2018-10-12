{/*                <div className="col-12">
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
                </div>*/}


import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSortAmountDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
    constructor() {
        super()
        this.state = {
            coffee: "Bella Donovan",
            brewMethod: "Aeropress",
            numCases: "10",
            packPerCase: "25",
            notes: "",
            priority: false,
            todaysDate: moment(),
            shipDate: moment(),
            orders: [],
            orderId: "",
            activePage: 1,
            viewOrder: false,
            errors: {}
        }

        this.createOrder = this.createOrder.bind(this);
        this.restrictNumCases = this.restrictNumCases.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTodaysDate = this.getTodaysDate.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.viewOrder = this.viewOrder.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.newOrder = this.newOrder.bind(this);
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders() {
        $.ajax({
            url: '/work_orders',
            success: (data) => {
                this.setState({
                    orders: data
                })
            }
        })
    }

    restrictNumCases(e) {
        const value = e.target.value.replace(/[^\d]/, '');

        if (parseInt(value) !== 0) {
            this.setState({
                numCases: value
            });
        }
    }

    handleChange(e) {
        if (e == null) {
            return
        } else if (e._isAMomentObject) {
            this.setState({
                shipDate: e
            })
        } else {
            var value = e.currentTarget.type == "checkbox" ? e.currentTarget.checked : e.currentTarget.value;
            this.setState({
                [e.currentTarget.id]: value
            });
        }
    }

    validateInputs() {
        var shipDate = document.querySelectorAll('.react-datepicker-wrapper input')[0].value;
        var numCases = document.querySelectorAll('input[name="numCases"]')[0].value;
        var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
        var errors = {};

        if (!date_regex.test(shipDate)) { errors["shipDate"] = 'Please enter a valid date.' }
        if (numCases.length == 0) { errors["numCases"] = 'Please enter a number of cases.' }

        this.setState({
            errors: errors
        }, this.showErrors)

        return Object.keys(errors).length == 0 ? true : false
    }

    showErrors() {
        var errors = this.state.errors;
        $('.errors').remove();
        for (var key in errors) {
            $('.' + key + '-section').append('<p class="errors">' + errors[key] + '</p>')
        }
    }

    createOrder() {
        if (this.validateInputs()) {
            var formData = { work_order: {
                    "coffee": this.state.coffee,
                    "brew_method": this.state.brewMethod,
                    "ship_date": this.state.shipDate._d.toString(),
                    "number_of_cases": this.state.numCases,
                    "packets_per_case": this.state.packPerCase,
                    "notes": this.state.notes,
                    "priority": this.state.priority
                }
            }

            $.ajax({
                url: '/work_orders',
                method: 'POST',
                data: formData,
                success: () => {
                    $('.close').click();
                    this.getOrders();
                }
            })
        }
    }

    getTodaysDate() {
        var today = this.state.todaysDate;
        return (
            <div className="todaysDate">
                <p className="month">{today.format('MMM')}</p>
                <p className="dayOfMonth">{today.date()}</p>
            </div>
        )
    }

    formatDate(date) {
        var formatted = date.split('-')
        return formatted[1] + "/" + formatted[2] + "/" + formatted[0]
    }

    viewOrder(e) {
        var parentNode = e.currentTarget.parentNode;
        var columns = parentNode.children;

        var orderId = parentNode.dataset.orderId;
        var coffee = columns[0].innerText;
        var brewMethod = columns[1].innerText;
        var numCases = columns[2].innerText;
        var packPerCase = columns[3].innerText;
        var shipDateString = columns[4].innerText;
        var shipDate = moment(shipDateString.replace(/[^\x00-\x7F]/g, ""), "MM/DD/YYYY");
        var priority = shipDateString.indexOf('★') != -1;

        $.noConflict();
        this.setState({
            viewOrder: true,
            coffee: coffee,
            brewMethod: brewMethod,
            numCases: numCases,
            packPerCase: packPerCase,
            shipDate: shipDate,
            priority: priority,
            orderId: orderId
        })

        $('.modal').modal('show');
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        });
    }

    newOrder() {
        this.setState({
            coffee: "Bella Donovan",
            brewMethod: "Aeropress",
            numCases: "10",
            packPerCase: "25",
            notes: "",
            priority: false,
            shipDate: moment(),
            orderId: "",
            viewOrder: false
        })
    }

    render() {
        var orders = this.state.orders.map( order => <tr key={order.id} data-order-id={order.id}>
                <th id={"coffee-order-" + order.id}>{order.coffee}</th>
                <th id={"method-order-" + order.id}>{order.method}</th>
                <th id={"numCases-order-" + order.id}>{order.number_of_cases}</th>
                <th id={"packPerCase-order-" + order.id}>{order.packets_per_case}</th>
                <th id={"shipDate-order-" + order.id}>{this.formatDate(order.ship_date)}{order.priority ? <p className="priority">★</p> : ""}</th>
                <th onClick={this.viewOrder} className="orderNum">#{order.id}</th>
                <th onClick={this.viewOrder} className="viewOrder"><FontAwesomeIcon icon={faEye} /></th>
            </tr>
        );

        var page = orders.slice( (this.state.activePage - 1) * 25, ((this.state.activePage - 1 )* 25) + 25)

        var orderInfo = [<div key="1">
            {this.state.orderId}
        </div>]

        return (
            <div className="app">

                <div className="logo">
                    <div className="logo">
                        <svg width="196" height="29" className="dib v-mid" viewBox="0 0 196 29" xmlns="http://www.w3.org/2000/svg"><title>Blue Bottle Coffee Logo</title><g fill="none" fillRule="evenodd"><g fill="#00A1DF"><path d="M5.136 1.403l.384.047.096.234c.864.047 1.776-.187 1.776-.187.096-.094.336-.374.096-.515-.96.187-2.352-.14-2.16-.047-.192-.046-.432-.187-.672-.42-.432-.702-.672-.234-.672 0-.048.841.192.795 1.152.888zM11.76 13.144a6.556 6.556 0 0 0-.192-1.03c-.48-1.543-1.056-3.18-2.64-3.882-.672-.234-1.92-.187-2.112-1.73V1.87l-2.016.42v.282l-.048.888v.936c.048 2.385.192 3.882-2.496 4.864-1.632.608-1.728 1.31-1.92 3.134 0 .14-.048.28-.048.374 0-.046-.528 5.146 1.248 13.378 0 0 .288 1.356.288 1.543 0 .094.144.234.384.421 3.024.702 3.696.187 5.28.421 1.632.187 3.072-.795 3.072-.842.144-.046.672-1.122.768-2.432.72-3.602.576-9.355.432-12.114z"></path></g><text x="21" y="18" fill="#555" style={{fontSize: "14px", fontWeight: "600", letterSpacing: "1.6px"}} textLength="175">BLUE BOTTLE COFFEE</text></g></svg>
                    </div>
                </div>

                <div className="header">
                    <div className="date">{this.getTodaysDate()}</div>
                    <div className="headerTitle">
                        <h1>Perfectly Ground Work Orders</h1>
                    </div>
                    <div className="createOrder">
                        <button type="button" onClick={this.newOrder} className="btn btn-primary createOrder" data-toggle="modal" data-target="#exampleModal">
                            CREATE ORDER
                        </button>
                    </div>
                </div>

                <div className="orders">
                    <div className="ordersHeader">
                        <h5>ORDERS</h5>
                        <hr/>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Coffee</th>
                            <th>Method</th>
                            <th>Number of Cases</th>
                            <th>Packets per Case</th>
                            <th>Ship Date<FontAwesomeIcon className="sortIcon" icon={faSortAmountDown} /></th>
                            <th>Order</th>
                            <th>View</th>
                        </tr>
                        </thead>
                        <tbody>
                        {page}
                        </tbody>
                    </table>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title">
                                    <h5>Perfectly Ground Work Orders</h5>
                                    <h6>Instructional text would go here - Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat libero eget diam.</h6>
                                </div>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="container">
                                    <div className="row">
                                        <div className="col-6 coffee-section">
                                            <label htmlFor="coffee">Coffee<p className="required">*</p></label>
                                            <select className="form-control" id="coffee" onChange={this.handleChange} value={this.state.coffee} disabled={this.state.viewOrder}>
                                                <option>Bella Donovan</option>
                                                <option>Giant Steps</option>
                                            </select>
                                        </div>
                                        <div className="col-6 method-section">
                                            <label htmlFor="brewMethod">Brew Method<p className="required">*</p></label>
                                            <select className="form-control" id="brewMethod" onChange={this.handleChange} value={this.state.brewMethod} disabled={this.state.viewOrder}>
                                                <option>Aeropress</option>
                                                <option>Coffee Maker</option>
                                                <option>Cold Brew</option>
                                                <option>French Press</option>
                                                <option>Pour Over</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 shipDate-section">
                                            <label htmlFor="shipdate">Ship Date<p className="required">*</p></label>
                                            {/* <input type="text" name="shipdate" className="form-control"/> */}
                                            <DatePicker selected={this.state.shipDate} onChange={this.handleChange} onKeydDown={this.handleChange} className="form-control" disabled={this.state.viewOrder} />
                                        </div>
                                        <div className="col-3 numCases-section">
                                            <label htmlFor="numCases">Number of Cases<p className="required">*</p></label>
                                            <input type="text" name="numCases" className="form-control" onChange={this.restrictNumCases} value={this.state.numCases} disabled={this.state.viewOrder}/>
                                        </div>
                                        <div className="col-3 packPerCase-section">
                                            <label htmlFor="packPerCase">Packets per Case<p className="required">*</p></label>
                                            <select className="form-control" id="packPerCase" onChange={this.handleChange} value={this.state.packPerCase} disabled={this.state.viewOrder}>
                                                <option>25</option>
                                                <option>50</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 notes-section">
                                            <label htmlFor="notes">Notes</label>
                                            <input type="text" id="notes" className="form-control" onChange={this.handleChange} value={this.state.notes} disabled={this.state.viewOrder}/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="priority" onChange={this.handleChange} checked={this.state.priority} disabled={this.state.viewOrder}/>
                                                <label className="form-check-label" htmlFor="priority">
                                                    Priority
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                {this.state.viewOrder ? ""
                                    :
                                    <button type="button" className="btn btn-primary submitWorkOrder" onClick={this.createOrder}>SUBMIT WORK ORDER</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={25}
                    totalItemsCount={this.state.orders.length}
                    pageRangeDisplayed={5}
                    prevPageText={"Prev"}
                    nextPageText={"Next"}
                    itemClassPrev={"prevButton"}
                    itemClassNext={"nextButton"}
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}

export default App;
