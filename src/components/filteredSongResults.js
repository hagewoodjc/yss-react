import React from 'react'
import songbookIndex from '../songbookIndex.json';
import SearchInput, {createFilter} from 'react-search-input'

import './filteredSongResults.css';

const KEYS_TO_FILTERS = ['id', 'title'];

export default class FilteredSongResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const filteredSongs = songbookIndex.songs.filter(createFilter(this.props.input, KEYS_TO_FILTERS))

        return(
            <div className="list-group">
                {this.props.input && this.props.input.trim() !== '' ?
                    filteredSongs.map(song => {
                        return (
                            <a href='#' className="list-group-item list-group-item-action">
                                <span>{`${song.id} - ${song.title}`}</span>
                            </a>
                            // <div className="mail" key={song.id}>
                            // <div className="from">{song.title}</div>
                        )
                    })
                : ''}
            </div>
        )
    }
}