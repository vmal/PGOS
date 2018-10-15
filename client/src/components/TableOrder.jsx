import React, { Component } from 'react';
import './TableOrder.css';
import moment from 'moment';
import { FaSortAmountDown, FaEye } from "react-icons/fa";
import Pagination from "react-js-pagination";
import axios from 'axios';
/*
This component renders the table contents by fetching all the orders from the server and rendering them in the root view.
 */
class TableOrder extends Component{
    constructor()
    {
        super();
        this.renderList = this.renderList.bind(this);
        this.fetchFirst = this.fetchFirst.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.viewOrder = this.viewOrder.bind(this);
        this.state = {
            orders: [],
            activePage: 1
        };
    }

    //Loops through all the list and renders all the orders.
    renderList(json){
        let startIndex = (this.state.activePage - 1) * 25;
        let endIndex = this.state.activePage * 25;
        let allOrders = json.slice(startIndex,endIndex).map((json,index)=>{
            let date = moment(json.shipDate).format('L');
            return(
                <tr key={index} id={index+1}>
                    <td><br/>{json.coffeeName}</td>
                    <td><br/>{json.brewMethod}</td>
                    <td><br/>{json.numberOfCases}</td>
                    <td><br/>{json.packetsPerCase}</td>
                    <td><br/>{date}{json.priority ? <p className="priority">★</p> : ""}</td>
                    <td className="orderNum"><br/>{json.orderId}</td>
                    <td className="viewOrder" onClick={() => {this.viewOrder(json)}}><br/><FaEye/></td>
                </tr>
            )
        });

        return allOrders;
    }

    //function for handling the view only modal
    viewOrder(json){
        console.log(json);
        this.props.handlerFromParent(json);
    }

    //As the component is mounted, the first thing this component does is to get all the orders from the server.
    fetchFirst() {
        let that = this;
        axios.get('http://localhost:4000/workorder/getAllOrders')
            .then(function (response) {
                //console.log(response.data);
                let json = response.data;
                for(let i=0;i<json.length;i=i+1)
                {
                        that.setState({
                        orders: that.state.orders.concat([{
                            orderId: json[i].orderId,
                            coffeeName: json[i].coffeeName,
                            brewMethod: json[i].brewMethod,
                            shipDate: json[i].shipDate,
                            numberOfCases: json[i].numberOfCases,
                            priority: json[i].priority,
                            packetsPerCase: json[i].packetsPerCase,
                            notes: json[i].notes
                        }])
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchFirst();
    }

    //this function handles the pagination part of the all the orders.
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    render(){
        let orderList = this.renderList(this.state.orders);
        return(
            <div>
                <div className="orders">
                    <div className="ordersHeader col-12">
                        <div className="col-sm-1"><h5>ORDERS</h5></div>
                    </div>
                    <br/>
                    <hr className="gap"/>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>Coffee</td>
                            <td>Method</td>
                            <td>Number of Cases</td>
                            <td>Packets per Case</td>
                            <td>Ship Date<FaSortAmountDown className="sortIcon"/></td>
                            <td>Order</td>
                            <td>View</td>

                        </tr>
                        </thead>
                        <tbody className="bluehr">
                        {orderList}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={26}
                        totalItemsCount={this.state.orders.length}
                        pageRangeDisplayed={5}
                        prevPageText={"Prev"}
                        nextPageText={"Next"}
                        itemClassPrev={"prevButton"}
                        itemClassNext={"nextButton"}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>


        )
    }
}

export default TableOrder;

