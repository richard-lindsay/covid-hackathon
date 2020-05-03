import React from 'react'
import * as Styled from './styles.js'
import { connect } from 'react-redux'
import template from './template'
const SideBar = ({users, currentUser, handleStartGame= () => {}, gameState, client}) => {
	const me = currentUser.username
	const handleKill = () => {
		switch (currentUser.role.toLowerCase()) {
			case 'mafia':
				client.send(JSON.stringify({type: 'mafiaKill', toKill: currentUser.closestUser}))
				break;
			case 'detective':
				client.send(JSON.stringify({type: 'detectiveCheck', toCheck: currentUser.closestUser }))
				break;
			case 'doctor':
				client.send(JSON.stringify({type: 'doctorSave', toSave: currentUser.closestUser}))
				break;
			default: 
	}
	}

	const handleLynch = () => {
		client.send(JSON.stringify({type: 'villagerLynch', toLynch: currentUser.closestUser}))

	}
	if (gameState.toLowerCase().includes(currentUser.role.substring(0,3))  && 
		gameState.includes('CHOOSE') && currentUser.status !== 'alive') {
			setTimeout(() => {
			handleKill()
		}, 3000);
	}

	return ( 

		<Styled.SideBar>

			{gameState.toLowerCase().includes(currentUser.role.substring(0,3))  && 
			gameState.includes('CHOOSE') && currentUser.status === 'alive' &&
				 <>
					<h5> {template[currentUser.role].start}
						<br/>
						{template[currentUser.role].mid}
					</h5>
					<p>When you're ready: <button onClick={handleKill}>{template[currentUser.role].button}</button></p>
				</> 
				 }
				 {gameState.toLowerCase().includes(currentUser.role.substring(0,3))  && 
					gameState.includes('RETURN') && currentUser.status === 'alive' &&
						<h5> Hurry back to where you started so they don't notice you moved!</h5>
				 }
			{currentUser.status !== 'alive' &&
			<h5> You are dead. </h5>
			}
			{gameState === 'G_S_DAY' && currentUser.status === 'alive' &&
				<>
					<h5> {template['lynch'].start}
						<br/>
						{template['lynch'].mid}
					</h5>
					<p>When you're ready: <button onClick={handleLynch}>{template['lynch'].button}</button></p>
				</> 
				 }
			<h5>These are the people currently in your village: </h5>
			<Styled.UserList>
				{users.map((user) => {
					const isMe = me && user.username === me
					const isAlive = user.status === 'alive'
					const closest = user.userId === currentUser.closestUser
					return (
					<Styled.UserItem key={user.userId} alive={isAlive} isMe={isMe} closest={closest}>
						 {!isAlive && `💀`}{user.username}{!isAlive && `💀`}<Styled.Circle backgroundColor={user.color}/> </Styled.UserItem>
						 )
				})}


				{gameState === 'G_S_PREGAME' 
				&& users.length > 3 &&
				<div>
					Everyone here? 
					<Styled.StartButton onClick={handleStartGame}>
						Start Game
					</Styled.StartButton>
				</div>
				}
			</Styled.UserList>
		</Styled.SideBar>
	)
}


const mapStateToProps = state => {
  return {
		users: state.users,
		currentUser: state.currentUser,
		gameState: state.gameState
	};
};
export default connect(mapStateToProps)(SideBar)
