import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			order: 3,
			matrix: [],
			result: ""
		}
	}
	componentDidMount() {
		this.changeOrder({target: {value: 3}})
	}
	changeOrder = e => {
		let newOrder = Math.max(e.target.value, 1)
		let newMatrix = Array(newOrder)
		for (var i = 0; i < newOrder; i++)
			newMatrix[i] = Array(newOrder).fill(0)
		this.setState({order: newOrder, matrix: newMatrix})
	}
	changeValue = (e, row, col) => {
		let newMatrix = this.state.matrix
		newMatrix[row][col] = e.target.value || 0
		this.setState({matrix: newMatrix})
	}
	check = () => {
		if(checkOrthogonal(this.state.matrix, this.state.order))
			this.setState({result: "The matrix IS orthogonal!"})
		else
			this.setState({result: "The matrix IS NOT orthogonal!"})
	}
	render = () => (
		<div className="App">
			<div className = "header">
				<h3>Check whether a square matrix is orthogonal</h3>
			</div>
			<div className = "background bg-top" />
			<div className = "background bg-bottom" />
			<div className = "body">
				<div><h5><strong>Select Order of Matrix</strong></h5></div>
				<input className = "order" type = "number" value = {this.state.order} onChange = {this.changeOrder} />
				<div style = {{paddingTop: "10px"}}/>
				<div><h6><strong>Enter matrix values</strong></h6></div>
				<table style = {{display: "block"}}>
					{this.state.matrix.map((row, rowIndex) => (
						<tr>
							{row.map((val, colIndex) => (
								<input required className = "value" value = {val} type = "number" onChange = {e => this.changeValue(e, rowIndex, colIndex)} />
							))}
						</tr>
					))}
				</table>
				<Button variant = "light" onClick = {this.check}>Is it orthogonal?</Button>
				<div style = {{paddingTop: "10px"}}/>
				{this.state.result}
			</div>
			<div className = "footer">
				Prepared by Nishith G. Behera (118EE0277)
			</div>
		</div>
	)
}

const checkOrthogonal = (matrix, order) => {
	for (var i = 0; i < order; i++){
		for (var j = 0; j < order; j++){
			var sum = 0;
			for (var k = 0; k < order; k++)
				sum += matrix[i][k] * matrix[j][k];
			if((i === j && sum !== 1) || (i !== j && sum !== 0))
				return false;
		}
	}
	return true;
}

export default App;
