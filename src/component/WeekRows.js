import React from "react";
import Day from "./Day";

class WeekRow extends React.Component {
  render() {
    let days = [];
    let { date, month, selected, selectFnc } = this.props;

    for (var i = 0; i < 7; i++) {
      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date
      };
      
    
      days.push(<Day day={day} selected={selected} selectFnc={selectFnc} key={i}/>);

      date = date.clone();
      date.add(1, "day");
    }

    return (
      <div className="week">
        {days}
      </div>
    );
  }
}

export default WeekRow;