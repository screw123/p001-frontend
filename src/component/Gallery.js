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
    Caption,
    Overlay,
    Icon
} from "./GalleryStyles";

const DefaultCellRenderer = (a, imageSize, data, handleImageClick, overlay) => {
    // console.log(a.rowIndex, a.columnIndex, "@ data");
    return (
        <Cell key={a.key} style={a.style}>
            <Image onClick={() => handleImageClick(data)}>
                <img src={data.URL_thumbnail} alt={data.name} />
                {overlay !== 0 && (
                    <Overlay overlay={overlay === 2 ? true : false}>
                        <Icon>
                            <i className="far fa-check-circle" />
                        </Icon>
                    </Overlay>
                )}
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

    handleImageClick = data => {
        if (this.props.selectMode) {
            this.props.onSelect(data)
        } else {
            this.setState({
                image: data.URL,
                name: data.name,
                show: true
            });
        }
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
            selectedValue,
            icons
        } = this.props;
        let index = 0;
        let overlay;
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

                {!selectMode && this.state.show && (
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
                            // taking a varible overlay which is:
                            // 0 when selected mode in off
                            // 1 when seleted mode is on but the image is not selected
                            // 2 when seleted mode is on and the image is selected
                            overlay = !selectMode
                                ? 0
                                : selectedValue.indexOf(data[index]._id) < 0
                                ? 1
                                : 2;
                            return DefaultCellRenderer(
                                a,
                                imageSize,
                                data[index],
                                this.handleImageClick,
                                overlay
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
