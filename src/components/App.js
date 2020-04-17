import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
   constructor(props) {
      super(props)
   
      this.state = {
         text: ''
      }
   }
   
   componentDidMount(){
		axios.get(`/info`,).then((result) => {
			this.setState({text: result.data.message})
		})
   }


   render() {
      return (
         <div>
            <h1>{this.state.text}</h1>
         </div>
      )
   }
}
