import React, {Component} from 'react'
import { Segment, Grid, Divider, Icon, Header, Image} from 'semantic-ui-react'
import axios from 'axios'
import axiosConfig from './utils/configs/axiosConfig'
import QuestionModal from './QuestionModal'
import './Gallery.css'

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
         }
      }
   }

   handleOpen = (id, status, action, urls) => this.setState({ open: true, currentPicture:{id,status,action,urls}})
   handleClose = () => this.setState({ open: false, currentPicture:{id:'',status:'',urls:{}}})

   getGallery = () => {
      axios.get('/gallery').then(({data}) => {
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
   }

   render(){
      const {liked, disliked, open, currentPicture} = this.state
      return (
         <Segment placeholder disabled={open}>
            <Grid columns={2} stackable textAlign='center'>
               <Divider vertical>
                  <div style={{display:'flex', flexDirection: 'column'}}>
                     <Icon name='arrows alternate horizontal' style={{fontSize: '3.5rem'}}/>
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
                           <Image onClick={() => {
                              this.handleOpen(_id, status, 'unlike' ,urls)
                           }} className='yayImage' src={urls.full} />
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
                           <Image onClick={() => {
                              this.handleOpen(_id, status, 'undislike' ,urls)
                           }} className='nayImage' src={urls.full} />
                        </div>
                     )
                  })}
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            <QuestionModal 
               open={open}
               currentPicture={currentPicture.urls.full}
               question={'Change status or delete'}
               option1={!currentPicture.status?'Like':'Dislike'}
               option1Color ={!currentPicture.status? 'green':'red'}
               option2={'Delete?'}
               icon1={!currentPicture.status?'thumbs up outline':'thumbs down outline'}
               icon2={'trash alternate outline'}
               handleOpen={this.handleOpen} 
               handleClose={this.handleClose}
               handleOption1 = {() => {
                  this.handleSelect(currentPicture.id, currentPicture.action)
               }}
               handleOption2 = {() => {
                  this.handleDelete(currentPicture.id)
               }}
            />
         </Segment>
      )
   }
}