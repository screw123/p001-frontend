import React from "react";
import styled from 'styled-components'

export const FaqItem = styled.div`
  h4 {
    color: #787F84;
    font-size: 18px;  
    font-weight: 500;
    margin-left: 3rem;
    font-weight: bold;  
  }

  a{
    display: inline-flex;
    cursor: pointer;
  }

  .text {
    color: #787F84;
    font-size: 18px;
    line-height: 22px;
    margin-left: 5.5rem;
    padding-bottom: 2rem;
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

export const FaqText = styled.p`
  color: #787F84;
  font-size: 18px;
  line-height: 22px;
  margin-left: 5.5rem;
  padding-bottom: 2rem;
`

const FAQItem = props => (
  <FaqItem>
      <a onClick={props.handleCheckChieldElement}>
          <span>
              <img src="/images/ico-faq.svg" alt="FAQ icon"/>
          </span>
           <h4>
              {props.title}
           </h4>
      </a>
      <FaqText className={props.className} id={`collapse${props.id}`}>
          {props.content}
      </FaqText>
  </FaqItem>
)
export default FAQItem