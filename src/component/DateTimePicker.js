import React from "react"
import moment from "moment"
import styled from "styled-components"
import { Grid } from "react-virtualized"
import { RadioSelect } from "./RadioSelect.js"
import LocaleApi, { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleUp, faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons"

import { FieldLabel, FieldDiv } from './FormikForm.js'

const firstDay = moment()
	.date(1)
	.day(0)
	.startOf("date")
const w = 29, h = 45, w_rem = w/LocaleApi.state.defaultHeight, h_rem = h/LocaleApi.state.defaultHeight

const DatePickerWrapper = styled.div`
	width: ${w_rem * 7 + 1}rem;
	overflow: hidden;
	display: block;
`

const DayItem = styled.div`
	margin: 0;
	font-size: 0.6rem;
	font-weight: bold;
	text-align: center;
`

const DayDiv = styled.div`
	${({ customFormat }) => (customFormat ? customFormat : "")}
	${({ selected }) => selected && "background-color: #fd4676; color: white; font-weight: bold"}
	cursor: ${({ disable }) => (disable ? "no-drop" : "pointer")};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
`

const DateHeader = styled.div`
	height: ${h_rem}rem;
	width: 100%;
	color: white;
	background: #fd4676;
`

const DHTop = styled.div`
	display: flex;
	padding: 0.25rem 0.3rem 0rem;
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
	width: 1rem;
	height: ${h_rem * 5}rem;
	top: ${h_rem * 1.5}rem;
	right: 0;
	background: white;
`

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: ${w_rem*7}rem 1rem;
`
const GridInnerWrapper = styled.div`
	overflow: hidden;
	width: ${w_rem * 7}rem;
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
	margin: 0.5rem 0rem;
`

const WeekHeader = styled.div`
	width: ${w_rem * 7}rem;
	height: 1rem;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${w_rem}rem, 1fr));
	cursor: default;
`

const WeekHeaderUnit = styled.div`
	${({ color }) => (color ? "color: " + color + ";" : "")}
	width: ${w_rem}rem;
	text-align: center
	font-size: 0.7rem;
`

export class DateTimePicker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTimeSlotIndex: this.props.showTimeslot ? 0 : undefined,
			scrollTop: 0
		}
		this.changeDay = this.changeDay.bind(this)
		this.changeTimeSlot = this.changeTimeSlot.bind(this)
		this.onUpArrowClick = this.onUpArrowClick.bind(this)
		this.onDownArrowClick = this.onDownArrowClick.bind(this)
		this.setScrollTop = this.setScrollTop.bind(this)
		this.mainRenderer = this.mainRenderer.bind(this)
	}

	/*   autoScrollOnce = top => {
		// This function will auto scroll to current date at first
		// Then it will do nothing when called
		if (document.getElementById("calGrid")) {
			document.getElementById("calGrid").scrollTo({ top: top, behavior: "smooth" })
			this.autoScrollOnce = function() {}
		}
	} */

	setScrollTop = i => this.setState({ scrollTop: i })

	onUpArrowClick = () => {
		this.setState(prevState => ({ scrollTop: Math.max(prevState.scrollTop - 4 * h, 0) }))
	}
	onDownArrowClick = () => {
		this.setState(prevState => ({ scrollTop: Math.min(prevState.scrollTop + 4 * h, 47 * h) }))
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

	mainRenderer = (c) => (
		<DatePickerWrapper>
			{this.props.label && <FieldLabel>{this.props.label}</FieldLabel>}
			<DateHeader>
				<DHTop>
					<span>{this.props.selectedDate.format("YYYY")}</span>
				</DHTop>
				<DHBottom>{moment(this.props.selectedDate.toDate()).format("MMM D (ddd)")} </DHBottom>
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
			<GridWrapper>
				<GridInnerWrapper>
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
						columnCount={7}
						columnWidth={w}
						height={h * 5}
						rowCount={52}
						rowHeight={h}
						width={w * 7}
						style={{ scrollBehavior: "smooth", marginRight: "-1rem", overflow: "hidden auto", width: (w_rem*7+1)+"rem" }}
						scrollTop={this.state.scrollTop}
						onScroll={({ scrollTop }) => this.setScrollTop(scrollTop)}
					/>
				</GridInnerWrapper>

				<ScrollHider>
					<IconBar>
						<IconWrapper onClick={e => this.onUpArrowClick()}>
							<UpArrow />
						</IconWrapper>
						<IconWrapper onClick={e => this.onDownArrowClick()}>
							<DownArrow />
						</IconWrapper>
					</IconBar>
				</ScrollHider>
			</GridWrapper>

			{!!this.props.showTimeslot && 
			<TimeSlotWrapper>
				<RadioSelect
					value={this.state.selectedTimeSlotIndex}
					onChange={this.changeTimeSlot}
					options={this.props.timeslot}
				/>
			</TimeSlotWrapper>
			}
		</DatePickerWrapper>
	)

	render() {
		const isFormik = this.props.field && this.props.form
		return (
			<LocaleApiSubscriber>
			{c => {
				if (this.props.hidden) return null
				if (isFormik) {
					return (
						<FieldDiv>
							{this.mainRenderer(c)}
						</FieldDiv>
					)
				}
				else {
					return this.mainRenderer(c)
				}
			}}
			</LocaleApiSubscriber>
		)
	}
}

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
	const isDisabled = disable(thisDay)

	let customStyle = ""
	for (let i = 0; i < customFormat.length; i++) {
		const {checker, style, stop} = customFormat[i]

		if (checker(columnIndex, rowIndex, thisDay) === true) {
			customStyle = customStyle + style
			if (stop) break
		}
	}

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
					<DayItem>{moment(thisDay.toDate()).format("MMM")}</DayItem>
					{displayDay}
					<DayItem>{thisDay.year()}</DayItem>
				</React.Fragment>
			)}
		</DayDiv>
	)
}

export default DateTimePicker
