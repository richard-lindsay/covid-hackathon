import styled from "styled-components";
import img from './daycanvas.jpg';
import night from '../Game/canvas.jpeg';

export const Image  = styled.img`
	display: none;
`

export const Canvas = styled.canvas `
	height: 110%;
	width: 100%;
	background: url(${props.night ? night :img}) repeat 0 0;
	background-size: cover;
`

export const CanvasContainer = styled.div ` 
	width: 75%;
`