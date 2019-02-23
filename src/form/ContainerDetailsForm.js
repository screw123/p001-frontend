import React, { Component } from "react"
import styled from "styled-components"

const Title = styled.h2`
  text-align: center;
  margin-top: 15px;
`
const Wrapper = styled.div``
const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 25px 0px;
`
const RowName = styled.p`
  margin: 0px;
  text-align: center;
  font-size: 1.15em;
`

const Item = styled.div`
  margin: 5px;
  flex: 1;
`
const ItemName = styled.p`
  margin: 5px 0px;
  font-weight: bold;
  text-align: center;
`
const ItemValue = styled.p`
  margin: 0px;
  text-align: center;
`

export default class ContainerDetailsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const c = this.props.i18n
    const Container = this.props.Container
    return (
      <Wrapper>
        <Title>{c.t("Container Details")}</Title>

        <Row>
          <Item>
            <ItemName>{c.t("Id")}</ItemName>
            <ItemValue>{Container._id}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Owner Id")}</ItemName>
            <ItemValue>{Container.accountOwner_id}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Auto Renew")}</ItemName>
            <ItemValue>{Container.autoRenew ? "Enable" : "Disable"}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("User Info Id")}</ItemName>
            <ItemValue>{Container.containerUserInfo_id.toString()}</ItemValue>
          </Item>
        </Row>

        <Row>
          <Item>
            <ItemName>{c.t("Type Id")}</ItemName>
            <ItemValue>{Container.containerType_id}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Name")}</ItemName>
            <ItemValue>{Container.containerTypeName}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Short Code")}</ItemName>
            <ItemValue>{Container.containerTypeShortCode}</ItemValue>
          </Item>
        </Row>

        <Row>
          <Item>
            <ItemName>{c.t("Rental Order Id")}</ItemName>
            <ItemValue>{Container.rentalOrder_id}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Paid Duration")}</ItemName>
            <ItemValue>{Container.paidDuration}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Paid Terms")}</ItemName>
            <ItemValue>{Container.paidTerms}</ItemValue>
          </Item>
        </Row>

        <Row>
          <Item>
            <ItemName>{c.t("Upcoming Events Id")}</ItemName>
            <ItemValue>{Container.upcomingEvents_id.toString()}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Print Id")}</ItemName>
            <ItemValue>{Container.printId}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Status")}</ItemName>
            <ItemValue>{Container.status}</ItemValue>
          </Item>
        </Row>

        <Row>
          <Item>
            <ItemName>{c.t("Storage Start Date")}</ItemName>
            <ItemValue>{Container.storageStartDate}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Storage Exprity Date")}</ItemName>
            <ItemValue>{Container.storageExpiryDate}</ItemValue>
          </Item>

          <Item>
            <ItemName>{c.t("User Defined Name")}</ItemName>
            <ItemValue>{Container.userDefinedName}</ItemValue>
          </Item>
        </Row>

        <Row>
          <Item>
            <ItemName>{c.t("Height")}</ItemName>
            <ItemValue>{Container.heightM}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Length")}</ItemName>
            <ItemValue>{Container.lengthM}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Width")}</ItemName>
            <ItemValue>{Container.widthM}</ItemValue>
          </Item>
          <Item>
            <ItemName>{c.t("Weight")}</ItemName>
            <ItemValue>{Container.weightKG}</ItemValue>
          </Item>
        </Row>

        <RowName>{c.t("Finished Events")}</RowName>
        {Container.finishedEvents_id.map(event => (
          <Row>
            {event.user_id && (
              <Item>
                <ItemName>{c.t("User Id")}</ItemName>
                <ItemValue>{event.user_id}</ItemValue>
              </Item>
            )}
            {event.userName && (
              <Item>
                <ItemName>{c.t("User Name")}</ItemName>
                <ItemValue>{event.userName}</ItemValue>
              </Item>
            )}
            <Item>
              <ItemName>{c.t("Created At")}</ItemName>
              <ItemValue>{event.createDateTime}</ItemValue>
            </Item>
            <Item>
              <ItemName>{c.t("Doc Type")}</ItemName>
              <ItemValue>{event.docType}</ItemValue>
            </Item>
            <Item>
              <ItemName>{c.t("Event Type")}</ItemName>
              <ItemValue>{event.eventType}</ItemValue>
            </Item>
            <Item>
              <ItemName>{c.t("Message")}</ItemName>
              <ItemValue>{event.msg}</ItemValue>
            </Item>
          </Row>
        ))}
      </Wrapper>
    )
  }
}
