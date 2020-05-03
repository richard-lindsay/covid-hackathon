import React from 'react'
import * as Styled from './styles.js'
import { connect } from 'react-redux'
import Confetti from 'react-confetti'

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
			<Confetti recycle={false} />
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
					return (<Styled.UserItem>
						{user.status !== 'alive' ? '⚰️' : ''}
						{user.username} 
						<div style={{transform: 'scaleX(-1)', display: 'inline-block'}}>
						{user.status !== 'alive' ? '⚰️' : ''}
						</div>

					</Styled.UserItem>)
				})
			}
			</Styled.Column>
			<Styled.Column>
			Mafia: 
			{
				users.filter(user => user.role === 'mafia').map(user => {
					return (<Styled.UserItem>
						{user.status !== 'alive' ? '⚰️' : ''}
						{user.username}
						<div style={{transform: 'scaleX(-1)', display: 'inline-block'}}>
						{user.status !== 'alive' ? '⚰️' : ''}
						</div>
					</Styled.UserItem>)
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