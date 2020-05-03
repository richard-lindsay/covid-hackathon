import React from 'react'
import * as Styled from './styles.js'
import { connect } from 'react-redux'

const GameOver = ({users, currentUser, gameState, client}) => {
	const isMafia = currentUser.role === 'mafia'
	const mafiaWon = gameState === 'G_S_MAFIA_WIN'
	const handleReset = () => {
		client.send(JSON.stringify({"type": "restartGame"}))
		setTimeout(() => 
			window.location.reload(false),
			500)
		}
	return (
		<Styled.Page>
			{((isMafia && mafiaWon) || (!isMafia && !mafiaWon)) && 
			<>
			<Styled.ConfettiWrapper>
				{[1,2,3,4,5,6,7,8,9,0].map(i =>
				  <Styled.Confetti key={`confetti-${i}`}/>
				)}
			</Styled.ConfettiWrapper>
			<Styled.Banner>
			🎊 You have successfully defeated the {mafiaWon ? 'village' : 'Mafia'}! 🎊
			</Styled.Banner>
			</>
			}
			{((isMafia && !mafiaWon) || (!isMafia && mafiaWon)) && 
			<>
			<Styled.Banner>
				You were defeated by the {!mafiaWon ? 'village' : 'Mafia'}! 
			</Styled.Banner>
			</>
			}
			<Styled.Summary>
				<Styled.Column>
			Villagers: 
			{
				users.filter(user => user.role !== 'mafia').map(user => {
					return (<div key={user.userId}>
						{user.status !== 'alive' ? '⚰️' : ''}
						{user.username} 
						<div style={{transform: 'scaleX(-1)', display: 'inline-block'}}>
						{user.status !== 'alive' ? '⚰️' : ''}
						</div>

					</div>)
				})
			}
			</Styled.Column>
			<Styled.Column>
			Mafia: 
			{
				users.filter(user => user.role === 'mafia').map(user => {
					return (<div key={user.id}>
						{user.status !== 'alive' ? '⚰️' : ''}
						{user.username}
						<div style={{transform: 'scaleX(-1)', display: 'inline-block'}}>
						{user.status !== 'alive' ? '⚰️' : ''}
						</div>
					</div>)
				})
			}
			</Styled.Column>
			</Styled.Summary>
			<Styled.ResetButton onClick={handleReset}>
				Start New Game
			</Styled.ResetButton>
		</Styled.Page>
	)
}

const mapStateToProps = state => {
	return {
		users: state.users,
		gameState: state.gameState,
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps)(GameOver)