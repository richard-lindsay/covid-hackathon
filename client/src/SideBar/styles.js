import styled, {css} from "styled-components";
export const SideBar = styled.div `
	width: 25%;
	padding: 20px;
	font-family: monospace;
`

export const UserList = styled.ul`

`

export const UserItem = styled.li `
	list-style-type: none;
	padding: 5px;
	border: 3px solid green;
	border-radius: 3px;
	margin: 5px;
	width: 33%;
	display:flex;
	font-size: 20px;
	justify-content: center;
	background: ${props => `radial-gradient(white, white, ${props.backgroundColor}, white, white)`};

	${props => 
		!props.alive && css`
			border: 3px solid red;
			opacity: 0.5;
 		`
	}
	${props => 
		props.isMe && css`
			border: 3px solid #022a92;
 		`
	}
`

export const StartButton = styled.button `
	
`