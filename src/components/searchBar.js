import React from 'react';
import SearchInput, {createFilter} from 'react-search-input'

import './searchBar.css';
import songbookIndex from '../songbookIndex.json';

const KEYS_TO_FILTERS = ['id', 'title'];

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        }

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.songKeyPress = this.songKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    

    handleChange = (event) => {
        var {name, value} = event.target;
        this.setState({[name]: value});
    }  

    songKeyPress = (event) => {
        if(event.key === "Enter") {
            this.handleSearchClick(event);
        }
    }

    handleSearchClick = (event) => {
        event.preventDefault();

        //Implement a callback here because this is meh.
        var input = this.state.searchInput;
        this.setState({searchInput: ''}, () => this.props.onSubmit(input));       
    };    

    searchUpdated = (term) => {
        this.setState({searchInput: term});            
    }
    

    render() {
        const buttonClass=`btn ${this.props.buttonClass}`;
        const filteredSongs = songbookIndex.songs.filter(createFilter(this.state.searchInput, KEYS_TO_FILTERS))

        return (
            <div className="input-group input-group-lg">
                <SearchInput id="songNavigation" name="searchInput" className="search-input" onChange={this.searchUpdated} />
                {/* <input id="songNavigation" name="searchInput" type="text" value={this.state.searchInput} onKeyPress={this.songKeyPress} className="form-control" placeholder="Song Number..." onChange={this.handleChange} /> */}
                <div className="input-group-append">
                    <button className={buttonClass} type="button" onClick={this.handleSearchClick}><span>{this.props.submitButton}</span></button>
                </div>
                {this.state.searchInput && this.state.searchInput.trim() !== '' ?
                    filteredSongs.map(song => {
                        return (
                            <div className="mail" key={song.id}>
                            <div className="from">{song.title}</div>
                            {/* <div className="subject">{email.subject}</div> */}
                            </div>
                        )
                    })
                : ''}
            </div>
        )
    }
}