import React from 'react'
import { Portal, Segment, Header, Button, Icon, Image } from 'semantic-ui-react'
import './utils/styles/QuestionModal.css'

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
            <Header style={{fontSize: '2rem', textAlign: 'center'}}>{props.question}</Header>
            <div>
            {props.currentPicture &&
               <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                  <Image style={{maxWidth: '90vw', maxHeight: '80vh', marginBottom: '5px'}} src={props.currentPicture}/>
               </div>
            }
               <div style={{display:'flex'}}>
                  {props.option1 && 
                     <Button 
                        inverted 
                        className='yay-button' 
                        size={props.option1Size} 
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
                        size={props.option2Size} 
                        color='red'
                        onClick={props.handleOption2}
                     >
                     {props.icon2 &&
                        <Icon name={props.icon2}/>
                     }
                     {props.option2}</Button>
                  }
                  {props.option3 && 
                     <Button 
                        inverted 
                        className ='nay-button' 
                        size={props.option3Size} 
                        color={props.option3Color}
                        onClick={props.handleOption3}
                        style={{
                           backgroundImage:'url(https://media3.giphy.com/media/l2Je6sbvJEn1W9OWQ/giphy.gif?cid=ecf05e479851cb845e072fa093583734c962e13e40ea2150&rid=giphy.gif)', 
                           backgroundSize:'cover',
                           backgroundPosition: 'bottom',
                           marginLeft: 'auto',
                           marginRight: 0,
                           border: '1px solid grey',
                           borderRadius: '.28571429rem'
                           }}
                     >
                     {props.icon3 &&
                        <Icon name={props.icon3}/>
                     }
                     {props.option3}</Button>
                  }
               </div>
            </div>
         </Segment>
      </Portal>
   )
}
