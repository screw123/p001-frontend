import React from 'react'
import {SectionHeader, HIL, HT, HIR} from './Background.js'
import ListItem from '../form/ListItem.js'

export default class InfoList extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let list, propsData
        const {
            data,
            headerIconLeft,
            headerText,
            headerIconRight,
            renderComponent,
            width,
            height,
            itemSize
        } = this.props
        
            
        if(typeof (renderComponent) == 'undefined') {
            list = this.props.data.map((item, i) => {
            propsData = {item, width, height, itemSize}
            return (
                <div key={i}>
                    <ListItem {...propsData} />
                </div>
                )
            })
        } else {
            list = data.map((item) => (
                <renderComponent data={item}/>
            ))
        }

        return(
            <React.Fragment>
                <SectionHeader>
                    <HIL>{headerIconLeft}</HIL>
                    <HT>{headerText}</HT>
                    <HIR>{headerIconRight}</HIR>
                </SectionHeader>
                {list}
            </React.Fragment>
        )
    }

}