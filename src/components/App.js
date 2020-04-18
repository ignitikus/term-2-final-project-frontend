import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Main from './Main'
import Gallery from './Gallery'
import Game from './Game'

export default class MenuExampleTabularOnTop extends Component {
   constructor(){
      super()
      this.state = { 
         activeItem: 'main',
         data: 'Test',
         picture: '',
      }

   }

   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

   componentDidMount(){
      axios.get('/randompic').then(({data}) => {
         this.setState({picture: data})
      })
   }

   render() {
      const { activeItem } = this.state
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
               {this.state.activeItem === "gallery"? <Gallery />:null}
               {this.state.activeItem === "main"? <Main data={this.state.data} randomPicture={this.state.picture}/>:null}
               {this.state.activeItem === "game"? <Game />:null}
            </Segment>
         </div>
      )
   }
}
