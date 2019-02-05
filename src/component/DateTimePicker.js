import React from "react"
import moment from "moment"
import styled from "styled-components"
import { Grid } from "react-virtualized"
import { RadioSelect } from "./RadioSelect.js"
import { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleUp, faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons"

const firstDay = moment()
  .date(1)
  .day(0)
  .startOf("date")
const w = 31,
  h = 50

const DatePickerWrapper = styled.div`
  width: ${w * 7 + 18}px;
  overflow: hidden;
  position: relative;
`

export class DateTimePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTimeSlotIndex: this.props.showTimeslot ? 0 : undefined,
      toggleHeader: true
    }
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

  onUpArrowClick = () => {
    document.getElementById("calGrid").scrollTop += h * 4
  }
  onDownArrowClick = () => {
    document.getElementById("calGrid").scrollTop -= h * 4
  }

  changeDay = (e, d) => {
    e.preventDefault()
    this.setState({ toggleHeader: !this.state.toggleHeader })
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
            <DateHeader toggleHeader={this.state.toggleHeader}>
              <DHTop>
                <span>{this.props.selectedDate.format("YYYY")}</span>
                <span>{this.props.selectedDate.locale("en").format("dddd")}</span>
              </DHTop>
              <DHBottom>{this.props.selectedDate.locale("en").format("MMMM Do")} </DHBottom>
            </DateHeader>

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
              style={{ scrollBehavior: "smooth" }}
              scrollToRow={moment().diff(firstDay, "weeks") + 2}
              // onScroll={({ scrollTop }) =>
              //   console.log(
              //     moment(firstDay)
              //       .add(Math.round(scrollTop / h), "w")
              //       .format("MMM")
              //   )
              // }
            />

            <ScrollHider>
              <IconBar>
                <IconWrapper onClick={e => this.onUpArrowClick()}>
                  <DownArrow />
                </IconWrapper>
                <IconWrapper onClick={e => this.onDownArrowClick()}>
                  <UpArrow />
                </IconWrapper>
              </IconBar>
            </ScrollHider>

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

const DateHeader = styled.div`
  height: ${h}px;
  width: 100%;
  position: absolute;
  color: ${({ toggleHeader }) => (toggleHeader ? "white" : "#fd4676")};
  background: ${({ toggleHeader }) => (toggleHeader ? "#fd4676" : "white")};
  transition: all 250ms linear;
`

const DHTop = styled.div`
  display: flex;
  padding: 3px 5px 0px;
  justify-content: space-between;
  font-size: 0.8rem;
`
const DHBottom = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
`

const ScrollHider = styled.div`
  position: absolute;
  width: 18px;
  height: ${h * 5}px;
  top: ${h * 1.5}px;
  right: 0;
  background: white;
`
const IconBar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`
const IconWrapper = styled.div`
  color: #fd4676;
`
const UpArrow = styled(() => <FontAwesomeIcon icon={faArrowAltCircleUp} />)``
const DownArrow = styled(() => <FontAwesomeIcon icon={faArrowAltCircleDown} />)``

const TimeSlotWrapper = styled.div`
  margin: 10px 0px;
`
const TSelect = styled.select``

const WeekHeader = styled.div`
  width: ${w * 7}px;
  height: ${h / 2}px;
  margin-top: ${h}px;
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
          <DayItem>{monthMapper[thisDay.month()]}</DayItem>
          {displayDay}
          <DayItem>{thisDay.year()}</DayItem>
        </React.Fragment>
      )}
    </DayDiv>
  )
}

const DayItem = styled.p`
  margin: 0;
  font-size: 0.5rem;
  font-weight: bold;
`

const DayDiv = styled.div`
  ${({ customFormat }) => (customFormat ? customFormat : "")}
  ${({ selected }) => selected && "background-color: #fd4676; color: white; font-weight: bold"}
  cursor: ${({ disable }) => (disable ? "no-drop" : "pointer")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`

export default DateTimePicker
//props.autoScrollOnce(props.style.top)
