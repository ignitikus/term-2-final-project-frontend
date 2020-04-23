import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Main from './Main'
import Gallery from './Gallery'
import Game from './Game'
import Footer  from './Footer'
import Test  from './Test'

export default class App extends Component {
   constructor(){
      super()
      this.state = { 
         logged: false,
         activeItem: 'test',
         picture: '',
         gamePicture: '',
         gallery:[],
         email: ''
      }

   }

   handleItemClick = (e, { name }) => {
      this.addToLocalStorage('activeItem', name)
      this.setState({ activeItem: window.localStorage.getItem('activeItem') })
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
         this.setState({logged: true, email: user})
      }
   }

   getEmail = () => {
      console.log(window.localStorage.getItem('email'))
      if(window.localStorage.getItem('email')){
         this.setState({logged:true, email: window.localStorage.getItem('email')})
      }
   }
   
   getActiveTab = () => {
      this.setState({ activeItem: window.localStorage.getItem('activeItem') })
   }
   

   componentDidMount(){
      this.getActiveTab()
      this.getEmail()
      this.getRandomPic()
   }


   

   render() {
      const { logged, activeItem, data, picture } = this.state
      return (
         <div>
            <Menu attached='top' tabular style={{justifyContent:'center'}}>
            {logged && 
               <Menu.Item
               name='gallery'
               active={activeItem === 'gallery'}
               onClick={this.handleItemClick}
               />
            }
            {logged && 
               <Menu.Item
               name='game'
               active={activeItem === 'game'}
               onClick={this.handleItemClick}
               />
            }
               <Menu.Item
               name='main'
               active={activeItem === 'main'}
               onClick={this.handleItemClick}
               />
               <Menu.Item
               name='test'
               active={activeItem === 'test'}
               onClick={this.handleItemClick}
               />
            </Menu>

            <Segment attached='bottom'>
               {activeItem === "gallery"? <Gallery changeGamePic={this.changeGamePic} email={this.state.email}/>:null}
               {activeItem === "main"? <Main data={data} randomPicture={picture} getRandomPic={this.getRandomPic}/>:null}
               {activeItem === "game"? <Game gamePicture={this.state.gamePicture}/>:null}
               {activeItem === "test"? <Test email={this.state.email} logged={this.state.logged} loggedIn={this.loggedIn} addToLocalStorage={this.addToLocalStorage}/>:null}
            </Segment>
            <Footer />
         </div>
      )
   }
}
