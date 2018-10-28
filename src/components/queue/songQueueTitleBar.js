import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../searchBar';

export default class SongQueueTitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    handleSaveClick = (event) => {
        event.preventDefault();
        this.props.onSave();
    }

    onAdd = (id) => {
        this.props.onAdd(id);
    }

    onRemoveAll = (event) => {
        event.preventDefault();
        this.props.onRemoveAll();
    }
        
    render() {
        const searchSubmitIcon = <FontAwesomeIcon icon="plus"/>;
        return (
            <div>
                <div className="row">  
                    <div className="col">
                        <h3>Song Queue</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="d-flex">
                            <div className="p-2">
                                <button className="btn btn-danger btn-lg" onClick={this.onRemoveAll}><FontAwesomeIcon icon="trash-alt" /></button>
                            </div>
                            <div className="ml-auto p-2">
                                <SearchBar onSubmit={this.onAdd} enablePowerSearch={true} location="queue" buttonClass="btn-primary" submitButton={searchSubmitIcon}/>
                            </div>
                            <div className="ml-auto p-2">
                                <button className="btn btn-success btn-lg" onClick={this.handleSaveClick}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        );
    }
}
