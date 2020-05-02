import React from 'react'
import * as Styled from './styles.js'

export const Modal = ({show, message}) => {
	return (
		<Styled.ModalWrapper show={show} >
			<Styled.ModalContent>
				{message}
			</Styled.ModalContent>
		</Styled.ModalWrapper>
	)
}