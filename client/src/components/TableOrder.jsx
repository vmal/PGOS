import React, { Component } from 'react';
import './TableOrder.css';
import moment from 'moment';
import { FaSortAmountDown, FaEye } from "react-icons/fa";
import axios from 'axios';

class TableOrder extends Component{
    constructor()
    {
        super();
        this.renderList = this.renderList.bind(this);
        this.fetchFirst = this.fetchFirst.bind(this);
        this.state = {
            orders: []
        };
    }

    renderList(json){
        let allOrders = json.map((json,index)=>{
            let date = moment(json.shipDate).format('L');
            return(
                <tr key={index}>
                    <td><br/>{json.coffeeName}</td>
                    <td><br/>{json.brewMethod}</td>
                    <td><br/>{json.numberOfCases}</td>
                    <td><br/>{json.packetsPerCase}</td>
                    <td><br/>{date}{json.priority ? <p className="priority">★</p> : ""}</td>
                    <td className="orderNum"><br/>{json.orderId}</td>
                    <td className="viewOrder"><br/><FaEye/></td>
                </tr>
            )
        });

        return allOrders;
    }
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

    render(){
        let orderList = this.renderList(this.state.orders);
        return(
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
        )
    }
}

export default TableOrder;

