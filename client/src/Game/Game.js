import React from 'react'
import Canvas from '../Canvas/Canvas'
import SideBar from '../SideBar/SideBar'
import GameOver from '../GameOver/GameOver'

import * as Styled from './styles.js'
import { connect } from 'react-redux'

const Game = ({ client, shouldBeVisible, gameState}) => {	
	const handleStartGame = () => {
		console.log('Starting Game');
		client.send(JSON.stringify({"type": "gameStart"}))
	}
	return ( 
		<Styled.Wrapper>
			{gameState.includes('WIN') 
			? <GameOver client={client} />
			: <> {shouldBeVisible
				? <Canvas client={client} />
				: <Styled.NightContainer>
						<Styled.Night />
					</Styled.NightContainer>}
					
				<SideBar client={client} handleStartGame={handleStartGame} /></> 
				}
		</Styled.Wrapper>
	)

}

const mapStateToProps = state => {
	return { 
		gameState: state.gameState
	}
}
export default connect(mapStateToProps)(Game)