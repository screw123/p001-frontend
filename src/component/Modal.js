//Modal component

import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClickIcon } from './BasicComponents.js'

const roundRadiusREM = 2

const ModalBG = styled.div`
	display: ${props => (props.show ? 'block' : 'none')};
	position: fixed;
	z-index: 10;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.6);
`

const ModalBody = styled.div`
	background-color: white;
	margin: 3% auto;
	padding: 2rem;
	width: 95%;
	box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.4), 0 0.3rem 1.2rem 0 rgba(0, 0, 0, 0.2);
	border-radius: ${roundRadiusREM}rem;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	margin: 1rem 0;
	border-bottom: 2px solid #e8e8e8;
`

export const Title = styled.div`
	color: #787f84;
	font-size: 1.75rem;
	font-weight: 600;
	line-height: 2rem;
`

const CloseIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2rem;
	width: 2rem;
	font-size: 1.5rem;
	color: #e61d6e;
	border: 2px solid #e61d6e;
	border-radius: 50%;
	cursor: pointer;
`

const Content = styled.div``

const Footer = styled.div`
	padding: ${roundRadiusREM / 2}rem;
	justify-content: center;
	background-color: #f47;
	border-radius: 0 0 ${roundRadiusREM}rem ${roundRadiusREM}rem;
`

const Modal = ({ component, content, title, closeModal, footerButtons, hideTitle, ...props }) => (
	<ModalBG {...props}>
		<ModalBody>
			{!hideTitle && (
				<Header hasTitle={title}>
					<Title>{title}</Title>
					{closeModal && (
						// <ClickIcon icon='window-close' onClick={closeModal} float='right' />
						<CloseIcon onClick={closeModal}>
							<FontAwesomeIcon icon='times' />
						</CloseIcon>
					)}
				</Header>
			)}
			<Content>
				{component}
				{content}
			</Content>
			{!!footerButtons && <Footer>{footerButtons}</Footer>}
		</ModalBody>
	</ModalBG>
)

export default Modal
