import React, { useEffect, useRef, useState } from 'react'
import {connect} from 'react-redux'
import img from './face.png'
import ghostImg from './ghost.png'
import * as Styled from './styles.js'

const Canvas = ({users, currentUser, client, gameState}) => {
	const [myxPosition, setxPosition] = useState(currentUser.position[0])
	const [myyPosition, setyPosition] = useState(currentUser.position[1])

	const canvasRef = useRef(null)
	const imageRef = useRef(null)
	const ghostImageRef = useRef(null)
	let ctx
	let canvas
	let image
	let ghost

	useEffect(() => {
		canvas = canvasRef.current
		ctx = canvas.getContext("2d")
		window && window.addEventListener("keydown", moveMyself, false);
		
		return () => window.removeEventListener("keydown", moveMyself);

		})
	useEffect(() => {
		canvas.width = canvas.width;
		image = imageRef.current
		ghost = ghostImageRef.current
		users.forEach(user => {
			
			if (user.status === 'dead') {
				ctx.drawImage(ghost, user.position[0], user.position[1], 10, 10);
				return
			}
			ctx.fillStyle = user.color;
			ctx.fillRect(user.position[0], user.position[1], 10, 10)
			ctx.drawImage(image, user.position[0], user.position[1], 10, 10);

			if (user.userId === currentUser.closestUser) {

				ctx.beginPath();
				ctx.strokeStyle = "green";
				ctx.rect(user.position[0], user.position[1], 10, 10)
				ctx.lineWidth = 1;
				ctx.closePath();
				ctx.stroke();
				ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.rect(user.position[0], user.position[1], 10, 10)
				ctx.lineWidth = 0.2;
				ctx.closePath();
				ctx.stroke();

				}
		})
	}, [users, currentUser])

 const moveMyself = (e) => {
	let newx
	let newy
	switch(e.keyCode) {
		case 37:
			e.preventDefault()

			canvas.width = canvas.width;
			// left key pressed
			newx = myxPosition - 5 > 0 ? myxPosition - 5 : myxPosition
			setxPosition(newx)
			setyPosition(myyPosition)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition-5, myyPosition]}))
			break;
		case 38:
			e.preventDefault()

			canvas.width = canvas.width;
			// up key pressed
			newy = myyPosition - 5 > 0 ? myyPosition - 5 : myyPosition

			setxPosition(myxPosition)
			setyPosition(newy)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition, myyPosition - 5]}))
			break;
		case 39:
			e.preventDefault()

			canvas.width = canvas.width;
			// right key pressed
			newx = myxPosition + 5 < canvas.width ? myxPosition + 5 : myxPosition

			setxPosition(newx)
			setyPosition(myyPosition)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition + 5, myyPosition]}))
			break;
		case 40:
			e.preventDefault()

			canvas.width = canvas.width;

			// down key pressed
			newy = myyPosition + 5 < canvas.width ? myyPosition + 5 : myyPosition

			setxPosition(myxPosition)
			setyPosition(newy)
			client.send(JSON.stringify({type: 'userMoved', position: [myxPosition, myyPosition + 5]}))
			break;  
	}   
}  


	return (
		<Styled.CanvasContainer>
			<Styled.Canvas ref={canvasRef} night={gameState.includes('G_S_N')} />
			<img src={img} ref={imageRef}  style={{display: 'none'}}/>
			<img src={ghostImg} ref={ghostImageRef}  style={{display: 'none'}}/>
		</Styled.CanvasContainer>
	)

}


const mapStateToProps = state => {

  return {
		users: state.users,
		currentUser: state.currentUser,
		gameState: state.gameState
  };
};
export default connect(mapStateToProps)(Canvas)