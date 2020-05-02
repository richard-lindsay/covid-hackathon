import React, {useState} from 'react'
import Identicon from 'react-identicons';


const Login = ({logInUser}) => {
	const [username, setUserName] = useState('')
	return ( 
		<div className="account">
			<div className="account__wrapper">
				<div className="account__card">
					<div className="account__profile">
						<Identicon className="account__avatar" size={64} string="randomness" />
						<p className="account__name">Hello, user!</p>
						<p className="account__sub">Join to edit the document</p>
					</div>
					<input name="username" onChange={(e) => setUserName(e.target.value)} value={username} className="form-control"/>
					<button type="button" onClick={() => logInUser(username)} className="btn btn-primary account__btn">Join</button>
				</div>
			</div>
		</div>
	)
		
}


export default Login