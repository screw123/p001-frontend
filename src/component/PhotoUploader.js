import React, {useCallback} from 'react'
import styled from "styled-components"
import {useDropzone} from 'react-dropzone'
import Compress from 'compress.js'

const c = new Compress()

export const PhotoUploader = ()=> {

	const onDrop = useCallback(async f=> {
		console.log(f)
		const result = await c.compress(f, {
			size: 0.5, // the max size in MB, defaults to 2MB
			quality: .75, // the quality of the image, max is 1,
			maxWidth: 1920, // the max width of the output image, defaults to 1920px
			maxHeight: 1920, // the max height of the output image, defaults to 1920px
			resize: true, // defaults to true, set false if you do not want to resize the image width and height
		})
		console.log(result)
		
	})

	const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
		accept: 'image/*',
		onDrop: onDrop
	})

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<p>Drag 'n' drop some files here, or click to select files</p>
		</div>
	)
}