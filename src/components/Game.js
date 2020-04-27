import React, {Component} from 'react'
import Puzzle from 'react-image-puzzle'
import Confetti from 'react-confetti'
import { Segment } from 'semantic-ui-react'

import QuestionModal from './QuestionModal'

export default class Nav extends Component{
      state = {
         finished: false,
         open: false,
      }
   
   handleClose = () => this.setState({ open: false, finished: false })
   handleGameFinish = () => this.setState({finished: true, open: true})
   
   render(){
      const {height} = this.props
      const {open, finished} = this.state
      return (
         <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent:'center'}}
         >
         <QuestionModal 
            open={open}
            question={'Congratulations!'}
            handleClose={this.handleClose}
         />
         {finished && <Confetti />}
            <Segment disabled={open}>
               <Puzzle
                     onDone={this.handleGameFinish}
                     size = { height*85/100 }
                     level = { 3 }
                     image={this.props.gamePicture.full}
                  />
            </Segment>
         </div>
      )
   }
}
