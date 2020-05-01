import React, { Component } from 'react'
import image from './canvas.jpeg'
import * as Styled from './styles.js'

class Canvas extends Component {
	constructor(props){
		super(props)
		this.state = { 
			x: 0,
			y: 0
		}

	}

	componentDidMount() {
		const canvas = this.refs.canvas
		const ctx = canvas.getContext("2d")
		this.ctx = ctx
		this.canvas=canvas
		const image = this.refs.image
		window && window.addEventListener("keydown", this.moveSomething, false);

		image.onload = () => {
			ctx.drawImage(image, 0, 0, 300, 150)
		}
		ctx.fillRect(this.state.x, this.state.y, 10, 10)

	}

 moveSomething = (e) => {
	 e.preventDefault()
	console.log(this.state);
	
	switch(e.keyCode) {
		case 37:
			this.canvas.width = this.canvas.width;

				this.setState({x: this.state.x - 5})
				this.ctx.fillRect(this.state.x, this.state.y, 10, 10)
				break;
		case 38:
				// up key pressed
				this.canvas.width = this.canvas.width;

				this.setState({y: this.state.y - 5})
				this.ctx.fillRect(this.state.x, this.state.y, 10, 10)


				break;
		case 39:
			this.canvas.width = this.canvas.width;

				// right key pressed
				this.setState({x: this.state.x + 5})
				this.ctx.fillRect(this.state.x, this.state.y, 10, 10)


				break;
		case 40:
			this.canvas.width = this.canvas.width;

				// down key pressed
				this.setState({y: this.state.y + 5})
				this.ctx.fillRect(this.state.x, this.state.y, 10, 10)

				break;  
	}   
}  


	render () {
		return (
			<Styled.CanvasContainer>
				<Styled.Canvas ref="canvas" />
				<Styled.Image src={image} ref='image' />
			</Styled.CanvasContainer>
		)
	}
}

export default Canvas