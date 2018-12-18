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
);

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
                                console.log( this.props.data[a.index])
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
