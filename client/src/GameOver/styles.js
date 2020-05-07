import styled, { keyframes } from "styled-components";

export const Page = styled.div `
	width: 100%;
	font-family: monospace;
	display: flex;
	flex-direction: column;
	padding-bottom: 50px;
`

export const Banner = styled.div `
	border: 5px dashed gold;
	border-radius: 3px;
	padding: 20px;
	margin: 100px auto 0;
	min-width: 500px;
	width: fit-content;
	text-align: center;
	font-size: 30px;
`

export const Summary = styled.div `
	display: flex;
	justify-content: center;
	margin: 0 50px;
`

export const Column = styled.div `
	padding: 12px 20px;
	border: 5px solid black;
	min-width: 25%;
	margin: 40px;
	font-size: 21px;
	line-height: 40px;
}
`

export const ResetButton = styled.button `
	align-self: center;
	padding: 5px;
	appearance: none;
	border-radius: 3px;
	padding: 15px;
	font-size: 20px;
	background-color: #2ed1f7;
	color: white;

`

export const ConfettiWrapper = styled.div `
	width: 100%;
	height: 100%;
`
const confetti = keyframes  `
	0% { opacity: 1; transform: rotateZ(15deg) rotateY(0deg) translate(0,0); }
	25% { opacity: 1; transform: rotateZ(5deg) rotateY(360deg) translate(-5vw,20vh); }
	50% { opacity: 1; transform: rotateZ(15deg) rotateY(720deg) translate(5vw,60vh); }
	75% { opacity: 1; transform: rotateZ(5deg) rotateY(1080deg) translate(-10vw,80vh); }
	100% { opacity: 1; transform: rotateZ(15deg) rotateY(1440deg) translate(10vw,110vh);}
`
export const Confetti = styled.div`
		opacity: 0;
		width: 15px;
		height: 15px;
		background-color: #f2d74e;
		position: absolute;
		left: 50%;
		animation: ${confetti} 2s ease-in-out 5;
		transform-origin: left top;
		left: ${props => `${props.left*10}% `};

		:nth-child(10n + 1) {
			background-color: #f2d74e;
			animation-delay: 0;
		}
		:nth-child(10n + 2) {
			background-color: #95c3de; animation-delay: -2s;
		}
		:nth-child(10n + 3) {
			background-color: #ff9a91; animation-delay: -1.6s;
		}
		:nth-child(10n + 4) {
			background-color: #f2d74e; animation-delay: -0.4s;
		}
		:nth-child(10n + 5) {
			background-color: #95c3de; animation-delay: -1s;
		}
		:nth-child(10n + 6) {
			background-color: #ff9a91; animation-delay: -0.8s;
		}
		:nth-child(10n + 7) {
			background-color: #f2d74e; animation-delay: -1.4s;
		}
		:nth-child(10n + 8) {
			background-color: #95c3de; animation-delay: -1.2s;
		}
		:nth-child(10n + 9) {
			background-color: #ff9a91; animation-delay: -1.8s;
		}
		:nth-child(10n +  0) {
			background-color: #f2d74e; animation-delay: -0.6s;
		}
`

