import React, {Component} from 'react'
import { Segment, Grid, Divider, Icon, Header, Image} from 'semantic-ui-react'
import axios from 'axios'

import QuestionModal from './QuestionModal'
import axiosConfig from './utils/configs/axiosConfig'
import {getUserFromLS} from './utils/helpers/helperFunctions'
import './utils/styles/Gallery.css'

export default class Gallery extends Component{
   constructor(props) {
      super(props)
      this.state = {
         liked: [],
         disliked: [],
         open: false,
         currentPicture:{
            id: '',
            status: '',
            action:'',
            urls: {},
            description: ''
         }
      }
   }

   handleOpen = (id, status, action, urls, description) => this.setState({ open: true, currentPicture:{id,status,action,urls, description}})
   handleClose = () => this.setState({ open: false, currentPicture:{id:'',status:'',urls:{}}})

   getGallery = () => {
      axios.get(`/gallery/${getUserFromLS().token}`, axiosConfig).then(({data}) => {
         this.setState({
            yay: true,
            nay: true,
            liked: [...data.filter(pic=>pic.status)], 
            disliked: [...data.filter(pic=>!pic.status)]})
      })
   }

   updateStatus = (id, status)=>{
      this.getGallery()
      axios.put('/updatestatus', {id ,status}, axiosConfig)
   }

   handleSelect = (id, action) => {
      const copyLiked = [...this.state.liked]
      const copyDisliked = [...this.state.disliked]
      if(action === 'unlike'){
         const foundPic = copyLiked.filter(pic=> pic._id === id)
         const updatedLiked = copyLiked.filter(pic=> pic._id!== foundPic[0]._id)
         const updatedDisliked = [...copyDisliked, ...foundPic]
         this.setState({liked: updatedLiked, disliked: updatedDisliked, open:false})
         this.updateStatus(id, true)
      }else{
         const foundPic = copyDisliked.filter(pic=> pic._id === id)
         const updatedDisliked = copyDisliked.filter(pic=> pic._id!== foundPic[0]._id)
         const updatedLiked = [...copyLiked, ...foundPic]
         this.setState({liked: updatedLiked, disliked: updatedDisliked, open:false})
         this.updateStatus(id, false)
      }
   }

   handleDelete = (id) => {
      axios.delete('/deletepicture/'+id)
      const filteredLiked = [...this.state.liked].filter(pic=>pic._id !== id)
      const filteredDisliked = [...this.state.disliked].filter(pic=>pic._id !== id)
      this.setState({liked: filteredLiked, disliked: filteredDisliked, open:false})
   }

   componentDidMount(){
      this.getGallery()
      this.props.resetGalleryNumber()
   }

   render(){
      const {liked, disliked, open, currentPicture} = this.state
      return (
         <Segment 
            placeholder 
            disabled={open}
         >
            <Grid 
               stackable 
               columns={2} 
               textAlign='center'
            >
               <Divider vertical>
                  <div style={{display:'flex', flexDirection: 'column'}}>
                     <Icon 
                        name='arrows alternate horizontal' 
                        style={{fontSize: '3.5rem'}}/>
                  </div>
               </Divider>
               <Grid.Row verticalAlign='top'>
               <Grid.Column>
                  {liked.length<1 &&
                     <Header icon>
                        <Icon name='thumbs up outline' />
                        'YAY'ed pictures will be displayed here
                     </Header>
                  }
                  {liked.map(({_id, description, urls, status})=> {
                     return (
                        <div key={_id}>
                           <Image 
                              className='galleryImage' src={urls.thumb} 
                              onClick={() => this.handleOpen(_id, status, 'unlike', urls, description)} 
                           />
                        </div>
                     )
                  })}
               </Grid.Column>

               <Grid.Column>
                  {disliked.length<1 &&
                     <Header icon>
                        <Icon name='thumbs down outline' />
                        'NAY'ed pictures will be displayed here
                     </Header>
                  }
                  {disliked.map(({_id, description, urls, status})=> {
                     return (
                        <div key={_id}>
                           <Image 
                              className='galleryImage' src={urls.thumb}
                              onClick={() =>this.handleOpen(_id, status, 'undislike', urls, description)}
                           />
                        </div>
                     )
                  })}
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            <QuestionModal 
               open={open}
               currentPicture={currentPicture.urls.full}
               question={currentPicture.description}
               option1={!currentPicture.status ?'Like' : 'Dislike'}
               option2={'Delete?'}
               option3={'Puzzle?'}
               option1Size={'huge'}
               option2Size={'huge'}
               option3Size={'huge'}
               option1Color ={!currentPicture.status ? 'green':'red'}
               icon1={!currentPicture.status ? 'thumbs up outline' : 'thumbs down outline'}
               icon2={'trash alternate outline'}
               icon3={'gamepad'}
               handleOpen={this.handleOpen} 
               handleClose={this.handleClose}
               handleOption1 = {() => this.handleSelect(currentPicture.id, currentPicture.action)}
               handleOption2 = {() => this.handleDelete(currentPicture.id)}
               handleOption3 = {() => this.props.changeGamePic(currentPicture.urls)}
               
            />
         </Segment>
      )
   }
}