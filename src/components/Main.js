import React, {Component} from 'react'
import { Image } from 'semantic-ui-react'
import axios from 'axios'
import Spinner from './Spinner'
import QuestionModal from './QuestionModal'
import './Main.css'


export default class Main extends Component{
   constructor(props) {
      super(props)
      this.state = {
         open: false,
         loaded: false,
         visibility: 'hidden',
      }
   }

   pictureLoaded = () => this.setState({loaded: true, visibility: 'visible'})
   handleClose = () => this.setState({ open: false })
   handleOpen = () => this.setState({ open: true })

   handleYay = () => {
      console.log('Yay button')
      const currentPicture = {
         status: true,
         description: this.props.randomPicture.picture.description,
         urls: {
            raw: this.props.randomPicture.picture.urls.raw,
            full: this.props.randomPicture.picture.urls.full,
         }
      }

      let axiosConfig = {
			headers:{
				'Content-type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		}
      axios.post('/savepicture', currentPicture, axiosConfig).then((picture) => {
         this.setState({open:false, loaded:false, visibility:'hidden'})
         this.props.getRandomPic()
      })
   }

   handleNay = () => {
      console.log('Nay button')
      this.setState({currentPicture: {...this.props.randomPicture}})
   }
   
   
   render() {
      const {picture} = this.props.randomPicture
      const {open ,loaded, visibility} = this.state
      return(
         <div>
            <div style={{display:'flex', justifyContent:'center'}}>
               {picture === undefined
               ?  <Spinner /> : 
               <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                  <h2>{picture.description}</h2>
                  <div>
                     {!loaded &&
                     <div>
                        <Spinner />
                     </div>
                     }
                     <Image 
                        disabled={open}
                        className={visibility}
                        onLoad={this.pictureLoaded} 
                        src={picture.urls.raw} 
                        style={{maxHeight: '80vh', maxWidth: '90vw'}}
                        onClick={this.handleOpen}
                        />
                  <QuestionModal 
                     open={open}
                     handleOpen={this.handleOpen} 
                     handleClose={this.handleClose}
                     handleYay = {this.handleYay}
                     handleNay = {this.handleNay}
                  /> 
                  </div>
               </div>
               } 
            </div>
         </div>
      )
   }
}

