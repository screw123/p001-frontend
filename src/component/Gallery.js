import React from "react";
import { Grid } from "react-virtualized";
import {
    SectionHeader,
    HeaderText,
    Cell,
    Name,
    Image,
    Modal,
    Close,
    Content,
    Caption
} from "./GalleryStyles";

const DefaultCellRenderer = (a, imageSize, data, handleClick) => {
    // console.log(a.rowIndex, a.columnIndex, "@ data");
    return (
        <Cell key={a.key} style={a.style}>
            <Image onClick={() => handleClick(data)}>
                <img src={data.URL_thumbnail} alt={data.name} />
            </Image>
            <Name width={imageSize}>{data.name}</Name>
        </Cell>
    );
};

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            image: "",
            name: ""
        };
    }

    // Close modal on "esc" key press
    handleKeyPress = e => {
        if (e.keyCode === 27) {
            this.setState({ show: false });
        }
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    handleClick = data => {
        // console.log("clicked");
        this.setState({
            image: data.URL,
            name: data.name,
            show: true
        });
    };

    handleClose = () => {
        this.setState({
            show: false,
            image: "",
            name: ""
        });
    };

    render() {
        let {
            header,
            data,
            imageSize,
            headerText,
            headerIconLeft,
            headerIconRight,
            imageComponent,
            selectMode,
            onSelect,
            selectedValue,
            icons
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
                <div>{icons}</div>
                {selectMode && this.state.show && (
                    <Modal>
                        <Close onClick={this.handleClose}>&times;</Close>
                        <Content>
                            <img
                                src={this.state.image}
                                alt={this.state.image}
                            />
                        </Content>
                        <Caption>{this.state.name}</Caption>
                    </Modal>
                )}
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
                                data[index],
                                this.handleClick
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
