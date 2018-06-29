import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import './CardSettings.scss';

class CardSettings extends Component {
    render() {
      return (
            <ButtonToolbar className="pull-right">
                <DropdownButton bsStyle="default" bsSize="xsmall" title="settings" noCaret id="dropdown-no-caret">
                    <MenuItem eventKey="1">Share</MenuItem>
                    <MenuItem eventKey="2">Results</MenuItem>
                    <MenuItem eventKey="3">Edit</MenuItem>
                    <MenuItem eventKey="4">Duplicate</MenuItem>
                    <MenuItem eventKey="5">Change cover</MenuItem>
                    <MenuItem divider />
                    <MenuItem className="delete" eventKey="6">Delete</MenuItem>
                </DropdownButton>
            </ButtonToolbar>
        );
    }    
}
export default CardSettings;
