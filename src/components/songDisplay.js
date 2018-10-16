import React from 'react';
//import Iframe from 'react-iframe'

export default function SongDisplay(props) {
    return (
        <div className="h-100" dangerouslySetInnerHTML={{__html: props.content}}>
            {/* {props.path && props.path.trim !== '' ?                    
                <Iframe url={props.path}
                className="h-100 w-100"
                position="relative"/>
            : <div></div>} */}
        </div>
    );        
}