import React from 'react'
import styled from 'styled-components'

const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.5em;
    padding: 1em;
    display: flex
    justify-content: space-between
`
const HeaderIconLeft = styled.div`
`
const HeaderText = styled.div`
`
const HeaderIconRight = styled.div`
`


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
                    <HeaderIconLeft>{headerIconLeft}</HeaderIconLeft>
                    <HeaderText>{headerText}</HeaderText>
                    <HeaderIconRight>{headerIconRight}</HeaderIconRight>
                </SectionHeader>
                {list}
            </React.Fragment>
        )
    }

}

const ListItem = (props) => {
    const {item, width, height, itemSize} = props
    const itemKeys = Object.keys(item)
    const style = {padding: "10px 1.5em"}
    return (
        <VirtualList
            width={width}
            height={height}
            itemCount={itemKeys.length}
            itemSize={itemSize} 
            renderItem={({index}) =>
                <div key={index} style={style}> 
                    {itemKeys[index]}: {item[itemKeys[index]]}
                </div>
            }
        />
    )
}