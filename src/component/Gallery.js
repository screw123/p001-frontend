import React from "react";
import styled from "styled-components";
import { Grid } from "react-virtualized";

const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.5em;
    padding: 1em;
    display: inline-block;
`;

const HeaderText = styled.span`
    padding: 1em;
`;

const Cell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Name = styled.div`
    width: ${props => props.width + "px"};
    text-align: center;
    font-weight: bold;
    background: darkslategrey;
    color: white;
`;

const DefaultCellRenderer = (a, imageSize, data) => {
    // console.log(a.rowIndex, a.columnIndex, "@ data");
    return (
        <Cell key={a.key} style={a.style}>
            <span>
                <img src={data.URL_thumbnail} alt={data.name} />
            </span>
            <Name width={imageSize}>{data.name}</Name>
        </Cell>
    );
};

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            header,
            data,
            imageSize,
            headerText,
            headerIconLeft,
            headerIconRight,
            imageComponent
        } = this.props;
        let index = 0;
        let totalData = data.length - 1;

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
                <Grid
                    cellRenderer={a => {
                        // console.log(a.rowIndex + a.columnIndex, "@calc");
                        if (imageComponent) return imageComponent(a);
                        else {
                            index = a.rowIndex * 3 + a.columnIndex;
                            if (index > totalData) return null;
                            return DefaultCellRenderer(
                                a,
                                imageSize,
                                data[index]
                            );
                        }
                    }}
                    columnCount={3}
                    columnWidth={imageSize * 1.1}
                    height={imageSize * 2.75}
                    rowCount={
                        data.length % 3 === 0
                            ? data.length / 3
                            : data.length / 3 + 1
                    }
                    rowHeight={imageSize + 50}
                    width={imageSize * 3.45}
                />
            </div>
        );
    }
}
