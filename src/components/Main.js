import React, {Component} from 'react'
import axios from 'axios'
import { Image } from 'semantic-ui-react'

import Spinner from './Spinner'
import QuestionModal from './QuestionModal'
import axiosConfig from './utils/configs/axiosConfig'
import {returnCurrentPic, getUserFromLS} from './utils/helpers/helperFunctions'

import './utils/styles/Main.css'

export default class Main extends Component{
   constructor(props) {
      super(props)
      this.state = {
         open: false,
         loaded: false,
         visibility: 'hide',
      }
   }

   pictureLoaded = () => this.setState({loaded: true, visibility: 'show'})
   handleClose = () => this.setState({ open: false })
   handleOpen = () => this.setState({ open: true })
   stateReset =() => this.setState({open:false, loaded:false, visibility:'hide'})
   
   handleStatusChange = (status) => {
      const currentPicture = returnCurrentPic(status, this.props)
      axios.post('/savepicture', {...currentPicture, token: getUserFromLS().token}, axiosConfig).then(({data}) => {
         if(data.message === 'jwt expired'){
            console.log('Session expired')
            this.props.getGalleryNumber()
            this.stateReset()
            this.props.handleSignOut()
         }else{
            this.props.getGalleryNumber()
            this.stateReset()
            this.props.getRandomPic()
         }
      })
   }
   
   
   render() {
      const {email} = this.props
      const {picture} = this.props.randomPicture
      const {open ,loaded, visibility} = this.state
      return(
         <div>
            <div style={{display:'flex', justifyContent:'center'}}>
               {picture === undefined
               ?  <Spinner /> : 
               <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                  <h2 style={{textAlign:'center'}}>{picture.description}</h2>
                  <div>
                     {!loaded &&
                     <div>
                        <Spinner />
                     </div>
                     }
                     <Image 
                        alt={picture.description}
                        disabled={open}
                        className={visibility}
                        onLoad={this.pictureLoaded} 
                        src={picture.urls.full} 
                        style={{maxHeight: '80vh', maxWidth: '90vw'}}
                        onClick={email?this.handleOpen:null}
                        />
                  {this.props.email && 
                     <QuestionModal 
                        open={open}
                        question={'Do you like the picture?'}
                        option1={'YAY'}
                        option1Color={'green'}
                        option1Size={'massive'}
                        option2={'NAY'}
                        option2Size={'massive'}
                        icon1={'thumbs up outline'}
                        icon2={'thumbs down outline'}
                        handleOpen={this.handleOpen} 
                        handleClose={this.handleClose}
                        handleOption1 = {() => this.handleStatusChange(true)}
                        handleOption2 = {() => this.handleStatusChange(false)}
                     /> 
                  }
                  </div>
               </div>
               } 
            </div>
         </div>
      )
   }
}

