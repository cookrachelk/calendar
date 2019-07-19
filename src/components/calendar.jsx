import React from "react";
import moment from "moment";
import { Link } from 'react-router-dom'

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        data: null,
        prevMonth: null,
        nextMonth: null
    };

    componentDidMount() {
        this.setCurrentMonth(
            this.props.match.params.month,
            this.props.match.params.year
        );
        fetch(
            "https://gist.githubusercontent.com/dannycochran/697345c1f21aa8c40e6925f9a8c0e0b0/raw/a1c0ecf3813af6c19285160dcadde0a446a9bb65/events.json"
        )
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {moment(this.state.currentMonth).format(dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">
                        chevron_right
                    </div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = moment(this.state.currentMonth)
            .startOf("week")
            .format();

        for (let i = 0; i < 7; i++) {
            const day = moment(startDate)
                .add(i, "day")
                .format(dateFormat);
            days.push(
                <div className="col col-center" key={i}>
                    {day}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = moment(currentMonth).startOf("month").format();
        const monthEnd = moment(currentMonth).endOf("month").format();
        const startDate = moment(monthStart).startOf("week").format();
        const endDate = moment(monthEnd).endOf("week").format();

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = moment(day).format(dateFormat);

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = moment(day).format(dateFormat);
                const cloneDay = day;

                days.push(
                    <div
                        className={`col cell ${
                            !moment(day).isSame(monthStart, "month")
                                ? "disabled"
                                : moment(day).isSame(selectedDate, "day")
                                    ? "selected"
                                    : ""
                        }`}
                        key={day}
                        onClick={() => this.onDateClick(cloneDay)}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        <span className="release-title"></span>
                    </div>
                );
                day = moment(cloneDay).add(1, "days").format();
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: moment(this.state.currentMonth).add(1, "months"),
            nextMonth: moment(this.state.currentMonth).add(1, "months").format('YYYY/M')
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: moment(this.state.currentMonth).subtract(1, "months"),
            prevMonth:  moment(this.state.currentMonth).subtract(1, "months").format('YYYY/M')
        });
    };

    setCurrentMonth(month, year) {
        if (!year) {
            this.setState({
                currentMonth: new Date()
            });
        } else {
            let date = year + "/01/" + month;
            this.setState({
                currentMonth: moment(date).format()
            });
        }
    }

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calendar;
