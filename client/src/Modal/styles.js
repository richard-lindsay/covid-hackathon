import styled from "styled-components";

export const ModalWrapper = styled.div`
	display: ${props => props.show ? 'block' : 'none'}; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; 
	height: 100%; 
	background-color: rgb(0,0,0); 
	background-color: rgba(0,0,0,0.4); 
`

export const ModalContent = styled.div`
	background-color: white;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
	text-align: center;
`