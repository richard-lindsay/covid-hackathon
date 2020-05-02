import React from 'react'
import Canvas from '../Canvas/Canvas'
import SideBar from '../SideBar/SideBar'
import * as Styled from './styles.js'

const Game = ({ client, shouldBeVisible}) => {	
	return ( 
		<Styled.Wrapper>
			{ shouldBeVisible 
			? <Canvas client={client} />
			: <Styled.Night/>

}
			<SideBar /> 
		</Styled.Wrapper>
	)

}

export default Game