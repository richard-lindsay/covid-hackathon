import styled from "styled-components";

import {headerHeight} from '../Header/styles.js'

export const LoginBox = styled.div `
	background-color: #fff;
	margin: 30px auto auto auto;
	padding: 50px 60px;
	width: 500px;
`
export const Login = styled.div `
	width: 100%;
`
export const AccountPage = styled.div `
	height: calc(100vh - ${headerHeight});
	width: 100%;
	overflow-y: auto;
	background: #eee;
	margin: auto;
	padding: 10px;
	font-family: monospace;
	font-sixe:
`

export const LoginImage = styled.img `
	height: 150px;
	width: 150px;
	border-radius: 50%;
	overflow: hidden;
`

export const Sub = styled.p `
	font-size: 16px;
	line-height: 15px;
	margin: 5px 0 5px 0px;
`

export const Heading = styled(Sub)`
font-size: 20px
text-transform: uppercase;
font-weight: 700;
`

export const Rules = styled.div `
`