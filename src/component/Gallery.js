import React from "react";
import styled from "styled-components";

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: 600;
    font-size: 1.5em;
`;

const HeaderText = styled.span`
    padding: 1em;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Cell = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 700px;
    max-height: 500px;
    overflow-y: auto;
`;
const SingleImg = styled.div`
    margin: 10px;
`;
const Name = styled.div`
    background: mediumseagreen;
    color: white;
    text-align: center;
    font-size: 17px;
`;

const SingleCell = props => {
    let { cell } = props;
    // console.log(cell.URL);
    return (
        <SingleImg>
            <a href="">
                <img src={cell.URL_thumbnail} alt="Cinque Terre" />
            </a>
            <Name>{cell.name}</Name>
        </SingleImg>
    );
};

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let header;
        let { data, headerText, headerIconLeft, headerIconRight } = this.props;
        if (headerText && headerIconLeft && headerIconRight) {
            header = (
                <SectionHeader>
                    {headerIconLeft}
                    <HeaderText>{headerText}</HeaderText>
                    {headerIconRight}
                </SectionHeader>
            );
        }

        return (
            <div>
                {header}
                <Wrapper>
                    <Cell>
                        {data.map((item, i) => (
                            <SingleCell cell={item} key={i} />
                        ))}
                    </Cell>
                </Wrapper>
            </div>
        );
    }
}
