import React from 'react'
import * as Styled from './styles.js'
import { connect } from 'react-redux'

const SideBar = ({users, currentUser}) => {
	const me = currentUser.username
	return ( 
		<Styled.SideBar>
			<h5>These are the people currently in your village: </h5>
			<Styled.UserList>
				{users.map((user) => {
					const isMe = me && user.username === me
					return <Styled.UserItem alive={user.status === 'alive'} isMe={isMe}> {user.username}</Styled.UserItem>
				})}
			</Styled.UserList>
		</Styled.SideBar>
	)
}


const mapStateToProps = state => {
  return {
		users: state.users,
		currentUser: state.currentUser
	};
};
export default connect(mapStateToProps)(SideBar)
