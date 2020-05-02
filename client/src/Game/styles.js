import styled from "styled-components";
import img from './canvas.jpeg';

export const Wrapper = styled.div`
	display: flex;
`
export const Night = styled.img `
	width: 75%;
	height: 110%;
	background: repeat ${img} 0 0;
	background-size: contain;
`

