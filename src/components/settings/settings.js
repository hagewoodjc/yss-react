import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import './settings.css'

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = (event) => {
        event.preventDefault();
        this.setState({modal: !this.state.modal});
    }

    render() {
        const closeBtn = <Button className="modalClose" onClick={this.toggle}><span><FontAwesomeIcon icon="times" /></span></Button>

        return(
            <div>
                <Button className="btn-outline-light" onClick={this.toggle}><span><FontAwesomeIcon icon="wrench" size="2x"/></span></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} wrapClassName="w-100" contentClassName="bg-dark text-white" size="lg"
                    backdrop="static">
                    <ModalHeader id="settingsModalHeader" toggle={this.toggle} close={closeBtn}>
                        <span>Change Settings</span>                
                    </ModalHeader>
                    <ModalBody>
                        <span>Settings popup test</span>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


