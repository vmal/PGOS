import React, { Component } from 'react';
import moment from 'moment';
import './CurrentDate.css'

/*
This component gets the current date using the Moment JS library and then displays it in the heading of the page.
 */
class CurrentDate extends Component{

    constructor()
    {
        super();
        let today = moment() ;
        let currentMonth = today.format("MMM");
        let currentDate = today.format("D");
        console.log(currentDate,currentMonth);

        this.state = {
            currentMonth: currentMonth,
            currentDate: currentDate
        };
    }
    render(){
        return(
            <div>
                <div className="todaysDate">
                    <div className="box">
                    <p className="month">{this.state.currentMonth}</p>
                    <p className="dayOfMonth">{this.state.currentDate}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrentDate;

