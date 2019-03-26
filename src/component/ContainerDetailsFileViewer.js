import React, {useState} from "react";
import { Grid } from "react-virtualized";
import styled, { keyframes } from "styled-components";
import {AutoSizer} from 'react-virtualized'

const MiniImg = styled.img`
	width: 150px;
	height: 150px;
	cursor: pointer
`

export const ContainerDetailsFileViewer = ({images}) => {

	const [currentImg, setCurrentImg] = useState(images? images[0] : null)

	return (
		<AutoSizer disableHeight>
			{({width}) => (
			<Grid
				cellRenderer={a => {
					return <MiniImg src={images[a.columnIndex].thumbnailURL} onClick={()=> setCurrentImg(images[a.columnIndex])} key={a.key} style={a.style} />
				}}
				columnCount={images? images.length : 0 }
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