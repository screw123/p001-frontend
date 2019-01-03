import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"

import SystemError from "../component/SystemError"
import { Redirect } from "react-router"

const Msg = styled.p`
	font-size: 25px;
	text-align: center;
`
const Time = styled.p`
	text-align: center;
`

export default class ThankYouForOrderPage extends Component {
	state = {
		time: 0
	}

	increaseTime = () => {
		this.setState({ time: this.state.time + 1 })
	}

	componentDidMount() {
		this.interval = setInterval(() => this.increaseTime(), 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
	const { order_id, orderType } = this.props.location.state
	const id = order_id ? order_id : orderType ? orderType : 0

	return (
		id ?
		(<div>
			<Msg>Thanks for purchasing {orderType}.  Your order number is {order_id} </Msg>
			{this.state.time === 10 ?
			<Redirect to="/dash" /> :
			<Time>You will be redirected to Dashboard in {10 - this.state.time} seconds</Time>
			}
		</div >
		)
		:
		<SystemError message={"Invalid sales order number"} />
	)
	}
}

ThankYouForOrderPage.propTypes = {
	order_id: PropTypes.string,
	orderType: PropTypes.string
}
