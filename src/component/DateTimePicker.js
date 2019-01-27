import React from "react"
import moment from "moment"
import styled from "styled-components"
import { Grid, defaultCellRangeRenderer } from "react-virtualized"
import { Section } from "./BasicComponents"

const firstDay = moment()
  .date(1)
  .day(0)
  .startOf("day")

const w = 40,
  h = 40

const DatePickerWrapper = styled.div`
  width: ${w * 7}px;
  overflow: hidden;
`

export const DateTimePicker = props => {
  const c = props.i18n
  return (
    <DatePickerWrapper>
      <WeekHeader>
        <WeekHeaderUnit color="Red">Sun</WeekHeaderUnit>
        <WeekHeaderUnit>Mon</WeekHeaderUnit>
        <WeekHeaderUnit>Tue</WeekHeaderUnit>
        <WeekHeaderUnit>Wed</WeekHeaderUnit>
        <WeekHeaderUnit>Thu</WeekHeaderUnit>
        <WeekHeaderUnit>Fri</WeekHeaderUnit>
        <WeekHeaderUnit>Sat</WeekHeaderUnit>
      </WeekHeader>
      <Grid
        cellRenderer={p =>
          dayRenderer(p, {
            onClick: props.dayOnClick,
            c: c,
            customFormat: props.customFormat,
            disable: props.disable,
            selectedDate: props.selectedDate
          })
        }
        columnCount={7}
        columnWidth={w}
        height={h * 5}
        rowCount={52}
        rowHeight={h}
        width={w * 7}
        style={{ paddingRight: 21, boxSizing: "content-box" }}
      />

      {props.showTimeSlot && (
        <TimeSlotWrapper>
          <TSelect onChange={props.setOffset}>
            <option value="" disabled selected>
              Choose a timeslot
            </option>
            {props.timeslot.map(slot => (
              <option value={slot.offset}>{slot.display}</option>
            ))}
          </TSelect>
        </TimeSlotWrapper>
      )}
    </DatePickerWrapper>
  )
}

const TimeSlotWrapper = styled.div`
  margin: 10px 0px;
`
const TSelect = styled.select``

const WeekHeader = styled.div`
  width: ${w * 7}px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${w}px, 1fr));
`

const WeekHeaderUnit = styled.div`
	${({ color }) => (color ? "color: " + color + ";" : "")}
	width: ${w}px;
	text-align: center
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
  return (
    <DaySpan
      key={key}
      customFormat={customStyle}
      disable={isDisabled}
      onClick={e => (isDisabled ? undefined : onClick(e, thisDay))}
      style={style}
      selected={thisDay.isSame(props.selectedDate)}
    >
      {displayDay}
    </DaySpan>
  )
}

const DaySpan = styled.div`
  ${({ customFormat }) => (customFormat ? customFormat : "")}
  ${({ selected }) =>
    selected && "background-color: #fd4676; color: white; font-weight: bold"}	
  text-align: center;
  cursor: ${({ disable }) => (disable ? "no-drop" : "pointer")};
`

export default DateTimePicker
