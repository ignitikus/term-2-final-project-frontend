import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export default function Spinner(props) {
   return (
      <Segment style={{height:'80vh', width: '80vw'}}>
         <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
            <Dimmer active>
            <Loader size='massive'>Loading your picture</Loader>
            </Dimmer>
            <Image src='https://media0.giphy.com/media/M2hiQoUrUNIMo/giphy.gif?cid=ecf05e472b538eff4e802341d3c665118393f04e55f7ae09&rid=giphy.gif' style={{width:'60vw'}}/>
         </div>
      </Segment>
   )
}
