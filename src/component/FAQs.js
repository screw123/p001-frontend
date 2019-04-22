import React from "react";
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

function FAQs(props) {
    const faq1 = {id: 1,title: "Lorem ipsum dolor sit amet?",content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."}
    const faq2 = {id: 2,title: "Lorem ipsum dolor sit amet?",content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."}
    const faq3 = {id: 3,title: "Lorem ipsum dolor sit amet?",content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."}
    const faq4 = {id: 4,title: "Lorem ipsum dolor sit amet?",content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."}
    const faq5 = {id: 5,title: "Lorem ipsum dolor sit amet?",content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."}
    const faq6 = {id: 6,title: "Lorem ipsum dolor sit amet?",content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."}

    return (
        <div>
            <div>
                <section>
                    <FaqTitle>General</FaqTitle>
                    <div className="divider"></div>
                    <FAQItem {...faq1}/>
                    <FAQItem {...faq2} />
                    <FAQItem {...faq3} />

                </section>
                <section>
                    <FaqTitle>Boxes</FaqTitle>
                    <div className="divider"></div>
                    <FAQItem {...faq4} />
                    <FAQItem {...faq5} />
                    <FAQItem {...faq6} />
                </section>
            </div>
        </div>
    );
}

export default FAQs;
