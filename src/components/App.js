import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import Main from './Main'
import Gallery from './Gallery'
import Game from './Game'

export default class MenuExampleTabularOnTop extends Component {
   state = { activeItem: 'main' }

   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
               {this.state.activeItem === "main"? <Main />:null}
               {this.state.activeItem === "game"? <Game />:null}
            </Segment>
         </div>
      )
   }
}
