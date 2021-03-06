import React from 'react'
import * as Styled from './styles.js'
import logo from './headerimg.png'
import { connect } from 'react-redux'

const Header = ({currentUser = {}, gameState, triggerNightTime}) => {
	
	return (
		<Styled.HeaderContainer>
			<div>
				<Styled.Image src={logo} />

				{currentUser.username 
					? <span> Hello, {currentUser.username}</span>
					: <span> Hello! Welcome to St George's Village.</span>
				}
			</div>
			{ gameState === 'G_S_START' && currentUser.role && currentUser.role !== 'unassigned' &&
				<Styled.NightButton onClick={triggerNightTime}>Trigger Night Time</Styled.NightButton>
			}
			{currentUser.username && 
				<span> 
					{currentUser.role && currentUser.role !== 'unassigned' 
						? `You ${currentUser.status === 'alive' ? 'are' : 'were'} a ${currentUser.role}. ${currentUser.status !== 'alive' ? 'You are now dead' : ''}` 
						: `Wait for your role to be dealt!`}
				</span>
			}
		</Styled.HeaderContainer>
	)

}

const mapStateToProps = state => {
  return {
		currentUser: state.currentUser,
		gameState: state.gameState
  };
};
export default connect(mapStateToProps)(Header)
