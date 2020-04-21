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

   componentDidMount(){
      this.getGallery()
   }

   render(){
      console.log(this.state.liked)
      const {liked, disliked} = this.state
      return (
         <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
               <Divider vertical>
                  <div style={{display:'flex', flexDirection: 'column'}}>
                     <Icon name='arrows alternate horizontal' style={{fontSize: '3.5rem'}}/>
                     <Icon name='trash alternate outline' style={{fontSize: '3.5rem'}}/>
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
                     <Image className='yayImage' src={urls.full} />
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
                     <Image className='nayImage' src={urls.full} />
                  )
               })}
               </Grid.Column>
               </Grid.Row>
            </Grid>
         </Segment>
      )
   }
}