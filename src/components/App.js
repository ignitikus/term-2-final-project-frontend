import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Main from './Main'
import Gallery from './Gallery'
import Game from './Game'
import Footer  from './Footer'

export default class App extends Component {
   constructor(){
      super()
      this.state = { 
         activeItem: 'game',
         data: 'Test',
         picture: '',
         gamePicture: '',
         gallery:[]
      }

   }

   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

   getRandomPic = () => {
      axios.get('/randompic').then(({data}) => {
         this.setState({picture: data, gamePicture: {...data.picture.urls}})
      })
   }

   getGallery = () => {
      axios.get('/gallery').then(({data}) => {
         this.setState({gallery: [...data]})
      })
   }
   
   

   componentDidMount(){
      this.getRandomPic()
      this.getGallery()
   }

   render() {
      const { activeItem, data, picture, gallery } = this.state
      return (
         <div>
            <Menu attached='top' tabular style={{justifyContent:'center'}}>
               <Menu.Item
               name='gallery'
               active={activeItem === 'gallery'}
               onClick={this.handleItemClick}
               />
               <Menu.Item
               name='main'
               active={activeItem === 'main'}
               onClick={this.handleItemClick}
               />
               <Menu.Item
               name='game'
               active={activeItem === 'game'}
               onClick={this.handleItemClick}
               />
            </Menu>

            <Segment attached='bottom'>
               {activeItem === "gallery"? <Gallery gallery={gallery}/>:null}
               {activeItem === "main"? <Main data={data} randomPicture={picture} getRandomPic={this.getRandomPic}/>:null}
               {activeItem === "game"? <Game gamePicture={this.state.gamePicture}/>:null}
            </Segment>
            <Footer />
         </div>
      )
   }
}
