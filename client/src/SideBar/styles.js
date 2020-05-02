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
	justify-content: center;

	${props => 
		!props.alive && css`
			border: 3px solid red;
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