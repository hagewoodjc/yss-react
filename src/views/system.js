import React from 'react';
import SongDisplay from '../components/songDisplay';
import Navigation from '../components/navigation';
import './system.css'

export default class System extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: '',
            fileContent: ''
        }

        this.loadSong = this.loadSong.bind(this);
    }

    loadSong = (songInput) => {       
        var path = `./songs/${songInput}.htm`;
        this.load(path);        
    }
    
    async load(path) {
        try
        {
            const response = await fetch(path);

            if (!response.ok) {
                throw Error(response.statusText);
            }

            const content = await response.text();
            this.setState({fileContent: content});
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
                <div className="container-fluid h-100 w-100 d-flex flex-column align-items-start">
                    <div style={{overflowY:'auto'}} className="mb-auto h-100 w-100 p-2">
                        <SongDisplay path={this.state.filePath} content={this.state.fileContent} />
                    </div>                        
                    <div className="p-2 w-100 navigation rounded">
                        <Navigation onNavigate={this.loadSong} onQueue={this.launchQueue} onLoadSong={this.loadSong}/>
                    </div> 
                </div>
        );
    }
}

