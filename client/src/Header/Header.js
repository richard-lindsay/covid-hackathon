import React from 'react'
import * as Styled from './styles.js'
import logo from './headerimg.png'
import { connect } from 'react-redux'

const Header = ({currentUser}) => {
	return (
		<Styled.HeaderContainer>
			<div>
				<Styled.Image src={logo} />

				{currentUser.username 
					? <span> Hello, {currentUser.username}</span>
					: <span> Hello! Welcome to St George's Village.</span>
				}
			</div>
			{currentUser.username && 
				<span> 
					{currentUser.role && currentUser.role !== 'unassigned' 
						? `You are a ${currentUser.role}` 
						: `Wait for your role to be dealt!`}
				</span>
			}
		</Styled.HeaderContainer>
	)

}

const mapStateToProps = state => {
  return {
		currentUser: state.currentUser
  };
};
export default connect(mapStateToProps)(Header)
