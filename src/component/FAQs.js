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
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.faqs.map((FAQ, index) => {
            return (<FAQItem handleCheckChieldElement={this.handleCheckChieldElement} {...FAQ} key={index} />)
          })
        }
      </React.Fragment>
    )
  }
}

export default FAQs
