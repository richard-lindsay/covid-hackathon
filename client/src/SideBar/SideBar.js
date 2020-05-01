import React, {useState} from 'react'
import * as Styled from './styles.js'

const SideBar = ({currentUsers}) => {
	return ( 
		<Styled.SideBar>
			<h5>These are the people currently in your village: </h5>
			<Styled.UserList>
				{currentUsers.map((user) => {
					return <Styled.UserItem> {user.username}</Styled.UserItem>
				})}
			</Styled.UserList>
		</Styled.SideBar>
	)
}

export default SideBar