import styled from "styled-components";
import img from './canvas.jpeg';

export const Wrapper = styled.div`
	display: flex;
`
export const Night = styled.img `
	width: 75%;
	height: 100vh;
	background: repeat url(${img}) 0 0;
	background-size: contain;
`

