import React, {Component} from 'react'
import { Image } from 'semantic-ui-react'
import Spinner from './Spinner'
import './Main.css'


export default class Main extends Component{
   constructor(props) {
      super(props)
      this.state = {
         loaded: false,
         visibility: 'hidden'
      }
   }

   pictureLoaded = () => {
      this.setState({loaded: true, visibility: 'visible'})
   }

   handleClick = ()=>{
      console.log('Click')
   }
   
   
   render() {
      const {picture} = this.props.randomPicture
      return(
         <div>
            <div style={{display:'flex', justifyContent:'center'}}>
               {picture === undefined
               ?  <Spinner /> : 
               <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                  <h2>{picture.description}</h2>
                  <div>
                     {!this.state.loaded &&
                     <div>
                        <Spinner />
                     </div>
                     }
                     <Image 
                        className={this.state.visibility}
                        onLoad={this.pictureLoaded} 
                        src={picture.urls.raw} 
                        style={{maxHeight: '80vh', maxWidth: '90vw'}}
                        onClick={this.handleClick}
                        />
                  </div>
               </div>
               } 
            </div>
         </div>
      )
   }
}

