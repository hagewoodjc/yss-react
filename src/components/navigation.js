import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongQueue from './queue/songQueue';
import SearchBar from './searchBar';

import './navigation.css';

export default class Navigation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            songInput: '',
            queue:[],
            queueIndex: 0,
            isQueueControlHidden: true
        };
    
        this.navigate = this.navigate.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handleChange = this.handleChange.bind(this);        
        this.loadQueue = this.loadQueue.bind(this);
        this.nextQueue = this.nextQueue.bind(this);
        this.prevQueue = this.prevQueue.bind(this);
    }

    navigate = (id) => {
        this.props.onNavigate(id);
    }

    handleNavClick = (event) => {
        event.preventDefault();
        this.navigate(this.state.songInput);
    };    

    songKeyPress = (event) => {
        if(event.key === "Enter") {
            this.handleNavClick(event);
        }
    }

    handleQueueClick = (event) => {
        event.preventDefault(); 
        this.props.onQueue(event);
    }

    handleChange = (event) => {
        var {name, value} = event.target;
        this.setState({[name]: value});
    }

    loadQueue = (queue) => {
        var queueIndex = this.state.queueIndex;

        if (queue.length > 0) {            
            var firstItem = queue[queueIndex];  
            this.setState({queue, isQueueControlHidden: false}, () => { 
                this.navigate(firstItem.id);
            });
        }
    }

    clearQueue = (queue) => {
        this.setState({
            queue,
            queueIndex: 0,
            isQueueControlHidden: true
        });
    }

    nextQueue = () => {
        var currentIndex = this.state.queueIndex;
        if (currentIndex < this.state.queue.length - 1) {
            currentIndex++;

            var item = this.state.queue[currentIndex];
            this.setState({queueIndex: currentIndex}, () => {        
                this.navigate(item.id);
            });
        }
    }

    prevQueue = () => {        
        var currentIndex = this.state.queueIndex;
        if (currentIndex > 0) {
            currentIndex--;

            var item = this.state.queue[currentIndex];
            this.setState({queueIndex: currentIndex}, () => {        
                this.navigate(item.id);
            });
        }
    }
    
    render() {
        return (
            <div className="d-flex justify-content-between">
                <div className="p-2 row">
                    <div className="col">                        
                        <SongQueue queue={this.state.queue} onSave={this.loadQueue} onClearQueue={this.clearQueue}/>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-light" type="button"><span><FontAwesomeIcon icon="wrench" size="2x"/></span></button>                    
                    </div>
                </div>
                <div className="p-2 row" hidden={this.state.isQueueControlHidden}>
                    <div className="col">
                        <button className="btn btn-outline-light" type="button" onClick={this.prevQueue}><FontAwesomeIcon icon="arrow-left" size="2x" /></button>
                        
                    </div>
                    <div className="col">                        
                        <button className="btn btn-outline-light" type="button" onClick={this.nextQueue}><FontAwesomeIcon icon="arrow-right" size="2x" /></button>                        
                    </div>
                </div>
                <div className="p-2 row">
                    <div className="col">
                        <SearchBar onSubmit={this.navigate} enablePowerSearch={true} location="nav" submitButton={<FontAwesomeIcon icon="play"/>} buttonClass="btn-success" resultsPlacement="top"/>
                         {/* <div className="input-group input-group-lg">
                            <input id="songNavigation" name="songInput" type="text" onKeyPress={this.songKeyPress} className="form-control" placeholder="Song Number..." onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button" onClick={this.handleNavClick}><span><FontAwesomeIcon icon="play"/></span></button>
                            </div>
                        </div> */}
                    </div>                    
                </div>              
            </div>    
        );
    }
}