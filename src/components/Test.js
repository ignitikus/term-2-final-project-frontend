import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Image, Segment, Grid, Divider, Icon, Header} from 'semantic-ui-react'


const getItems = count =>
   Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k}`,
      content: `item ${k}`,
}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
   userSelect: 'none',
   padding: grid * 2,
   margin: `0 ${grid}px 0 0`,

   // change background colour if dragging
   background: isDragging ? 'lightgreen' : 'grey',

   // styles we need to apply on draggables
   ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
   background: isDraggingOver ? 'lightblue' : 'lightgrey',
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'center',
   padding: grid,
   overflow: 'auto',
});


export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         test: [{
            urls: {
               full: 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
            },
            _id: 'test'
         }],
         liked: [],
         disliked: []
      };
   }

   onDragEnd = (result) =>{
      const { source, destination } = result;
      // dropped outside the list
      if (!result.destination) {
         return;
      }

      const items = reorder(
         this.state.items,
         result.source.index,
         result.destination.index
      );

      this.setState({
         items,
      });
   }

   componentDidMount(){
      this.setState(state => {
         const liked = [...this.props.gallery.filter(pic=> pic.status)]

         return {
            liked
         }
      })
   }
   // Normally you would want to split things out into separate components.
   // But in this example everything is just done in one place for simplicity
   render() {
      console.log(this.state.liked)
      console.log(this.state.disliked)
      return (
         <DragDropContext onDragEnd={this.onDragEnd}>
            <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
               <Divider vertical>
                  <Icon name='arrows alternate horizontal' style={{fontSize: '3.5rem'}}/>
               </Divider>
               <Grid.Row verticalAlign='middle'>
               <Grid.Column>
                  <Droppable droppableId="droppableYay" direction="horizontal">
               {(provided, snapshot) => (
                  <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                  >

                  {this.props.gallery.filter(pic=> pic.status).map(({urls, _id}, index) => (
                     <Draggable key={_id} draggableId={_id} index={index}>
                        {(provided, snapshot) => (
                        <div
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                           )}
                        >
                           <p>Image: {index}</p>
                           <Image style={{maxWidth: '100px', maxHeight: '100px'}} src={urls.full}/>
                        </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
                  </div>
               )}
            </Droppable>

               </Grid.Column>

               <Grid.Column>
                  <Droppable droppableId="droppableNay" direction="horizontal">
               {(provided, snapshot) => (
                  <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                  >

                  {this.props.gallery.filter(pic=> !pic.status).map(({urls, _id}, index) => (
                     <Draggable key={_id} draggableId={_id} index={index}>
                        {(provided, snapshot) => (
                        <div
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                           )}
                        >
                           <p>Image: {index}</p>
                           <Image style={{maxWidth: '100px', maxHeight: '100px'}} src={urls.full}/>
                        </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
                  </div>
               )}
            </Droppable>
               </Grid.Column>
               </Grid.Row>
            </Grid>
         </Segment>
   
         </DragDropContext>
      );
   }
}