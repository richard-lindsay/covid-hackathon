import styled from "styled-components";

import {headerHeight} from '../Header/styles.js'
// .account {
// 	height: 100vh;
// 	width: 100%;
// 	min-height: 100vh;
// 	display: flex;
// 	overflow-y: auto;
// background: #eee;
// }
// .account__wrapper {
// 	margin: auto;
// 	padding: 10px;
// }

export const LoginBox = styled.div `
	background-color: #fff;
	margin: 30px auto auto auto;
	padding: 50px 60px;
	width: 500px;


`

export const AccountPage = styled.div `
	height: calc(100vh - ${headerHeight});
	width: 100%;
	display: flex;
	overflow-y: auto;
	background: #eee;
	margin: auto;
	padding: 10px;
`
