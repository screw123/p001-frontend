import React, {useState, useCallback} from 'react'
import styled from "styled-components"
import {useDropzone} from 'react-dropzone'
//import Compress from 'compress.js'

import request from 'superagent'
import SystemError from './SystemError.js'

import {ContrastFunctionButton} from '../component/BasicComponents'

//const c = new Compress()

export const PhotoUploader = ({containerUserInfo_id, onUploadSuccess, c})=> {

	const [success, setSuccess] = useState(true)

	

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
		setSuccess(true)
		const mf = await readFile(f[0])

		try {
			const res = await request.post('https://wisekeep.hk/api/uploadAttachment').withCredentials().attach('att', mf, f[0].name).field('containerUserInfo_id', containerUserInfo_id)
			if (res.statusCode === 200) {
				if (res.text === 'ok') {
					onUploadSuccess()
				}
				else { setSuccess(false) }
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
		accept: ['image/*'],
		maxSize: 10485760,
		minSize: 1,
		multiple: false,
		onDropAccepted: onDropAccepted
	})

	if (!containerUserInfo_id) {
		return <SystemError message="Error: Container Info ID not present" />
	}
	
	return (
		<DivWrapper {...getRootProps()}>

			<PhotoImg src='/images/ico-img.svg' />
			<input {...getInputProps()} />
			<ResponsiveText>{c.t( (c.state.width>1024) ?'Drop a file to upload, or' : 'Choose a file, or')}</ResponsiveText>
			<Button>{c.t( (c.state.width>1024) ?'Choose a file' : 'Take a picture')}</Button>
			{!success && <p>Error!</p>}
		</DivWrapper>
	)
}

const ResponsiveText = styled.div`
	margin-bottom: 15px;
`

const PhotoImg = styled.img`
	display:block;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 10px;
	width: 15%;
	@media (max-width: 1024px) {
		width: 30%;
	}
`

const DivWrapper = styled.div`
	box-sizing: border-box;
	text-align: center;
	font-size: 1rem;
	width: 290px;
	height: 140px;
	cursor: pointer
	background-color: #f8f8f8;
	background-image: url('/images/ico-img-grey.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: 120px;
	padding: 5px;
	margin 5px;
	border-radius: 10px;
	border: 1px dashed #999;
	@media (max-width: 1024px) {
		width: 140px;
		font-size: 0.8rem;
	}
`

export const Button = styled.button`
	cursor: pointer;
	border: 1px solid #D00;
	font-size: 1rem;
	border-radius: 3rem;
	padding: 0.5rem 2rem;
	min-width: 8rem;
	background: linear-gradient(180deg, #F43EA6 0%, #F5576C 100%);
	color: White;
	@media (max-width: 1024px) {
		padding: 0.5rem 1rem;
		min-width: 1rem;
		font-size: 0.8rem;
	}
`

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