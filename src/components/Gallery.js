import React, {Component} from 'react'
import { Segment, Grid, Divider, Icon, Header} from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default class Gallery extends Component{
   constructor(props) {
      super(props)
      this.state = {
         yay: false,
         nay: false
      }
   }
   

   componentDidMount(){
      // change state after getting all yayed pictures
   }

   render(){
      return (
         <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
               <Divider vertical>
                  <Icon name='arrows alternate horizontal' style={{fontSize: '3.5rem'}}/>
               </Divider>
               <Grid.Row verticalAlign='middle'>
               <Grid.Column>
               {!this.state.yay &&
                  <Header icon>
                     <Icon name='thumbs up outline' />
                     'YAY'ed pictures will be displayed here
                  </Header>
               }

               </Grid.Column>

               <Grid.Column>
               {!this.state.nay &&
                  <Header icon>
                     <Icon name='thumbs down outline' />
                     'NAY'ed pictures will be displayed here
                  </Header>
               }
               </Grid.Column>
               </Grid.Row>
            </Grid>
         </Segment>
      )
   }
}


// {props.gallery.filter(picture => picture.status).map(({urls,status,description, _id}) =>{
//             return(
//                <div key={_id}>
//                   <Image src={urls.full} style={{maxWidth: 200}}/>
//                </div>
//             )
//          })}