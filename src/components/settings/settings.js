import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Switch from 'react-switch';

import './settings.css'

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            enablePowerSearch: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    handleChange = (checked, event, id) => {
        event.preventDefault();
        switch(id) {
            case "togglePowerSearch":
                this.setState({enablePowerSearch: checked})
                break;

            default:
                break;
        }
    }

    toggle = (event) => {
        event.preventDefault();
        this.setState({modal: !this.state.modal});
    }

    onSave = (event) => {
        var settings = {
            enablePowerSearch: this.state.enablePowerSearch
        }
        this.toggle(event);
        this.props.onSave(settings);
    }
    
    render() {
        const closeBtn = <Button className="modalClose" onClick={this.toggle}><span><FontAwesomeIcon icon="times" /></span></Button>
        
        return(
            <div>
                <Button className="btn-outline-light" onClick={this.toggle}><span><FontAwesomeIcon icon="wrench" size="2x"/></span></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} wrapClassName="w-100" contentClassName="bg-dark text-white" size="lg"
                    backdrop="static">
                    <ModalHeader id="settingsModalHeader" toggle={this.toggle} close={closeBtn}>
                        <h3>Change Settings</h3>                
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className="row">
                                <div className="col-2">
                                    <label htmlFor="enablePowerSearch">
                                        <Switch onChange={this.handleChange} checked={this.state.enablePowerSearch}
                                            className="react-switch" id="togglePowerSearch"/>
                                    </label>
                                </div>
                                <div className="col">
                                    <h4>Enable Power Search</h4>                                
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>                        
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-success btn-lg" onClick={this.onSave}>Save</button>
                            </div>                    
                            <div className="col">
                                <button className="btn btn-secondary btn-lg" onClick={this.toggle}>Close</button>
                            </div>           
                        </div>  
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
