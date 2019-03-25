import React, {useState} from "react";
import { Grid } from "react-virtualized";
import styled, { keyframes } from "styled-components";


const GalleryGrid = styled.div`
	display: grid;
	grid-template-rows: 3fr 1fr;
`

const MidSizeImg = styled.img`
	cursor: pointer
	
`

const MiniImg = styled.img`
	width: 100px;
	height: 100px;
	cursor: pointer
`

export const ContainerDetailsFileViewer = ({images}) => {

	const [currentImg, setCurrentImg] = useState(images? images[0] : null)

	return (
		<GalleryGrid>
			<MidSizeImg src={currentImg ? currentImg.thumbnailURL : '/images/box.PNG'} />
			<Grid
				cellRenderer={a => {
					return <MiniImg src={images[a.columnIndex].thumbnailURL} onClick={()=> setCurrentImg(images[a.columnIndex])} />
				}}
				columnCount={images? images.length : 0 }
				columnWidth={100}
				height={100}
				rowCount={1}
				rowHeight={100}
				width={300}
			/>

		</GalleryGrid>
	)
}