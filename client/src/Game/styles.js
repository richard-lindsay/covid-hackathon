import styled from "styled-components";
import img from './canvas.jpeg';

export const Wrapper = styled.div`
	display: flex;
`
export const NightContainer = styled.div ` 
	width: 75%;
`
export const Night = styled.div `
	width: 100%;
	height: 110vh;
	background: no-repeat url(${img}) 0 0;
	background-size: contain;
`

