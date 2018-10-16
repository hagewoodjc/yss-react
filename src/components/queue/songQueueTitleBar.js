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
            <div className="d-flex">
                <div className="p-2">
                    <button className="btn btn-danger" onClick={this.onRemoveAll}><FontAwesomeIcon icon="trash-alt" /></button>
                </div>
                <div className="ml-auto p-2">
                    <SearchBar onSubmit={this.onAdd} buttonClass="btn-primary" submitButton={searchSubmitIcon}/>
                </div>
                <div className="ml-auto p-2">
                    <button className="btn btn-success" onClick={this.handleSaveClick}>Save</button>
                </div>
            </div>
        );
    }
}
