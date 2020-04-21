import React, {Component} from 'react'
import { Segment, Grid, Divider, Icon, Header, Image} from 'semantic-ui-react'
import axios from 'axios'
import axiosConfig from './utils/configs/axiosConfig'
import './Gallery.css'

export default class Gallery extends Component{
   constructor(props) {
      super(props)
      this.state = {
         yay: false,
         nay: false,
         liked: [],
         disliked: []
      }
   }

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
      axios.put('updatestatus', {id ,status}, axiosConfig)
      this.getGallery()
   }



   handleSelect = (id, action) => {
      const copyLiked = [...this.state.liked]
      const copyDisliked = [...this.state.disliked]
      if(action === 'unlike'){
         const foundPic = copyLiked.filter(pic=> pic._id === id)
         const updatedLiked = copyLiked.filter(pic=> pic._id!== foundPic[0]._id)
         const updatedDisliked = [...copyDisliked, ...foundPic]
         this.setState({liked: updatedLiked, disliked: updatedDisliked})
         this.updateStatus(id, true)
      }else{
         const foundPic = copyDisliked.filter(pic=> pic._id === id)
         const updatedDisliked = copyDisliked.filter(pic=> pic._id!== foundPic[0]._id)
         const updatedLiked = [...copyLiked, ...foundPic]
         this.setState({liked: updatedLiked, disliked: updatedDisliked})
         this.updateStatus(id, false)
      }
   }

   componentDidMount(){
      this.getGallery()
   }

   render(){
      const {liked, disliked} = this.state
      return (
         <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
               <Divider vertical>
                  <div style={{display:'flex', flexDirection: 'column'}}>
                     <Icon name='arrows alternate horizontal' style={{fontSize: '3.5rem'}}/>
                  </div>
               </Divider>
               <Grid.Row verticalAlign='top'>
               <Grid.Column>
               {!this.state.yay &&
                  <Header icon>
                     <Icon name='thumbs up outline' />
                     'YAY'ed pictures will be displayed here
                  </Header>
               }
               {liked.map(({_id, description, urls})=> {
                  return (
                     <div key={_id}>
                        <Image onClick={() => this.handleSelect(_id,'unlike')} className='yayImage' src={urls.full} />
                     </div>

                  )
               })}

               </Grid.Column>

               <Grid.Column>
               {!this.state.nay &&
                  <Header icon>
                     <Icon name='thumbs down outline' />
                     'NAY'ed pictures will be displayed here
                  </Header>
               }
               {disliked.map(({_id, description, urls})=> {
                  return (
                     <div key={_id}>
                        <Image onClick={() => this.handleSelect(_id, 'undislike')} className='nayImage' src={urls.full} />
                     </div>
                  )
               })}
               </Grid.Column>
               </Grid.Row>
            </Grid>
         </Segment>
      )
   }
}