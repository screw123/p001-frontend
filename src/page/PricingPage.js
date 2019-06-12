import React, { useState } from "react"
import styled from "styled-components"
import { StaticCheckBox } from "../component/CheckBox.js"
import PricingTableFilters from "../component/PricingTableFilters"
import { Header } from "../component/HeaderStyles"
import * as Styles from "./IndexPageStyles"
import { Redirect } from "react-router-dom"
import {
	Button,
	ContrastFunctionButton
} from "../component/BasicComponents.js"

const PricingPage = props => {
	const g = props.login
	const c = props.i18n

	const [redirectPath, setRedirectPath] = useState(undefined)
	const [passOnState, setPassOnState] = useState(undefined)

	const boxes = [
		{
			id: 1,
			value: "box1",
			name: "Document Box",
			isChecked: true,
			picURL: "/images/ico-box.svg"
		},
		{
			id: 2,
			value: "box2",
			name: "Standard Box",
			isChecked: true,
			picURL: "/images/ico-box.svg"
		},
		{
			id: 3,
			value: "box3",
			name: "Premium Box",
			isChecked: true,
			picURL: "/images/ico-box.svg"
		}
	]

	return (
		<>
			{redirectPath && (
				<Redirect
					push
					to={{ pathname: redirectPath, state: passOnState }}
				/>
			)}

			<Header Pricing>{c.t("Pricing")}</Header>
			{c.state.width > 768 && (
				<TableContainer>
					<Table>
						<TableRowFiltersBydate />
						{boxes.map(box => (
							<TableRowFilters>
								<ToggleBox c={c} {...box} />
							</TableRowFilters>
						))}
					</Table>
					<TableHeader>{c.t("Box Features")}</TableHeader>
					<Table>
						<TableRow>{c.t("Size")}</TableRow>
						<TableRow>40cm x 36cm x 30cm</TableRow>{" "}
						<TableRow>60cm x 40cm x 36cm</TableRow>
						<TableRow>60cm x 40cm x 36cm</TableRow>
					</Table>
					<Table>
						<TableRow>{c.t("Insured Value")}</TableRow>
						<TableRow>/</TableRow> <TableRow>HK$1500</TableRow>
						<TableRow>HK$5000</TableRow>
					</Table>
					<Table>
						<TableRow>{c.t("Temp and Humidity Control")}</TableRow>
						<TableRow>
							<StaticCheckBox checked />
						</TableRow>{" "}
						<TableRow>
							<StaticCheckBox checked />
						</TableRow>
						<TableRow>
							<StaticCheckBox checked />
						</TableRow>
					</Table>
					<TableHeader>{c.t("Pricing")}</TableHeader>
					<Table>
						<TableRow>{c.t("By Day")}</TableRow>
						<TableRow>/</TableRow> <TableRow>HK$ 5</TableRow>
						<TableRow>HK$ 10</TableRow>
					</Table>
					<Table>
						<TableRow>{c.t("By Month")}</TableRow>
						<TableRow>HK$ 29</TableRow> <TableRow>HK$ 39</TableRow>
						<TableRow>HK$ 79</TableRow>
					</Table>
					<Table>
						<TableRow>{c.t("By Year")}</TableRow>
						<TableRow>HK$ 290</TableRow>{" "}
						<TableRow>HK$ 390</TableRow>
						<TableRow>HK$ 790</TableRow>
					</Table>
					<Table>
						<TableRow />
						<TableRow>
							<CTAButton_Pricing
								onClick={() => setRedirectPath("/quotation")}
							>
								{c.t("Start Now")}
							</CTAButton_Pricing>
						</TableRow>
						<TableRow>
							<CTAButton_Pricing
								onClick={() => setRedirectPath("/quotation")}
							>
								{c.t("Start Now")}
							</CTAButton_Pricing>
						</TableRow>
						<TableRow>
							<CTAButton_Pricing
								onClick={() => setRedirectPath("/quotation")}
							>
								{c.t("Start Now")}
							</CTAButton_Pricing>
						</TableRow>
					</Table>
				</TableContainer>
			)}
			{c.state.width <= 768 && (
				<>
					<TableContainer>
						<Table>
							<TableRowFiltersBydate />
							<TableRowFilters>
								<ToggleBox c={c} {...boxes[0]} />
							</TableRowFilters>
						</Table>
						<TableHeader>{c.t("Box Features")}</TableHeader>
						<Table>
							<TableRow>{c.t("Size")}</TableRow>
							<TableRow>40cm x 36cm x 30cm</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("Insured Value")}</TableRow>
							<TableRow>/</TableRow>
						</Table>
						<Table>
							<TableRow>
								{c.t("Temp and Humidity Control")}
							</TableRow>
							<TableRow>
								<StaticCheckBox checked />
							</TableRow>
						</Table>
						<TableHeader>{c.t("Pricing")}</TableHeader>
						<Table>
							<TableRow>{c.t("By Day")}</TableRow>
							<TableRow>/</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("By Month")}</TableRow>
							<TableRow>HK$ 29</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("By Year")}</TableRow>
							<TableRow>HK$ 290</TableRow>
						</Table>
						<Table>
							<TableRow1Item>
								<CTAButton_Pricing
									onClick={() =>
										setRedirectPath("/quotation")
									}
								>
									{c.t("Start Now")}
								</CTAButton_Pricing>
							</TableRow1Item>
						</Table>
					</TableContainer>
					<TableContainer>
						<Table>
							<TableRowFiltersBydate />
							<TableRowFilters>
								<ToggleBox c={c} {...boxes[1]} />
							</TableRowFilters>
						</Table>
						<TableHeader>{c.t("Box Features")}</TableHeader>
						<Table>
							<TableRow>{c.t("Size")}</TableRow>
							<TableRow>60cm x 40cm x 36cm</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("Insured Value")}</TableRow>
							<TableRow>HK$1500</TableRow>
						</Table>
						<Table>
							<TableRow>
								{c.t("Temp and Humidity Control")}
							</TableRow>
							<TableRow>
								<StaticCheckBox checked />
							</TableRow>
						</Table>
						<TableHeader>{c.t("Pricing")}</TableHeader>
						<Table>
							<TableRow>{c.t("By Day")}</TableRow>
							<TableRow>HK$ 5</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("By Month")}</TableRow>
							<TableRow>HK$ 39</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("By Year")}</TableRow>
							<TableRow>HK$ 390</TableRow>
						</Table>
						<Table>
							<TableRow1Item>
								<CTAButton_Pricing
									onClick={() =>
										setRedirectPath("/quotation")
									}
								>
									{c.t("Start Now")}
								</CTAButton_Pricing>
							</TableRow1Item>
						</Table>
					</TableContainer>
					<TableContainer>
						<Table>
							<TableRowFiltersBydate />
							<TableRowFilters>
								<ToggleBox c={c} {...boxes[2]} />
							</TableRowFilters>
						</Table>
						<TableHeader>{c.t("Box Features")}</TableHeader>
						<Table>
							<TableRow>{c.t("Size")}</TableRow>
							<TableRow>60cm x 40cm x 36cm</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("Insured Value")}</TableRow>
							<TableRow>HK$5000</TableRow>
						</Table>
						<Table>
							<TableRow>
								{c.t("Temp and Humidity Control")}
							</TableRow>
							<TableRow>
								<StaticCheckBox checked />
							</TableRow>
						</Table>
						<TableHeader>{c.t("Pricing")}</TableHeader>
						<Table>
							<TableRow>{c.t("By Day")}</TableRow>
							<TableRow>HK$ 10</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("By Month")}</TableRow>
							<TableRow>HK$ 79</TableRow>
						</Table>
						<Table>
							<TableRow>{c.t("By Year")}</TableRow>
							<TableRow>HK$ 790</TableRow>
						</Table>
						<Table>
							<TableRow1Item>
								<CTAButton_Pricing
									onClick={() =>
										setRedirectPath("/quotation")
									}
								>
									{c.t("Start Now")}
								</CTAButton_Pricing>
							</TableRow1Item>
						</Table>
					</TableContainer>
				</>
			)}
			<Styles.FooterSection>
				<Styles.TextFooter>
					{c.t("Wisekeep© 2019 All Rights Reserved.")}
				</Styles.TextFooter>
			</Styles.FooterSection>
		</>
	)
}

const TableContainer = styled.div`
	background-color: white;
	box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.5);
	border-radius: 16px;
	margin: 5% 10%;
`

const TableHeader = styled.div`
	background-color: #F0F0F0;
	color: #787F84;	
	font-size: 21px;	
	font-weight: bold;
	padding: 1em 2em;
`

const CTAButton_Pricing = styled(Button)`
	margin: 0;
	padding: 0.5rem 0.5rem;
	font-size: 1.1rem;
	min-width: 8rem;
	max-width: 15rem;
	width: 100%;
	background: linear-gradient(180deg, #F43EA6 0%, #F5576C 100%);
	color: #fff;

	&:focus {
		outline: none;
	}
`

const Table = styled.div`
	display: flex;
	flex-flow: row wrap;
	border-bottom: 1px solid #cdcdcd;
`
const TableRow = styled.div`
	border-right: 1px solid #cdcdcd;
	color: #787f84;
	font-size: 18px;
	text-align: ${props => (props.left ? "left" : "center")};
	padding: 1.5em 0.5em;
	width: calc(100% / 4);
	position: relative;

	@media all and (max-width: 768px) {
		width: calc(100% / 2);
		padding: 1em 0.5em;
	}
`

const TableRow1Item = styled.div`
	border-right: 1px solid #cdcdcd;
	color: #787f84;
	font-size: 18px;
	text-align: ${props => (props.left ? "left" : "center")};
	padding: 1.5em 2em;
	width: 100%;
	position: relative;

	@media all and (max-width: 768px) {
		width: 100%;
		padding: 1.5em 1em;
	}
`

const TableRowFilters = styled(TableRow)`
	@media all and (max-width: 740px) {
		border-bottom: 2px solid #f0f0f0;
		width: calc(100%);
	}
`
const TableRowFiltersBydate = styled(TableRowFilters)`
	display: flex;
	align-items: center;
	justify-content: center;
`

const ToggleBox = props => (
	<label key={props.id}>
		<div checked={props.isChecked}>
			<img src={props.picURL} alt="" />
			<ItemContainerTitle>{props.c.t(props.name)}</ItemContainerTitle>
		</div>
	</label>
)

const ItemContainerTitle = styled.h3`
	color: #787f84;
	padding-top: 5%;
	margin-bottom: 1%;
`
const ItemContainerLink = styled.a`
	color: #e61d6e;
	font-weight: bold;
`

export default PricingPage
