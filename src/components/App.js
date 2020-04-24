import React, { Component } from 'react'
import { Menu, Segment, Button, Icon, Dimmer, Label } from 'semantic-ui-react'
import Moment from 'react-moment'
import axios from 'axios'
import Main from './Main'
import Gallery from './Gallery'
import Game from './Game'
import Footer  from './Footer'
import LoginModal  from './LoginModal'

export default class App extends Component {
   constructor(){
      super()
      this.state = { 
         logged: false,
         openLoginForm: false,
         activeItem: 'main',
         picture: '',
         gamePicture: '',
         gallery:[],
         email: '',
         numGalleryItems: 0,
      }
   }

   handleItemClick = (e, { name }) => {
      this.addToLocalStorage('activeItem', name)
      this.setState({ activeItem: window.localStorage.getItem('activeItem') })
   }

   handleLoginClick = () => {
      this.setState({openLoginForm: true})
   }
   handleLoginClose = () => {
      this.setState({openLoginForm: false})
   }

   handleSignOut = () => {
      this.clearLocalStorage()
      this.setState({
         openLoginForm: false,
         logged:false,
         email: '',
         activeItem: 'main',
      })
   }
   
   getRandomPic = () => {
      axios.get('/randompic').then(({data}) => {
         this.setState({picture: data, gamePicture: {...data.picture.urls}})
      })
   }

   changeGamePic = (urls) => {
      this.setState({activeItem: 'game', gamePicture: urls})
   }

   addToLocalStorage = (key,data) =>{
      return window.localStorage.setItem(key, data)
   }

   clearLocalStorage = ()=>{
      return localStorage.clear()
   }

   loggedIn = (message, user) => {
      if(message==='Success'){
         this.setState({logged: true, openLoginForm: false, email: user})
      }
   }

   getEmail = () => {
      const user = JSON.parse(window.localStorage.getItem('user'))
      if(window.localStorage.getItem('user')){
         this.setState({logged:true, email: user.email})
      }
   }
   
   getActiveTab = () => {
      const activeTab = window.localStorage.getItem('activeItem')
      if(activeTab){
         this.setState({activeItem: activeTab})
      }
   }

   getGalleryNumber = () => {
      this.setState({numGalleryItems: this.state.numGalleryItems+1})
   }
   resetGalleryNumber = () => {
      setTimeout(() => {
         this.setState({numGalleryItems: 0})
      }, 1500);
   }
   

   componentDidMount(){
      this.getActiveTab()
      this.getEmail()
      this.getRandomPic()
   }


   render() {
      const { logged, activeItem, data, picture, email } = this.state
      return (
         <div>
            <Menu attached='top' tabular style={{justifyContent:'center'}}>
            <Moment format={'hh:mm:ss'} interval={1000} style={{position: 'absolute', left:'0', padding:'.92857143em 1.42857143em', height:''}}/>
            <div style={{position: 'absolute', right:'0', padding:'.92857143em 1.42857143em', height:''}}>
               {this.state.email
               ? <Button 
                  animated='vertical' 
                  compact color='blue' 
                  onClick={this.handleSignOut}
                  style={{marginTop: '-10px'}}
                  >
                  <Button.Content visible>{this.state.email}</Button.Content>
                  <Button.Content hidden><Icon name='sign-out' />SIGN OUT</Button.Content>
               </Button>
               :<Button 
                  animated='vertical' 
                  compact color='blue' 
                  onClick={this.handleLoginClick}
                  style={{marginTop: '-10px'}}
                  >
                  <Button.Content visible>Login/Register</Button.Content>
                  <Button.Content hidden><Icon name='sign-in' /></Button.Content>
               </Button>
               }
            </div>
            {logged && 
               <Menu.Item
               name='gallery'
               content={
                  <span>Gallery {
                     this.state.numGalleryItems===0
                     ? ''
                     : <Label circular color='red' size='mini'>
                        {this.state.numGalleryItems}
                     </Label>}
                  </span>}
               active={activeItem === 'gallery'}
               onClick={this.handleItemClick}
               />
            }
               <Menu.Item
               name='main'
               active={activeItem === 'main'}
               onClick={this.handleItemClick}
               />
            {logged && 
               <Menu.Item
               name='game'
               active={activeItem === 'game'}
               onClick={this.handleItemClick}
               />
            }
            </Menu>

            <Segment attached='bottom'>
            <Dimmer.Dimmable blurring dimmed={this.state.openLoginForm}>
               <Dimmer active={this.state.openLoginForm} onClickOutside={this.handleLoginClose} page/>
               {activeItem === "gallery"? <Gallery 
               changeGamePic={this.changeGamePic} 
               email={this.state.email}
               resetGalleryNumber={this.resetGalleryNumber}/>
               :null}
            </Dimmer.Dimmable>
               {activeItem === "main"? <Main 
                  data={data} 
                  randomPicture={picture} 
                  getRandomPic={this.getRandomPic}
                  email={email}
                  handleSignOut={this.handleSignOut}
                  getGalleryNumber={this.getGalleryNumber}
                  />:null}
               {activeItem === "game"? <Game gamePicture={this.state.gamePicture}/>:null}
            </Segment>
            
            <LoginModal 
               open={this.state.openLoginForm} 
               handleLoginClose={this.handleLoginClose}
               addToLocalStorage={this.addToLocalStorage}
               loggedIn={this.loggedIn}
               />
            <Footer />
         </div>
      )
   }
}
