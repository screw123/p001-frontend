import React from "react"
import styled from "styled-components"
import { Header3, HeaderWithBar } from "./BasicComponents.js"

const FaqItem = styled.div`
	h4 {
		color: #787f84;
		font-size: 18px;
		font-weight: 500;
		margin-left: 3rem;
		font-weight: bold;
	}

	a {
		display: inline-flex;
		cursor: pointer;
	}

	.open {
		visibility: visible;
		height: auto;
	}

	.close {
		visibility: hidden;
		height: 0;
	}
`

const FaqText = styled.p`
	color: #787f84;
	font-size: 18px;
	line-height: 22px;
	margin-left: 5.5rem;
	padding-bottom: 2rem;
`

const Section = styled.div`
	margin: 0 10%;
	padding: 4rem 0;
`

class FAQItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = { open: false }
		this.toggleAction = this.toggleAction.bind(this)
	}

	toggleAction() {
		this.setState({ open: !this.state.open })
	}

	render() {
		return (
			<FaqItem>
				<a onClick={this.toggleAction}>
					<span>
						<img src="/images/ico-faq.svg" alt="FAQ icon" />
					</span>
					<h4>{this.props.title}</h4>
				</a>
				<FaqText className={this.state.open ? "open" : "close"}>
					{this.props.content}
				</FaqText>
			</FaqItem>
		)
	}
}

const FAQSection = ({ c }) => {
	const generalFAQ = [
		{
			title: "111?",
			content: "111"
		},
		{
			title: "222?",
			content: "222"
		}
	]
	const itemFAQ = [
		{
			title: "333",
			content: "333"
		},
		{
			title: "444",
			content: "444"
		}
	]

	return (
		<Section>
			<HeaderWithBar color="#787F84" padding="1rem 0 0">
				{c.t("Frequently Asked Questions")}
			</HeaderWithBar>
			<Header3
				color="#787F84"
				align="center"
				margin="4rem 0"
				width="100%"
			>
				{c.t("General")}
			</Header3>

			{generalFAQ.map((FAQ, index) => (
				<FAQItem {...FAQ} key={index} />
			))}

			<Header3
				color="#787F84"
				align="center"
				margin="0 0 4rem"
				width="100%"
			>
				{c.t("Item")}
			</Header3>
			{itemFAQ.map((FAQ, index) => (
				<FAQItem {...FAQ} key={index} />
			))}
		</Section>
	)
}

export default FAQSection
