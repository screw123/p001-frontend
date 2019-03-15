import React, {useCallback} from 'react'
import styled from "styled-components"
import {useDropzone} from 'react-dropzone'
//import Compress from 'compress.js'

import request from 'superagent'

//const c = new Compress()

export const PhotoUploader = ()=> {

	const onDropAccepted = useCallback(async f=> {

		/*const result = await c.compress(f, {
			size: 0.5, // the max size in MB, defaults to 2MB
			quality: .75, // the quality of the image, max is 1,
			maxWidth: 1920, // the max width of the output image, defaults to 1920px
			maxHeight: 1920, // the max height of the output image, defaults to 1920px
			resize: true, // defaults to true, set false if you do not want to resize the image width and height
		})
		console.log(result)
		const img1 = result[0]
		const base64str = img1.data
		const imgExt = img1.ext
		const file = Compress.convertBase64ToFile(base64str, imgExt)*/

		const mf = await readFile(f[0])

		
		try {
			console.log('mf=', mf)
			const res = await request.post('https://wisekeep.hk/api/uploadAttachment').withCredentials().attach('att', mf)
			if (res.statusCode === 200) {
				console.log('success, response=', res.text)
				return new Promise((resolve, reject) => resolve(true))
			}
			else if (res.statusCode === 401) {
				console.log('statusCode=401')
				return new Promise((resolve, reject) => resolve(401))
			}
			else if (res.statusCode === 413) {
				console.log('file too big')
				return new Promise((resolve, reject) => resolve(401))
			}
			else {
				console.log('statusCode unknown')
				return new Promise((resolve, reject) => resolve(500))
			}
		} catch (e) {
			console.log('caught error, ', e)
			return new Promise((resolve, reject) => resolve(500))
		}

		
		
	})

	const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
		accept: ['image/*', 'application/pdf'],
		maxSize: 10485760,
		minSize: 1,
		multiple: false,
		onDropAccepted: onDropAccepted
	})

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<p>Drag 'n' drop some files here, or click to select files</p>
		</div>
	)
}

const readFile = async inputFile => {
	const temporaryFileReader = new FileReader()

	return new Promise((resolve, reject) => {
		temporaryFileReader.onerror = () => {
			temporaryFileReader.abort()
				reject(new DOMException("Problem parsing input file."))
			}

		temporaryFileReader.onload = () => {
			const mime = temporaryFileReader.result.split(';')[0].match(/jpeg|png|gif/)[0]
			const data = temporaryFileReader.result.replace(/^data:image\/\w+;base64,/, '')
			const byteString = window.atob(data)
			const content = []
			for (let i = 0; i < byteString.length; i++) {
				content[i] = byteString.charCodeAt(i)
			}

			resolve(new Blob([new Uint8Array(content)], {type: mime}))
		}

		temporaryFileReader.readAsDataURL(inputFile)
	})
}