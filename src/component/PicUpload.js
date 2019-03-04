import React, { Component } from "react"
import styled from "styled-components"
import { FilePond, registerPlugin } from "react-filepond"
import "./filepond.css"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

import {CustomField, Container, ContainerHeader, ButtonsDiv, StandardFieldsDiv, CustomFieldsDiv, BoxType, Text, RelatedAccount, DateOnly} from '../component/ContainerDetails.js'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



const UploadWrapper = styled.div`
	width: ${({size})=>size*1.5}rem
	height: ${({size})=>size}rem
`

export const PicUpload = ({size=5, ...props}) => {
	
	
	return (
		<UploadWrapper size={size}>
			<FilePond
				{...props}
			/>
		</UploadWrapper>
	)	
}