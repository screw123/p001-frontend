import React from 'react'
import VirtualList from 'react-tiny-virtual-list'

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

export default ListItem;