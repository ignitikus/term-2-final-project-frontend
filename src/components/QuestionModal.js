import React from 'react'
import { Portal, Segment, Header, Button } from 'semantic-ui-react'
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
            <Header style={{fontSize: '2rem'}}>Do you like the picture?</Header>
            <div>
               <Button 
                  inverted 
                  className='yay-button' 
                  size='massive' 
                  color='green'
                  onClick={props.handleYay}
               >Yay</Button>
               <Button 
                  inverted 
                  className ='nay-button' 
                  size='massive' 
                  color='red'
                  onClick={props.handleNay}
               >Nay</Button>
            </div>
         </Segment>
      </Portal>
   )
}
