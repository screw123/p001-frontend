import React from 'react'
import styled from 'styled-components'
import { AutoSizer, List, WindowScroller  } from 'react-virtualized';
import {Section} from './BasicComponents.js'

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
    grid-template-columns: [s1] 2.5% [content] auto [end] 2.5% [s2];
    overflow: hidden;
    min-width: 300px;
`

const ContentDiv = styled.div`
    grid-column: content / end;
    overflow: visible;
    display: ${({occupyFullRow})=>occupyFullRow? 'block':'inline-block'};
    cursor: pointer;
    border: Silver;
    border-width: 2px;
    border-style: ${({showTopBorder})=>showTopBorder?'solid':'hidden'} hidden ${({showBottomBorder})=>showBottomBorder?'solid':'hidden'} hidden;
`

export const InfoListStandardLine = ({key1, style, content, contentOnClick, occupyFullRow, showBottomBorder, ...props}) => {
    return(<OuterWrapper key={key1} style={style} {...props}>
        <ContentDiv onClick={contentOnClick} occupyFullRow={occupyFullRow} showBottomBorder={showBottomBorder}>
            {content}
        </ContentDiv>
    </OuterWrapper>)
}

class InfoList extends React.Component {
/*
selected
*/


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Section {...this.props}/>
                <AutoSizer disableHeight>
                {({ width }) => (
                    <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <InfoListChild
                            width={width}
                            height={height}
                            isScrolling={isScrolling}
                            onChildScroll={onChildScroll}
                            scrollTop={scrollTop}
                            {...this.props} />
                    )}
                    </WindowScroller>
                )}
                </AutoSizer>
            </div>
        )
    }

}

class InfoListChild extends React.Component {
    constructor(props) {
        super(props)
        this.setListToState = this.setListToState.bind(this)
        this.state = {listComponent: undefined}
    }
    setListToState = (ref) => this.setState({listComponent: ref})

    componentDidUpdate(prevProps, prevState) {

        if (this.props.refreshRowHeight) {
            if (prevProps.width !== this.props.width) {
                this.state.listComponent.recomputeRowHeights()
            }
            
        }
    }
    
    render() { return(
        <List
            autoHeight
            width={this.props.width}
            height={this.props.height}
            isScrolling={this.props.isScrolling}
            onScroll={this.props.onChildScroll}
            scrollTop={this.props.scrollTop}
            rowCount={this.props.data.length}
            rowHeight={({ index }) => {
                if (this.props.rowHeightCalc) { return this.props.rowHeightCalc(index, this.props.width) }
                return (Object.keys(this.props.data[index]).length * 20 + 20)
            }}
            rowRenderer={a => {
                if (this.props.listComponent) {
                    return this.props.listComponent({ rowObj: a, data: this.props.data[a.index], selected: this.props.selected} )
                }
                return DefaultListComponent({rowObj: a, data: this.props.data[a.index]} )
            }}
            ref={(this.props.refreshRowHeight) ? this.setListToState : undefined}
        />
    )}
}

export default InfoList;
