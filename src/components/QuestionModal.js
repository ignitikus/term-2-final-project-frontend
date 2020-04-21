import React from 'react'
import { Portal, Segment, Header, Button, Icon, Image } from 'semantic-ui-react'
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
            {props.currentPicture &&
               <Image style={{maxWidth: '80vw', maxHeight: '70vh'}} src={props.currentPicture}/>
            }
               {props.option1 && 
                  <Button 
                     inverted 
                     className='yay-button' 
                     size='massive' 
                     color={props.option1Color}
                     onClick={props.handleOption1}
                  >
                  {props.icon1 &&
                     <Icon name={props.icon1}/>
                  }
                  {props.option1}</Button>
               }
               {props.option2 && 
                  <Button 
                     inverted 
                     className ='nay-button' 
                     size='massive' 
                     color='red'
                     onClick={props.handleOption2}
                  >
                  {props.icon2 &&
                     <Icon name={props.icon2}/>
                  }
                  {props.option2}</Button>
               }
            </div>
         </Segment>
      </Portal>
   )
}
