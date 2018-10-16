import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './queueItem.css';

export default function QueueItem(props) {

    return (
        <li key={props.item.key} className="list-group-item list-group-item-dark" style={{background: 'darkgrey'}} draggable='true'>
            <div className="d-flex">
                <div className="mr-auto p-2">{props.item.id}</div>
                <div className="p-2">
                    <button className="btn btn-light" type="button"><FontAwesomeIcon size="1x" icon="eye" /></button>
                </div>
                <div className="p-2">
                    <button className="btn btn-light" onClick={props.onRemove} value={props.item.key} type="button"><FontAwesomeIcon size="1x" color="red" icon="times" /></button>
                </div>
            </div>
        </li>       
    );        
}