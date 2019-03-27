import React, {useState} from "react";
import { Grid } from "react-virtualized";
import styled, { keyframes } from "styled-components";
import {AutoSizer} from 'react-virtualized'
import get from 'lodash/get'
import {PhotoUploader} from '../component/PhotoUploader.js'

const MiniImg = styled.img`
	width: 150px;
	height: 150px;
	cursor: pointer
`

const SmallBox = () =>(
	<div>
		Hello
	</div>
)

export const ContainerDetailsFileViewer = ({containerUserInfo_id, onUploadSuccess, c}) => {
	
	const images = get(containerUserInfo_id, 'uploadFiles_id', [])
	const id = get(containerUserInfo_id, '_id', undefined)

	const [currentImg, setCurrentImg] = useState(images? images[0] : null)
	const colIndexOffset = c.state.width>1024? 2:1
	return (
		<AutoSizer disableHeight>
			{({width}) => (
			<Grid
				cellRenderer={a => {
					console.log(a.columnIndex)
					//if (a.columnIndex===0) return (<SmallBox />)
					if (a.columnIndex===0) return (<PhotoUploader containerUserInfo_id={id} onUploadSuccess={onUploadSuccess} c={c}/>)
					if (a.columnIndex===1 && c.state.width>1024) return (<></>)

					return <MiniImg src={images[a.columnIndex-colIndexOffset].thumbnailURL} onClick={()=> setCurrentImg(images[a.columnIndex-colIndexOffset])} key={a.key} style={a.style} />
				}}
				columnCount={images? images.length+colIndexOffset : 0 }
				columnWidth={150}
				height={170}
				rowCount={1}
				rowHeight={150}
				width={width}
			/>
			)}
		</AutoSizer>
	)
}