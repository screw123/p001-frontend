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
      <div className={props.className + ' text'} id={`collapse${props.id}`}>
          {props.content}
      </div>
  </FaqItem>
)
export default FAQItem