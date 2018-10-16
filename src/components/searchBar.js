import React from 'react';
import Dropdown from 'buildo-react-components/lib/Dropdown';

import './searchBar.css';

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

    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ];

        const buttonClass=`btn ${this.props.buttonClass}`;

        return (
            <div>
                <Dropdown 
                    className='custom'
                    value={this.state.searchInput}
                    onChange={this.handleChange}
                    searchable
                    clearable
                    backspaceRemoves
                    placeholder="Search for song..."
                    options={options}
                    menuPosition='top' />
            </div>
            // <div className="input-group input-group-lg">
            //     <input id="songNavigation" name="searchInput" type="text" value={this.state.searchInput} onKeyPress={this.songKeyPress} className="form-control" placeholder="Song Number..." onChange={this.handleChange} />
            //     <div className="input-group-append">
            //         <button className={buttonClass} type="button" onClick={this.handleSearchClick}><span>{this.props.submitButton}</span></button>
            //     </div>
            // </div>
        )
    }
}