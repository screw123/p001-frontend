import React from 'react'
import styled from 'styled-components'
import { AutoSizer, List, WindowScroller  } from 'react-virtualized';

const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.5em;
    padding: 1em;
    display: inline-block
`

const HeaderText = styled.span`
    padding: 1em;
`

const DefaultListComponent = (a, data) => (
    <div key={a.key} style={a.style}>
        {Object.keys(data).map((v)=> <span key={a.index+v}>{v + ' : ' + data[v]}</span>)}
        <div>------------</div>
    </div>
)

export class InfoList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {


        return(
            <div>
                <SectionHeader>
                    {this.props.headerIconLeft}
                    <HeaderText>{this.props.headerText}</HeaderText>
                    {this.props.headerIconRight}
                </SectionHeader>
                <AutoSizer disableHeight>
                {({width}) => (
                    <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => {
                        return(
                            <List
                                autoHeight
                                width={width}
                                height={ height }
                                isScrolling={isScrolling}
                                onScroll={onChildScroll}
                                scrollTop={scrollTop}
                                rowCount={this.props.data.length}
                                rowHeight={({index})=> Object.keys(this.props.data[index]).length*20 + 20 }
                                rowRenderer={(a) => {
                                    if (this.props.listComponent) { return this.props.listComponent(a, this.props.data[a.index]) }
                                    return DefaultListComponent(a, this.props.data[a.index])
                                }}
                            />
                        )
                    }}</WindowScroller>
                )}</AutoSizer>
            </div>
        )
    }
}

export default InfoList