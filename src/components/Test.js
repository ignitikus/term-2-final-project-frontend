import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import axiosConfig from './utils/configs/axiosConfig'

export default class Test extends Component {
   constructor(props) {
      super(props)
   
      this.state = {
         credentials: {
            email: '',
            pass: '',
         },
         token:'',
         loggedIn: false
      }
   }
   


   handleLoginSubmit = (event) => {
      event.preventDefault()
      const user = {...this.state.credentials}
      axios.post('/login', user, axiosConfig).then((result) => {
         this.props.addToLocalStorage('user', JSON.stringify({email:result.data.email, token: result.data.token}))
         this.props.loggedIn(result.data.message, result.data.email)
      })
      event.target.reset()
   }

   handleChange = (event) => {
      const updatedCredentials = {...this.state.credentials}
      updatedCredentials[event.target.name] = event.target.value
      this.setState({credentials: updatedCredentials})
   }

   render() {
      return (
         <div>
            {!this.props.logged && 
            <Form onSubmit={this.handleLoginSubmit}>
               <Form.Field>
                  <label>Email</label>
                  <input 
                     type='text'
                     placeholder='Type email' 
                     name='email'
                     value={this.state.email} 
                     onChange={this.handleChange}
                  />
               </Form.Field>
               <Form.Field>
                  <label>Password</label>
                  <input 
                     type='password'
                     autoComplete='off'
                     placeholder='Type password' 
                     name='pass'
                     value={this.state.pass}
                     onChange={this.handleChange}
                     />
               </Form.Field>
               <Button type='submit'>Submit</Button>
            </Form>
            }
            {this.props.logged && 
               <p>{this.props.email}</p>
            }
         </div>
      )
   }
}
