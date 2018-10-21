import React from 'react';
import SearchInput, {createFilter} from 'react-search-input'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import './searchBar.css';
import songbookIndex from '../songbookIndex.json';

const KEYS_TO_FILTERS = ['id', 'title'];
const RESULTS_POSITIONS = ['top', 'bottom']

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            popoverOpen: false
        }

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.songKeyPress = this.songKeyPress.bind(this);
        this.onResultClick = this.onResultClick.bind(this);
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
        var popoverOpen = this.props.enablePowerSearch && term && term.trim() !== '' ? true : false;
        this.setState({searchInput: term, popoverOpen});            
    }    

    togglePopover = () => {
        this.setState({popoverOpen: !this.state.popoverOpen});
    }

    onResultClick = (event, id) => {
        event.preventDefault();
        this.setState({searchInput: ''}, () => {
            this.togglePopover();
            this.props.onSubmit(id);
        });
    }

    render() {
        const buttonClass=`btn ${this.props.buttonClass}`;
        const filteredSongs = songbookIndex.songs.filter(createFilter(this.state.searchInput, KEYS_TO_FILTERS))
        var resultsPlacement = RESULTS_POSITIONS.indexOf(this.props.resultsPlacement) > -1 ? this.props.resultsPlacement : 'bottom';

        return (
            <div>
                <Popover className="resultsPopover" placement={resultsPlacement} isOpen={this.state.popoverOpen} target={`${this.props.location}-searchControls`} toggle={this.togglePopover}>
                    <PopoverBody>
                        <div className="list-group">
                            {this.props.enablePowerSearch && this.state.searchInput && this.state.searchInput.trim() !== '' ?
                                filteredSongs.map(song => {
                                    return (
                                        <a href="#" className="list-group-item list-group-item-action" onClick={(e) => this.onResultClick(e, song.id)}>
                                            {`${song.id} - ${song.title}`}
                                        </a>
                                    )
                                })
                            : ''}
                        </div>
                    </PopoverBody>
                </Popover>
                    
                <div id={`${this.props.location}-searchControls`} className="input-group input-group-lg">
                    <SearchInput id="songNavigation" placeholder="Search songs..." name="searchInput" onKeyPress={this.songKeyPress} value={this.state.searchInput} className="form-control search-field" onChange={this.searchUpdated} />
                    {/* <input id="songNavigation" name="searchInput" type="text" value={this.state.searchInput} onKeyPress={this.songKeyPress} className="form-control" placeholder="Song Number..." onChange={this.handleChange} /> */}                                        
                    <div className="input-group-append">
                        <button className={buttonClass} type="button" onClick={this.handleSearchClick}><span>{this.props.submitButton}</span></button>
                    </div>    
                </div>
            </div>
        )
    }
}