import React from "react";
import styled, {css} from 'styled-components'
import moment from "moment";
import TimeField from "react-simple-timefield";
import { RadioSelect } from "./RadioSelect.js"

const days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export class Day extends React.Component {
  render() {
    const {
      day,
      day: { date, isCurrentMonth, isToday, number },
      selectFnc,
      selected,
    } = this.props;

    return (
        <DayContainer
            id={number}
            onClick={() => selectFnc(day)}
            className={"day-container" + (isToday ? " current-day" : "") + (isCurrentMonth ? "" : " disabled") + (!isToday && selected ? ' selected' : '') }
        >
            <span
                key={date.toString()}
                className='day-number'
            >
                {number}
            </span>

            {isCurrentMonth && <span className="price">$0</span>}
        </DayContainer>
    );
  }
}

export const Week = styled.div`
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    text-align: center;
`


export class WeekRow extends React.Component {
  render() {
    let days = [];
    let { date, month, selected, selectFnc } = this.props;

    for (var i = 0; i < 7; i++) {
      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        month: date.month()
      };
    
      days.push(<Day day={day} selected={selected.number === day.number && selected.month === day.month ? true : false} selectFnc={selectFnc} key={i}/>);

      date = date.clone();
      date.add(1, "day");
    }

    return (
        <Week>
            {days}
        </Week>
    );
  }
}


class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment(),
      openModal: false,
      datePicked: "",
      hourSelected: 9,
      form: {
        eventName: "",
        date: this.datePicked,
        eventTime: ""
      },
      selectedTimeSlotIndex: this.props.showTimeslot ? 0 : undefined,
      deliveryDate: moment(new Date(), "day").startOf('hour').hour(9),
      showCustomTime: false,
      customTme: ''
	};
	
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
    this.changeTimeSlot = this.changeTimeSlot.bind(this)
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  select(day) {
    this.setState({ datePicked: day, deliveryDate: moment(day.date).startOf("day").add(this.state.hourSelected, 'h')}, () => {
      this.props.setDeliveryDateForm(this.state.deliveryDate, this.props.id)
    });
    this.onOpenModal();
  }

  previous() {
    var month = this.state.month;
    month.add(-1, "M");
    this.setState({ month: month });
  }

  next() {
    var month = this.state.month;
    month.add(1, "M");
    this.setState({ month: month });
  }

  weeks() {
	// const events = this.props.events;
    let startDate = this.state.month
      .clone()
      .startOf("month")
      .day("Sunday");
    let rows = [];

    for (let index = 0; index < 5; index++) {
      rows.push(
        <WeekRow
          key={startDate}
          date={startDate.clone()}
          month={this.state.month}
          selectFnc={day => this.select(day)}
		      selected={this.state.datePicked}
		      events={this.props}
        />
      );

      startDate.add(1, "w");
    }
    return rows;
  }

  handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    this.setState({
      form: Object.assign({}, this.state.form, {
        [name]: value
      })
    });
  }

  onTimeChange(value) {
    this.setState({
      form: Object.assign({}, this.state.form, {
        eventTime: value
      })
    });
  }

  changeTimeSlot = (e, i) => {
		e.preventDefault()
    this.setState({ selectedTimeSlotIndex: i, hourSelected: this.props.timeslot[i].value })
    const time = this.state.datePicked;
    this.setState({
      deliveryDate: moment(time.date).startOf("day").add(this.props.timeslot[i].value, 'h')
    }, () => {
      this.props.setDeliveryDateForm(this.state.deliveryDate, this.props.id)
    })

    if(this.props.timeslot[i].label == 'Custom Time') {
      this.setState({showCustomTime: true})
    } else {
      this.setState({showCustomTime: false})
    }
  }

  componentDidMount() {
    this.props.setDeliveryDateForm(this.state.deliveryDate, this.props.id)
  }

  render() {
    return (
      <React.Fragment>
        {/* <Modal open={this.state.openModal} onClose={this.onCloseModal} center>
          <h2>Add new event</h2>
          <form action="" id="eventform">
            <div className="input-item">
              <h3>
                <label htmlFor="eventName">Event Name</label>
              </h3>
              <TextInput
                className={"form-control__default d-block w-100"}
                name={"eventName"}
                type={"text"}
                placeholder={"Event Name"}
                value={this.state.form.eventName}
                change={this.handleInputChange}
                blur={this.validationHandle}
                maxLength={"20"}
              />
            </div>

            <div className="input-item input-time">
              <h3>
                <label htmlFor="eventTime">Event Time</label>
              </h3>
              <div>
                <TimeField
                  value={this.state.form.eventTime}
                  onChange={this.onTimeChange}
                />
              </div>
            </div>
          </form>
          <button className={this.state.form.eventName === '' || this.state.form.eventTime === '' ? 'btn btn-add disabled' : "btn btn-add"} onClick={() => this.addEvent(this.state.form)} disabled={this.state.form.eventName === '' || this.state.form.eventTime === '' ? true : false}>
            Add Event
          </button>
        </Modal> */}

        <DatePicker>
          <DatePickerHeader>
            <div className="title">
                <ArrowButton onClick={this.previous}>
                    <img src="images/ico-left-arrow.svg" alt=""/>
                </ArrowButton>

                <Text color="#E61D6E">
                    <span className="month">{this.state.month.format("MMMM")}</span>
                    <span>{this.state.month.format("YYYY")}</span>
                </Text>
                
                <ArrowButton onClick={this.next}>
                    <img src="images/ico-right-arrow.svg" alt=""/>
                </ArrowButton>
            </div>
            
            <DayList>
              {days.map(day => (
                <h5 key={day}> {day} </h5>
              ))}
            </DayList>
          </DatePickerHeader>
          {/* <WeekRow /> */}
          {this.weeks()}
        </DatePicker>

        {!!this.props.showTimeslot && 
        <TimeSlotWrapper>
          <RadioSelect
            value={this.state.selectedTimeSlotIndex}
            onChange={this.changeTimeSlot}
            options={this.props.timeslot}

          />
        </TimeSlotWrapper>
        }
        
        {this.state.showCustomTime &&
          // <TimeField
          //   value={this.state.customTme}
          //   onChange={this.onTimeChange}
          // />
          <h1>customPicker Here</h1>
        }
       
      </React.Fragment>
    );
  }
}

export  default CustomDatePicker;

const TimeSlotWrapper = styled.div`
	margin: 0.5rem 0rem;
`

export const Text = styled.div`
	max-width: ${props => (props.width ? props.width : '60rem')};
	font-size: 1.5rem;
	line-height: 1.5rem;
	white-space: pre-line;
	color: ${props => (props.color ? props.color : '#888')};
	text-align: ${props => props.align};
	font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
	@media (max-width: 1024px) {
		font-size: 0.95rem;
		line-height: 1.3rem;
	}
	@media (max-width: 768px) {
		font-size: 0.9rem;
		line-height: 1.2rem;
	}
  ${({ z }) => (z ? 'z-index: ' + z : '')}
  
  .month {
      font-weight: bold;
      margin-right: 20px;
  }
`

export const DatePicker = styled.section`
  border-bottom: 0.25px solid #9D9D9D;
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 1.5rem;
`

export const DatePickerHeader = styled.div`
  .title {
    align-items: center;
    display: flex;
    justify-content: space-between;
    font-weight: lighter;
  }
`

export const DayContainer = styled.div`
  border: none;
  font-size: 1.3rem;
  padding: 1rem 0;
  overflow-y: auto;
  width: calc(18% - .8rem);

  .day-number {
      color: #424242;
      cursor: pointer;

      width: 40px;
  margin: 0 auto;
  padding: 0.5rem;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  &.disabled {  
    .day-number {
        color: #979797;
    }
  }
  
  &.current-day {
      .day-number {
          border-radius: 100%;
          background-color: #E61D6E;
          color: white;
          padding: 12px;
      }
  }

  &.selected {
    .day-number {
      background-color: transaparent;
      border: 0.5px solid #C4C4C4;
      border-radius: 100%;
      color: #979797;
      padding: 0.5rem 17px;
    }
  }
  
  .price {
      display: block;
      font-size: 0.8rem;
      padding-top: 12px;
  }
`


export const DayList = styled.div`
  color: #E61D6E;
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 20px 0;

  p {
      font-weight: lighter;
      margin: 0;
  }

  h5 {
      font-size: 1rem;
      font-weight: lighter;
      width: calc(14.5% - .8rem);
  }
`

export const Timespot = styled.div`
`

export const ArrowButton = styled.div`
  background: none;
  border: none;
  img {
      height: 42.71px;
      width: 24px;
  }
`