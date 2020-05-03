import styled from "styled-components";

export const Page = styled.div `
	width: 100%;
	font-family: monospace;
	display: flex;
	flex-direction: column;
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