import React, {useState} from 'react'
import Canvas from '../Canvas/Canvas'
import SideBar from '../SideBar/SideBar'
import * as Styled from './styles.js'

const Game = ({currentUsers, username, client}) => {
	console.log(username);
	
	return ( 
		<Styled.Wrapper>
			<Canvas currentUsers={currentUsers} username={username} client={client} />
			<SideBar currentUsers={currentUsers} /> 
		</Styled.Wrapper>
	)

}

export default Game