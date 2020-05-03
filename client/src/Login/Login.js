import React, {useState} from 'react'
import logo from '../Header/headerimg.png'
import * as Styled from './styles.js'
import styled from 'styled-components'

const Login = ({logInUser}) => {
	const [username, setUserName] = useState('')
	return ( 
		<Styled.AccountPage>
			<Styled.Login>
				<Styled.LoginBox >
					<div className="account__profile">
						<Styled.LoginImage src={logo} size={64} />
						<Styled.Heading >Hello, villager!</Styled.Heading>
						<Styled.Sub>Welcome to St George's Village, please input your name to enter.</Styled.Sub>
					</div>
					<input name="username" onChange={(e) => setUserName(e.target.value)} value={username} className="form-control"/>
					<button type="button" onClick={() => logInUser(username)} className="btn btn-primary account__btn">Join</button>
				</Styled.LoginBox>
			</Styled.Login>
				<Styled.Rules>
					<h3>The Roles: </h3>
					<p><strong>Mafia: </strong>Will kill other players and try to convince other players who the mafia is without revealing themselves</p>
					<p><strong>Doctor: </strong>Can save themself and others</p>
					<p><strong>Detective: </strong>Chooses any other player and will be told if the player is a member of the mafia or not; uses their power to sway public opinion</p>
					<p><strong>Villager: </strong>The most basic role, who votes and tries to figure out the mafias and vote them off</p>

Obviously you don't want to reveal your roles of you have an important one but rather convince others you are a villager.
<br/>
<h3>Rules and gameplay:</h3>
Once all players are in, select start game then trigger night. Throughout the night, the mafia will choose to kill a player,
the doctor will try to save a player and the detetive will try to discover who the mafia is. 
You must move your player to select the closest player to perform an action on (mafia: kill; doctor: save; detective: check; all: lynch)
<br/>
Once all night time events have taken place, it will become day time again and you will discover who, if anyone, has died.
During day time you need to decide who the collective village belives is the Mafia and one person must choose to lynch one player.
<br/>
The aim of the game is for your 'team' to win: if you are mafia you want a village left with more mafia than villagers.
If you are a villager you want to kill all the mafia.
<br/>
<br/>

Mafia can only choose one target per round (all mafia vote on 1 target, one mafia member selects kill)
Showing your screen to other players is cheating.
<br/>
<strong>IMPORTANT:</strong> In real life, the dead can not speak. Common saying of course. So in the game, the dead are not allowed to influence the town through speech or physical gestures. It is cheating.
				</Styled.Rules>
		</Styled.AccountPage>	)
		
}


export default Login