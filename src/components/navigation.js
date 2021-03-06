import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongQueue from './queue/songQueue';
import SearchBar from './searchBar';
import Settings from './settings/settings';

import './navigation.css';

export default class Navigation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            songInput: '',
            queue:[],
            queueIndex: 0,
            isQueueControlHidden: true,
            enablePowerSearch: false
        };
    
        this.navigate = this.navigate.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);  
        this.loadQueue = this.loadQueue.bind(this);
        this.nextQueue = this.nextQueue.bind(this);
        this.prevQueue = this.prevQueue.bind(this);
        this.onSettingsSave = this.onSettingsSave.bind(this);
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

    onSettingsSave = (settings) => {
        var {enablePowerSearch} = settings;
        this.setState({enablePowerSearch});
    }
    
    render() {
        return (
            <div className="d-flex justify-content-between">
                <div className="p-2 row">
                    <div className="col">                        
                        <SongQueue queue={this.state.queue} onSave={this.loadQueue} onClearQueue={this.clearQueue}/>
                    </div>
                    <div className="col">
                        <Settings onSave={this.onSettingsSave} enablePowerSearch={this.state.enablePowerSearch}/>
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
                        <SearchBar onSubmit={this.navigate} enablePowerSearch={this.state.enablePowerSearch} location="nav" submitButton={<FontAwesomeIcon icon="play"/>} buttonClass="btn-success" resultsPlacement="top"/>                        
                    </div>                    
                </div>              
            </div>    
        );
    }
}