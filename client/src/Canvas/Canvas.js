import React, { useEffect, useRef, useState } from 'react'
import {connect} from 'react-redux'

import image from './canvas.jpeg'
import * as Styled from './styles.js'

const Canvas = ({users, currentUser, client}) => {
	const [myxPosition, setxPosition] = useState(currentUser.position[0])
	const [myyPosition, setyPosition] = useState(currentUser.position[1])

	const canvasRef = useRef(null)
	const imageRef = useRef(null)
	let ctx
	let canvas


	useEffect(() => {
		canvas = canvasRef.current
		ctx = canvas.getContext("2d")
		const image = imageRef.current
		window && window.addEventListener("keydown", moveMyself, false);
		
		// image.onload = () => {
		// 	ctx.drawImage(image, 0, 0, 300, 150)
		// }
		return () => window.removeEventListener("keydown", moveMyself);

		})
	useEffect(() => {
		canvas.width = canvas.width;

		users.forEach(user => {
			ctx.beginPath();
			ctx.rect(user.position[0], user.position[1], 10, 10)
			ctx.lineWidth = 8;
			ctx.strokeStyle = 'black';
			ctx.closePath();
			ctx.stroke();
		})
	}, [users, currentUser])

 const moveMyself = (e) => {
	e.preventDefault()
	switch(e.keyCode) {
		case 37:
			canvas.width = canvas.width;
			// left key pressed
			setxPosition(myxPosition - 5)
			setyPosition(myyPosition)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition-5, myyPosition]}))
			break;
		case 38:
			canvas.width = canvas.width;
			// up key pressed
			setxPosition(myxPosition)
			setyPosition(myyPosition - 5)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition, myyPosition - 5]}))
			break;
		case 39:
			canvas.width = canvas.width;
			// right key pressed
			setxPosition(myxPosition + 5)
			setyPosition(myyPosition)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition + 5, myyPosition]}))
			break;
		case 40:
			canvas.width = canvas.width;

			// down key pressed
			setxPosition(myxPosition)
			setyPosition(myyPosition + 5)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition, myyPosition + 5]}))
			break;  
	}   
}  


	return (
		<Styled.CanvasContainer>
			<Styled.Canvas ref={canvasRef} />
			<Styled.Image src={image} ref={imageRef}/>
		</Styled.CanvasContainer>
	)

}


const mapStateToProps = state => {

  return {
		users: state.users,
		currentUser: state.currentUser
  };
};
export default connect(mapStateToProps)(Canvas)