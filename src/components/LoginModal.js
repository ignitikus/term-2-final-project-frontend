import React, {Component} from 'react'
import { Button, Form, Portal, Segment, Header, Message } from 'semantic-ui-react'
import axios from 'axios'
import axiosConfig from './utils/configs/axiosConfig.js'
import './Main.css'


export default class LoginModal extends Component{
   constructor(props) {
      super(props)
   
      this.state = {
         credentials: {
            email: '',
            pass: '',
         },
         login: true,
         error: 'hide-message',
         message: 'Test',
         color: 'green'
      }
   }

   handleSubmit = (route) => {
      const user = {...this.state.credentials}
      axios.post(route, user, axiosConfig).then(({data}) => {
         if(data.message === 'check credentials'){
            this.setState({
               error: 'show-message', 
               message: 'Wrong credentials',
            })
         }else{

            this.props.addToLocalStorage('user', JSON.stringify({email:data.email, token:data.token, avatar:data.avatar}))
            this.props.loggedIn(data.message, data.email)
            this.setState({credentials:{email:'',pass:''}})
         }
      })
   }

   handleChange = (event) => {
      const updatedCredentials = {...this.state.credentials}
      updatedCredentials[event.target.name] = event.target.value
      this.setState({credentials: updatedCredentials})
   }

   handleToggle = (params) => {
      this.setState({login: !this.state.login})
   }

   render(){
      return (
         <Portal onClose={this.props.handleLoginClose} open={this.props.open}>
            <Segment
               style={{
                  position: 'absolute',
                  left: '50%',
                  top: '40%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1000,
                  display:'flex',
                  flexDirection: 'column',
                  alignItems:'center'
               }}
            >
               
               <Header size='huge'>{this.state.login?'Login':'Register'}</Header>
               <Message color={this.state.color} className={this.state.error}>{this.state.message}</Message>
               <Form size='large' onSubmit={this.state.login
               ? (params) => {this.handleSubmit('/login')}
               : (params) => {this.handleSubmit('/register')}}>
                  <Form.Group widths='equal'>
                     <Form.Field>
                        <input 
                           type='text'
                           placeholder='Type email' 
                           name='email'
                           value={this.state.email} 
                           onChange={this.handleChange}
                        />
                     </Form.Field>
                     <Form.Field>
                        <input 
                           type='password'
                           autoComplete='off'
                           placeholder='Type password' 
                           name='pass'
                           value={this.state.pass}
                           onChange={this.handleChange}
                        />
                     </Form.Field>
                  </Form.Group>
                  <div style={{display:'flex', justifyContent: 'space-between'}}>
                     <Button size='large' type='submit'>Submit?</Button>
                     <Button size='large' type='button' onClick={this.handleToggle}>{!this.state.login?'Login':'Register?'}</Button>
                  </div>
               </Form>
            </Segment>
         </Portal>
      )
   }
}
