import React, {useState} from 'react'
import * as Styled from './styles.js'
import logo from './headerimg.png'

const Header = ({userName ='', role= 'mafia'}) => {
	return (
		<Styled.HeaderContainer>
			<div>
			<Styled.Image src={logo} />

			{userName ?
				<span> Hello, {userName}</span>
			: <span> Hello! Welcome to St George's Village.</span>
			}
			</div>
			<span> {role ? `You are a ${role}` : `Wait for your role to be dealt!`}</span>
		</Styled.HeaderContainer>
	)

}

export default Header