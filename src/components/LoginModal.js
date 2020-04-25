import React, {Component} from 'react'
import { Button, Form, Portal, Segment, Header } from 'semantic-ui-react'
import axios from 'axios'
import axiosConfig from './utils/configs/axiosConfig.js'
import { addToLocalStorage } from './utils/helpers/helperFunctions'
import './utils/styles/Main.css'



export default class LoginModal extends Component{
   constructor(props) {
      super(props)

      this.state = {
         credentials: {
            email: '',
            pass: '',
         },
         login: true,
      }
   }

   handleToggle = (params) => this.setState({login: !this.state.login})

   handleSubmit = (route) => {
      const user = {...this.state.credentials}
      if(!user.email || !user.email){
         this.props.sendToastMessage('error','All inputs must be filled')
      }else{
         axios.post(route, user, axiosConfig).then(({data}) => {
            if(data.message === 'check credentials'){
               this.props.sendToastMessage('error','Wrong credentials')
            }
            if(data.message === 'already exists'){
               this.props.sendToastMessage('error','User already exists')
               this.setState({
                  login: false
               })
            }
            if(data.message === 'User not found'){
               this.props.sendToastMessage('error','User not found')
            }
            if(data.message === 'Success'){
               this.props.sendToastMessage('success','Success!')
               setTimeout(() => {
                  addToLocalStorage('user', JSON.stringify({email:data.email, token:data.token, avatar:data.avatar}))
                  this.props.loggedIn(data.message, data.email)
                  this.setState({
                     credentials:{
                        email:'',
                        pass:''
                     },
                     login:true})
               }, 1500);
            }
         })
      }
   }

   handleChange = (event) => {
      const updatedCredentials = {...this.state.credentials}
      updatedCredentials[event.target.name] = event.target.value
      this.setState({credentials: updatedCredentials})
   }

   render(){
      const {handleLoginClose, open} = this.props
      const {login, email, pass} = this.state
      return (
         <Portal 
            onClose={handleLoginClose} 
            open={open}>
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
               
               <Header size='huge'>{login?'Login':'Register'}</Header>
               <Form size='large' onSubmit={login
               ? (params) => {this.handleSubmit('/login')}
               : (params) => {this.handleSubmit('/register')}}>
                  <Form.Group widths='equal'>
                     <Form.Field>
                        <input 
                           type='text'
                           placeholder='Type email' 
                           name='email'
                           value={email} 
                           onChange={this.handleChange}
                        />
                     </Form.Field>
                     <Form.Field>
                        <input 
                           type='password'
                           autoComplete='off'
                           placeholder='Type password' 
                           name='pass'
                           value={pass}
                           onChange={this.handleChange}
                        />
                     </Form.Field>
                  </Form.Group>
                  <div style={{display:'flex', justifyContent: 'space-between'}}>
                     <Button size='large' type='submit'>Submit?</Button>
                     <Button 
                        size='large' 
                        type='button' 
                        onClick={this.handleToggle}
                     >{!login?'Login':'Register?'}</Button>
                  </div>
               </Form>
            </Segment>
         </Portal>
      )
   }
}
