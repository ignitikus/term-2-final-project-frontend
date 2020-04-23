import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default function Spinner(props) {
   return (
      <Segment style={{height:'80vh', width: '80vw', border: 'none', boxShadow: 'none'}}>
            <Dimmer active inverted >
            <Loader size='massive'>Loading next picture</Loader>
            </Dimmer>
      </Segment>
   )
}
