import React, { Component } from 'react';
const ReactTags = require('react-tag-input').WithOutContext;
import { Link } from 'react-router';
const styles = require('./ChooseTest.scss');

const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class ChooseTest extends Component {
    constructor(props) {
      super(props);

      this.state = {
        tags: [
            { id: 'Thailand', text: 'Thailand' },
            { id: 'India', text: 'India' }
        ],
        suggestions: [
            { id: 'USA', text: 'USA' },
            { id: 'Germany', text: 'Germany' },
            { id: 'Austria', text: 'Austria' },
            { id: 'Costa Rica', text: 'Costa Rica' },
            { id: 'Sri Lanka', text: 'Sri Lanka' },
            { id: 'Thailand', text: 'Thailand' }
        ]
      };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleAddition = this.handleAddition.bind(this);
      this.handleDrag = this.handleDrag.bind(this);
    }
 
    handleDelete(num) {
      const { tags } = this.state;
      this.setState({
        tags: tags.filter((tag, index) => index !== num),
      });
    }
 
    handleAddition(tag) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
      const tags = [...this.state.tags];
      const newTags = tags.slice();
 
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
 
      // re-render
      this.setState({ tags: newTags });
    }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div className={styles.choose} className="container">
        <form className="login-form col-sm-5">
            <h3><strong>About the Role</strong></h3>
            <div className={styles.bufferHeight}></div>
            <div className="form-group">
            <input className="form-control" type="text" placeholder="Role Title"/>
            </div>
            <div className="form-group">
            <select className="form-control" ref="role-title">
                <option selected>Role Level</option>
                <option value="1">Co-op/Internship</option>
                <option value="2">Entry Level</option>
                <option value="3">Junior Manager</option>
                <option value="4">Mid-level Manager</option>
            </select>
            </div>
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div>
            <Link className="btn btn-primary">
                Create
            </Link>
        </form>
      </div>
    );
  }
}
