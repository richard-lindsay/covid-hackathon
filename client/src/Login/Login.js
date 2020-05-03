import React, {useState} from 'react'
import logo from '../Header/headerimg.png'
import * as Styled from './styles.js'

const Login = ({logInUser}) => {
	const [username, setUserName] = useState('')
	return ( 
		<Styled.AccountPage>
				<Styled.LoginBox >
					<div className="account__profile">
						<img src={logo} className="account__avatar" size={64} />
						<p className="account__name">Hello, villager!</p>
						<p className="account__sub">Welcome to St George's Village, please input your name to enter.</p>
					</div>
					<input name="username" onChange={(e) => setUserName(e.target.value)} value={username} className="form-control"/>
					<button type="button" onClick={() => logInUser(username)} className="btn btn-primary account__btn">Join</button>
				</Styled.LoginBox>
		</Styled.AccountPage>	)
		
}


export default Login