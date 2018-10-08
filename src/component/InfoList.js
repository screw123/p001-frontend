import React from 'react'
import styled from 'styled-components'
import VirtualList from 'react-tiny-virtual-list'

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

        return(
            <div>
                <SectionHeader>
                    <HeaderIconLeft>{headerIconLeft}</HeaderIconLeft>
                    <HeaderText>{headerText}</HeaderText>
                    <HeaderIconRight>{headerIconRight}</HeaderIconRight>
                </SectionHeader>
                <VirtualList
                    width={width}
                    height={height}
                    itemCount={this.props.data.length}
                    itemSize={itemSize} 
                    renderItem={({index, style}) => {
                        if (renderComponent) { return <renderComponent index={index} style={style} /> }
                        else {
                            console.log(style)
                            return (
                                <DefaultListItem style={style}>
                                    {Object.keys(this.props.data[index]).map((k)=> <div>{k+' : '+this.props.data[index][k]}</div>)}
                                </DefaultListItem>
                            )
                        }
                    }}
                />
            </div>
        )
    }

}

const DefaultListItem = styled.div`
`