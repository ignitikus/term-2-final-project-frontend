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
      return (
         <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
         <QuestionModal 
            open={this.state.open}
            question={'Congratulations!'}
            handleClose={this.handleClose}
         />
         {this.state.finished && <Confetti />}
            <Segment disabled={this.state.open}>
               <Puzzle
                     onDone={this.handleGameFinish}
                     size = { 600 }
                     level = { 3 }
                     update={this.state.update}
                     image={this.props.gamePicture.full}
                  />
            </Segment>
         </div>
      )
   }
}
