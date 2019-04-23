import React, { Component } from 'react';
import FAQItem from "./FAQItem";
import styled from 'styled-components'
export const FaqTitle = styled.h2`
  color: #787F84;
  text-align: center;
  padding: 3rem 0;
  font-size: 28px;  
  font-weight: bold;  
  line-height: 34px;
`
class FAQs extends Component {

  constructor(props) {
    super(props)
      this.state = {
        FAQs: [
          {id: 1, title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
          {id: 2, title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
          {id: 3, title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
          {id: 4, title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
          {id: 5, title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
          {id: 6, title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."}
        ]
      }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.FAQs.map((FAQ, index) => {
            return (<FAQItem handleCheckChieldElement={this.handleCheckChieldElement} {...FAQ} key={index} />)
          })
        }
      </React.Fragment>
    )
  }
}

export default FAQs
