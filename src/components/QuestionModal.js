import React from 'react'
import { Portal, Segment, Header, Button, Icon } from 'semantic-ui-react'
import './QuestionModal.css'

export default function QuestionModal(props) {
   return (
      <Portal onClose={props.handleClose} open={props.open}>
         <Segment
            style={{
               position: 'absolute',
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)',
               zIndex: 1000,
               display:'flex',
               flexDirection: 'column',
               alignItems:'center'
            }}
         >
            <Header style={{fontSize: '2rem'}}>{props.question}</Header>
            <div>
               {props.option1 && 
                  <Button 
                     inverted 
                     className='yay-button' 
                     size='massive' 
                     color='green'
                     onClick={props.handleOption1}
                  ><Icon name='thumbs up outline'/>{props.option1}</Button>
               }
               {props.option2 && 
                  <Button 
                     inverted 
                     className ='nay-button' 
                     size='massive' 
                     color='red'
                     onClick={props.handleOption2}
                  ><Icon name='thumbs down outline'/>{props.option2}</Button>
               }
            </div>
         </Segment>
      </Portal>
   )
}
