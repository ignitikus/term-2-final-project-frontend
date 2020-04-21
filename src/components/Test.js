import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Image, Segment, Grid, Divider, Icon, Header} from 'semantic-ui-react'
import axios from 'axios'
import axiosConfig from './utils/configs/axiosConfig'


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
   const sourceClone = Array.from(source);
   const destClone = Array.from(destination);
   const [removed] = sourceClone.splice(droppableSource.index, 1);

   destClone.splice(droppableDestination.index, 0, removed);

   const result = {};
   result[droppableSource.droppableId] = sourceClone;
   result[droppableDestination.droppableId] = destClone;

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


export default class Test extends Component {
   constructor(props) {
      super(props);
      this.state = {
         items: [],
         selected: []
      };
   }

   id2List = {
      droppableYay: 'items',
      droppableNay: 'selected'
   }

   getList = id => this.state[this.id2List[id]];

   onDragEnd = result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
         return;
      }

      if (source.droppableId === destination.droppableId) {
         const items = reorder(
               this.getList(source.droppableId),
               source.index,
               destination.index
         );

         let state = { items };

         if (source.droppableId === 'droppable2') {
               state = { selected: items };
         }

         this.setState(state);
      } else {
         const result = move(
               this.getList(source.droppableId),
               this.getList(destination.droppableId),
               source,
               destination
         );

         this.setState({
               items: result.droppable,
               selected: result.droppable2
         });
      }
   };

   getGallery = () => {
      axios.get('/gallery').then(({data}) => {
         this.setState({
            items: [...data.filter(pic=>pic.status)], 
            selected: [...data.filter(pic=>!pic.status)]})
      })
   }

   updateStatus = (id, status)=>{
      axios.put('updatestatus', {id ,status}, axiosConfig)
      this.getGallery()
   }

   componentDidMount(){
      this.getGallery()
   }

   // Normally you would want to split things out into separate components.
   // But in this example everything is just done in one place for simplicity
   render() {
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

                  {this.state.items.filter(pic=> pic.status).map(({status, urls, _id}, index) => (
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
                           <Image onClick={() => {
                              this.updateStatus(_id, status)
                           }} style={{maxWidth: '100px', maxHeight: '100px'}} src={urls.full}/>
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

                  {this.state.selected.filter(pic=> !pic.status).map(({status, urls, _id}, index) => (
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
                           <Image onClick={() => {
                              this.updateStatus(_id, status)
                           }} style={{maxWidth: '100px', maxHeight: '100px'}} src={urls.full}/>
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