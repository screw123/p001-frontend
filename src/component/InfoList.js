import React from 'react'
import {SectionHeader} from './Background.js'
import InfoList from '../form/InfoList.js'
import VirtualList from 'react-tiny-virtual-list'

export default class InfoList extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let list
        const {
                data,
                header,
                renderComponent,
                width,
                height,
                itemSize
            } = this.props
        
        if(typeof (renderComponent) == 'undefined') {
            list = data.map((item) => (
                <InfoList data={item} />
            ))
        } else {
            list = data.map((item) => (
                <renderComponent data={item}/>
            ))
        }

        return(
            <React.Fragment>
                <SectionHeader>
                    {header}
                </SectionHeader>
                <VirtualList
                    width={width}
                    height={height}
                    itemCount={data.length}
                    itemSize={itemSize} 
                    renderItem = {list}
                />
            </React.Fragment>
        )
    }

}