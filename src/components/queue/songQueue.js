import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Uuidv4 from 'uuid/v4';
import QueueItem from './queueItem';
import SongQueueTitleBar from './songQueueTitleBar';
import { Button } from 'reactstrap'

import './songQueue.css';

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
  userSelect: "none",
  padding: grid * 1.5,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#343a40",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "darkgrey" : "#343a40",
  padding: grid,
  width: '100%'
});

export default class SongQueue extends React.Component {
    constructor(props) {
        super(props);
        let queueFromProps = Object.assign([], props.queue);
        this.state = {
            queue: queueFromProps,
            isPaneOpenLeft: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.save = this.save.bind(this);
    }

    toggle = () => {
        this.setState({
            isPaneOpenLeft: !this.state.isPaneOpenLeft
        });
    }   

    handleChange = (event) => {
        var {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleAddClick = (searchInput) => {        
        if (searchInput.trim() !== '') {
            var queue = this.state.queue;

            var item = {
                key: Uuidv4(), //yeeyee
                id: searchInput
            }

            queue.push(item); 

            this.setState({
                queue: queue
            });
        }
    }

    handleSaveClick = (event) => {
        event.preventDefault();
        this.props.onSave(this.state.queue);
    }

    remove = (event) => {
        var filteredQueue = this.state.queue.filter((i) => {
            return i.key !== event.target.value;
        });

        this.setState({queue: filteredQueue});
    }

    removeAll = () => {
        this.setState({ queue:[] }, () => this.props.onClearQueue(this.state.queue));
    }

    save = () => {
        this.setState({isPaneOpenLeft: !this.state.isPaneOpenLeft}, () => this.props.onSave(this.state.queue));
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const queue = reorder(
          this.state.queue,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          queue
        });
      }

    render() {        
        return (
            <div>
                <Button className="btn-outline-light" onClick={this.toggle}><span><FontAwesomeIcon icon="list" size="2x"/></span></Button>
                <SlidingPane className="bg-dark text-white" isOpen={this.state.isPaneOpenLeft} 
                    title={<SongQueueTitleBar onAdd={this.handleAddClick} onRemoveAll={this.removeAll} onSave={this.save} />}
                    from="left" width='40%' onRequestClose={() => this.setState({isPaneOpenLeft: false})}>
                    <div>
                        {this.state.queue && this.state.queue.length > 0 ?
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                    {this.state.queue.map((item, index) => (
                                        <Draggable key={item.key} draggableId={item.key} index={index}>
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
                                                <QueueItem item={item} onRemove={this.remove} />
                                            </div>
                                        )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    </div>
                                )}
                                </Droppable>
                            </DragDropContext>
                        :''}                        
                    </div>
                </SlidingPane>
            </div>
        )
    }
}