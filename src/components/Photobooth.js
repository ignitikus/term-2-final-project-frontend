import React, {Component} from "react";
import Webcam from "react-webcam";
import axios from "axios"

import QuestionModal from './QuestionModal'
import axiosConfig from './utils/configs/axiosConfig'
import { getUserFromLS } from './utils/helpers/helperFunctions'


export default class Photobooth extends Component{
   constructor(props) {
      super(props)
   
      this.state = {
         open: false,
         image: null,
      }
   }
   
   videoConstraints = ()=> {
      return {
         height: this.props.height*80/100,
         width: this.props.width*80/100,
         facingMode: "user"
      }
   };

   handleOpen = () => {
      this.capture()
      this.setState({open: true})
   }

   handleClose = () => this.setState({ open: false, image: null})
   setRef = (webcam) => this.webcam = webcam
   capture = () => {
         const imageSrc = this.webcam.getScreenshot();
         this.setState({image: imageSrc})
      }

   saveScreenshot = async () => {
      try {
         await axios.post('/savephoto', {user: getUserFromLS(), screenshot: this.state.image}, axiosConfig).then(({data}) => {
            if(data.message==='Success'){
               this.props.getGalleryNumber()
               this.handleClose()
            }else{
               this.handleClose()
               console.log(data)
            }
         })
      } catch (error) {
         console.log(error)
      }
   }

   render(){
      const {open, image} = this.state
      return(
         <div style={{display:'flex', justifyContent:'center'}}>
            <Webcam
               audio={false}
               ref={this.setRef}
               imageSmoothing={true}
               screenshotFormat="image/jpeg"
               videoConstraints={this.videoConstraints()}
               onClick={this.handleOpen}
            />
            <QuestionModal 
               open={open}
               currentPicture={image}
               option1={'Save'}
               option2={'Retake?'}
               option1Size={'huge'}
               option2Size={'huge'}
               option1Color ={'green'}
               handleOption1 = {this.saveScreenshot}
               handleOption2 = {this.handleClose}
            />
         </div>
      );
   }
};
