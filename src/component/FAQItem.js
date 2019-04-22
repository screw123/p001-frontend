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
  }

  .text {
    color: #787F84;
    font-size: 18px;
    line-height: 22px;
    margin-left: 5.5rem;
    padding-bottom: 2rem;

  }
`

function FAQItem ({id, title, content}) {
    console.log(id,title,content);
    return (
        <FaqItem>
            <a>
                <span>
                    <img src="/images/ico-faq.svg" alt="FAQ icon"/>
                </span>
                 <h4>
                    {title}
                 </h4>
            </a>
            <div className="text" id={`collapse${id}`}>
                {content}
            </div>
        </FaqItem>
    );
}

export default FAQItem;