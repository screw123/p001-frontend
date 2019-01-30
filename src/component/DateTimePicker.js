import React from "react"
import moment from "moment"
import styled from "styled-components"
import { Grid, defaultCellRangeRenderer } from "react-virtualized"
import { Section } from "./BasicComponents"
import { RadioSelect } from "./RadioSelect.js"
import { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js"

const firstDay = moment()
  .date(1)
  .day(0)
  .startOf("date")
const w = 31,
  h = 45

const DatePickerWrapper = styled.div`
  width: ${w * 7 + 18}px;
  overflow: hidden;
  position: relative;
`

export class DateTimePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedTimeSlotIndex: this.props.showTimeslot ? 0 : undefined }
    this.changeDay = this.changeDay.bind(this)
    this.changeTimeSlot = this.changeTimeSlot.bind(this)
  }

  /*   autoScrollOnce = top => {
    // This function will auto scroll to current date at first
    // Then it will do nothing when called
    if (document.getElementById("calGrid")) {
      document.getElementById("calGrid").scrollTo({ top: top, behavior: "smooth" })
      this.autoScrollOnce = function() {}
    }
  } */

  scrollByKey(event) {
    // console.log(event.keyCode)
    if (event.keyCode === 38) {
      document.getElementById("calGrid").scrollTop -= 25
    } else if (event.keyCode === 40) {
      document.getElementById("calGrid").scrollTop += 25
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.scrollByKey, false)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.scrollByKey, false)
  }

  changeDay = (e, d) => {
    e.preventDefault()
    this.props.onChange(d.add(this.props.timeslot[this.state.selectedTimeSlotIndex].value, "h"))
  }

  changeTimeSlot = (e, i) => {
    e.preventDefault()
    this.setState({ selectedTimeSlotIndex: i })
    this.props.onChange(
      moment(this.props.selectedDate)
        .startOf("day")
        .add(this.props.timeslot[i].value, "h")
    )
  }

  render() {
    const c = this.props.i18n
    return (
      <LocaleApiSubscriber>
        {c => (
          <DatePickerWrapper>
            <WeekHeader>
              <WeekHeaderUnit color="Red">{c.t("Sun")}</WeekHeaderUnit>
              <WeekHeaderUnit>{c.t("Mon")}</WeekHeaderUnit>
              <WeekHeaderUnit>{c.t("Tue")}</WeekHeaderUnit>
              <WeekHeaderUnit>{c.t("Wed")}</WeekHeaderUnit>
              <WeekHeaderUnit>{c.t("Thu")}</WeekHeaderUnit>
              <WeekHeaderUnit>{c.t("Fri")}</WeekHeaderUnit>
              <WeekHeaderUnit>{c.t("Sat")}</WeekHeaderUnit>
            </WeekHeader>
            <Grid
              cellRenderer={p =>
                dayRenderer(p, {
                  onClick: this.changeDay,
                  c: c,
                  customFormat: this.props.customFormat,
                  disable: this.props.disable,
                  selectedDate: this.props.selectedDate,
                  autoScrollOnce: this.autoScrollOnce
                })
              }
              id="calGrid"
              ref={this.calendarRef}
              columnCount={7}
              columnWidth={w}
              height={h * 5}
              rowCount={52}
              rowHeight={h}
              width={w * 7 + 18}
              scrollToRow={moment().diff(firstDay, "weeks") + 2}
              // onScroll={({ scrollTop }) =>
              //   console.log(
              //     moment(firstDay)
              //       .add(Math.round(scrollTop / h), "w")
              //       .format("MMM")
              //   )
              // }
            />
            <ScrollHider />

            {!!this.props.showTimeslot && (
              <TimeSlotWrapper>
                <RadioSelect
                  value={this.state.selectedTimeSlotIndex}
                  onChange={this.changeTimeSlot}
                  options={this.props.timeslot}
                />

                {/* <TSelect onChange={e=> this.changeTimeSlot(e, )}>
							<option value="" disabled selected>
								Choose a timeslot
							</option>
							{this.props.timeslot.map(slot => (
								<option value={slot.offset}>{slot.display}</option>
							))}
              </TSelect> */}
              </TimeSlotWrapper>
            )}
          </DatePickerWrapper>
        )}
      </LocaleApiSubscriber>
    )
  }
}

const ScrollHider = styled.div`
  position: absolute;
  width: 18px;
  height: 80%;
  top: 0;
  right: 0;
  background: white;
`

const TimeSlotWrapper = styled.div`
  margin: 10px 0px;
`
const TSelect = styled.select``

const WeekHeader = styled.div`
  width: ${w * 7}px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${w}px, 1fr));
  cursor: default;
`

const WeekHeaderUnit = styled.div`
	${({ color }) => (color ? "color: " + color + ";" : "")}
	width: ${w}px;
	text-align: center
	font-size: 0.8rem;
`

const dayRenderer = (
  {
    columnIndex, // Horizontal (column) index of cell
    isScrolling, // The Grid is currently being scrolled
    isVisible, // This cell is visible within the grid (eg it is not an overscanned cell)
    key, // Unique key within array of cells
    rowIndex, // Vertical (row) index of cell
    style
  },
  { onClick, c, customFormat = [], disable, ...props }
) => {
  //customFormat = [{checker(row,col, date), style}]

  const thisDay = c.moment(firstDay).add(columnIndex + rowIndex * 7, "d")
  const displayDay = thisDay.get("date")

  let customStyle = ""
  for (let i = 0; i < customFormat.length; i++) {
    if (customFormat[i].checker(columnIndex, rowIndex, thisDay) === true) {
      customStyle = customStyle + customFormat[i].style
      if (customFormat[i].stop === true) {
        break
      }
    }
  }

  const isDisabled = disable(thisDay)
  const monthMapper = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  return (
    <DayDiv
      key={key}
      customFormat={customStyle}
      disable={isDisabled}
      onClick={e => (isDisabled ? undefined : onClick(e, thisDay))}
      style={style}
      selected={thisDay.isSame(props.selectedDate, "day")}
      autoScrollOnce={props.autoScrollOnce}
    >
      {thisDay.date() !== 1 ? (
        displayDay
      ) : (
        <React.Fragment>
          {displayDay} <br /> <b>{monthMapper[thisDay.month()]} </b>
        </React.Fragment>
      )}
    </DayDiv>
  )
}

const DayDiv = styled.div`
  ${({ customFormat }) => (customFormat ? customFormat : "")}
  ${({ selected }) =>
    selected && "background-color: #fd4676; color: white; font-weight: bold"}
  text-align: center;
  cursor: ${({ disable }) => (disable ? "no-drop" : "pointer")};
  font-size: 0.9rem;
`

export default DateTimePicker
//props.autoScrollOnce(props.style.top)
