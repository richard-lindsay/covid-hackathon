import React from 'react'
import Canvas from '../Canvas/Canvas'
import SideBar from '../SideBar/SideBar'
import * as Styled from './styles.js'

const Game = ({ client, shouldBeVisible}) => {	
	const handleStartGame = () => {
		console.log('Starting Game');
		client.send(JSON.stringify({"type": "gameStart"}))
	}
	return ( 
		<Styled.Wrapper>
			{ shouldBeVisible
			? <Canvas client={client} />
			: <Styled.Night />

}
			<SideBar client={client} handleStartGame={handleStartGame} /> 
		</Styled.Wrapper>
	)

}

export default Game