import React from 'react'
import styled from 'styled-components'
import { AutoSizer, List, WindowScroller  } from 'react-virtualized';
import {Section} from './BasicComponents'

const DefaultListComponent = (a, data) => (
    <div key={a.key} style={a.style}>
        {Object.keys(data).map(v => (
            <span key={a.index + v}>{v + " : " + data[v]}</span>
        ))}
        <div>------------</div>
    </div>
)

const OuterWrapper = styled.div`
    box-sizing:border-box;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: [s1] 2.5% [checkbox] ${({multiSelect})=>multiSelect?'5':'0'}% [content] auto [end] 2.5% [s2];
    grid-column-gap: 0.2rem;
    overflow: hidden;
    min-width: 300px;
`
const ContentRow = styled.div`
    grid-column: content / end;
    overflow: visible;
`

const ContentDiv = styled.div`
    display: ${({occupyFullRow})=>occupyFullRow? 'block':'inline-block'};
    cursor: pointer;
`

const CheckboxDiv = styled.div`
    grid-column: checkbox / content;
    overflow: visible;
`

export const InfoListStandardLine = ({key1, style, checkbox, content, checkboxOnClick, contentOnClick, occupyFullRow}) => {
    return(<OuterWrapper key={key1} style={style}>
        {checkbox && <CheckboxDiv onClick={checkboxOnClick}>
            {checkbox}
        </CheckboxDiv>}
        <ContentRow><ContentDiv onClick={contentOnClick} occupyFullRow={occupyFullRow}>
            {content}
        </ContentDiv></ContentRow>
    </OuterWrapper>)
}

export class InfoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Section {...this.props}/>
                <AutoSizer disableHeight>
                {({ width }) => (
                    <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <List
                            autoHeight
                            width={width}
                            height={height}
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            scrollTop={scrollTop}
                            rowCount={this.props.data.length}
                            rowHeight={({ index }) => {
                                if (this.props.rowHeightCalc) { return this.props.rowHeightCalc(index) }
                                return (Object.keys(this.props.data[index]).length * 20 + 20)
                            }}
                            rowRenderer={a => {
                                if (this.props.listComponent) {
                                    return this.props.listComponent({ rowObj: a, data: this.props.data[a.index]} )
                                }
                                return DefaultListComponent({rowObj: a, data: this.props.data[a.index]} )
                            }}
                        />
                    )}
                    </WindowScroller>
                )}
                </AutoSizer>
            </div>
        );
    }
}

export default InfoList;
