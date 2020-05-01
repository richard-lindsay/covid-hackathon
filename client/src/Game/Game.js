import React, {useState} from 'react'
import Canvas from '../Canvas/Canvas'
import SideBar from '../SideBar/SideBar'
import * as Styled from './styles.js'

const Game = ({currentUsers}) => {
	return ( 
		<Styled.Wrapper>
			<Canvas />
			<SideBar currentUsers={currentUsers} /> 
		</Styled.Wrapper>
	)

}

export default Game