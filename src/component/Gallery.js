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

const extra = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold   "
};

let DefaultCellRenderer = (a, data) => {
    console.log(a.rowIndex, a.columnIndex, data);
    if (a.columnIndex == 2) {
        return (
            <div key={a.key} style={{ ...a.style, ...extra }}>
                <span>
                    <img src={data} alt={data} />
                </span>
            </div>
        );
    } else {
        return (
            <div key={a.key} style={{ ...a.style, ...extra }}>
                <p>{data}</p>
            </div>
        );
    }
};

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    // Setting each column width
    getColumnWidth({ index }) {
        switch (index) {
            case 0:
                return 100;
            case 1:
                return 100;
            default:
                return 400;
        }
    }

    render() {
        let header;
        if (
            this.props.headerText &&
            this.props.headerIconLeft &&
            this.props.headerIconRight
        ) {
            header = (
                <SectionHeader>
                    {this.props.headerIconLeft}
                    <HeaderText>{this.props.headerText}</HeaderText>
                    {this.props.headerIconRight}
                </SectionHeader>
            );
        }

        return (
            <div>
                {header}
                <Grid
                    cellRenderer={a => {
                        if (this.props.imageComponent)
                            return this.props.imageComponent(a);
                        else {
                            if (a.columnIndex == 2)
                                // sending the URL_thumbanil link, skipping URL
                                return DefaultCellRenderer(
                                    a,
                                    this.props.data[a.rowIndex][
                                        Object.keys(
                                            this.props.data[a.rowIndex]
                                        )[a.columnIndex + 1]
                                    ]
                                );
                            else
                                return DefaultCellRenderer(
                                    a,
                                    this.props.data[a.rowIndex][
                                        Object.keys(
                                            this.props.data[a.rowIndex]
                                        )[a.columnIndex]
                                    ]
                                );
                        }
                    }}
                    columnCount={Object.keys(this.props.data[0]).length - 1}
                    columnWidth={this.getColumnWidth}
                    height={500}
                    rowCount={this.props.data.length}
                    // added 25px for some spacing
                    rowHeight={this.props.imageSize + 25}
                    width={500}
                />
            </div>
        );
    }
}
