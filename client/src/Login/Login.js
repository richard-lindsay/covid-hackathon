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
		</Styled.AccountPage>	)
		
}


export default Login