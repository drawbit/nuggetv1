import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as assesmentActions from 'redux/modules/assesmentReducer';

@connect(
  state => ({user: state.auth.user}),
  assesmentActions
)
export default class createTest extends Component {

  static propTypes = {
    user: PropTypes.object,
    saveTestInDB: PropTypes.func
  };

  state = {
    formerrors: {},
    cards: [{ details: '', cardtype: 1 }],
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const testName = this.refs.testName.value;
    const testDesc = this.refs.testdesc.value;
    const { cards } = this.state;
    this.props.saveTestInDB({cards, testName, testDesc});
  }

  handleCardDetailschanged = (idx) => (evt) => {
    const newCards = this.state.cards.map((card, sidx) => {
      if (idx !== sidx) return card;
      return { ...card, details: evt.target.value };
    });

    this.setState({ cards: newCards });
  }

  handleCardTypechanged = (idx) => (evt) => {
    const newCards = this.state.cards.map((card, sidx) => {
      if (idx !== sidx) return card;
      return { ...card, cardtype: evt.target.value };
    });

    this.setState({ cards: newCards });
  }

  handleAddCard = () => {
    this.setState({
      cards: this.state.cards.concat([{ details: '', cardtype: 1 }])
    });
  }

  handleRemoveCard = (idx) => () => {
    this.setState({
      cards: this.state.cards.filter((item, sidx) => idx !== sidx)
    });
  }


  render() {
    const style = require('./CreateTest.scss');
    const {user} = this.props;

    return (
      <div className={style.createTest + ' container'}>
        {user &&
          <div>
              <h1>Create a new test</h1>
              <form className="login-form col-md-4" onSubmit={this.handleRegister}>
                <div className="form-group">
                  <input type="text" ref="testName" placeholder="Enter Name of the test" className="form-control"/>
                  {this.state.formerrors.testName}
                </div>
                <div className="form-group">
                  <input type="textarea" ref="testdesc" placeholder="Enter Description of test" className="form-control"/>
                  {this.state.formerrors.testdesc}
                </div>
                {this.state.cards.map((card, idx) => (
                  <div className={style.cardsContainer} key={idx}>
                    <input
                      type="text"
                      placeholder={`Card #${idx + 1} details`}
                      value={card.details}
                      onChange={this.handleCardDetailschanged(idx)}
                    />
                    <div className={style.cardType + ' form-group col-md-6'}>
                      <select ref="accounttype" className="form-control" onChange={this.handleCardTypechanged(idx)}>
                        <option defaultValue value="1">Plain Text</option>
                        <option value="2">Audio Link</option>
                        <option value="3">Video Link</option>
                        <option value="4">Image Link</option>
                      </select>
                    </div>

                    <button type="button" onClick={this.handleRemoveCard(idx)} className={style.cardDelete + ' btn btn-danger inline'}> Delete </button>
                  </div>
                ))}
                <button type="button" onClick={this.handleAddCard} className={style.cardButton + ' btn btn-info'}>Add Card</button>
                <button className={style.saveTest + ' btn btn-success'} onClick={this.handleSubmit}><i className={ style.cardButton + ' fa fa-sign-in cardButton'}/>
                  Create Test
                </button>
              </form>
          </div>  
        }
      </div>
    );
  }
}
