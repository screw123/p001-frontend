const ListItem = (props) => {
    return (
        <div  key={props.data} style={style}>
            {props.data}
         </div>
        )
    }

export default ListItem;