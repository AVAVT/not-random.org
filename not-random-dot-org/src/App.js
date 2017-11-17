import React, { Component } from "react";
import { connect } from "react-redux";

import OptionList from "./components/OptionList";
import { randomItemFromArray } from "./utilities/MathUtilities";
import { optionCleared, optionDeleted } from "./actions";

class App extends Component {
  state = {
    result: "",
    resultId: -1
  };

  _onRoll = () => {
    const randomItem = randomItemFromArray(this.props.options.filter(e => e.value));

    this.setState({
      result: randomItem ? randomItem.value : "",
      resultId: randomItem ? randomItem.id : -1
    });
  };

  _onClear = () => {
    this.props.onClear();
    document.getElementsByTagName("input")[0].focus();
  };

  _onClearRoll = () => {
    this.props.onOptionDelete(this.state.resultId);
    this.setState({
      needReroll: true
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.needReroll) {
      this._onRoll();
      this.setState({
        needReroll: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/notrandomdotorg">
            Totally Not Random.Org
          </a>
        </nav>

        <section className="container mt-3">
          <h3>Random options:</h3>
          <OptionList />
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={this._onRoll}
          >
            Roll!
          </button>
          {this.state.result &&
            this.props.options.length > 1 && (
              <button
                type="button"
                className="btn btn-warning mr-2"
                onClick={this._onClearRoll}
              >
                Remove Hit &amp; Roll
              </button>
            )}
          {this.props.options.length > 1 && (
            <button
              type="button"
              className="btn btn-danger mr-2"
              onClick={this._onClear}
            >
              Reset
            </button>
          )}
        </section>
        <h2 className="container mt-3">{this.state.result}</h2>
      </div>
    );
  }
}

const mapStoreStateToProps = ({ options }) => ({ options });

const mapDispatchToProps = dispatch => ({
  onClear: () => {
    dispatch(optionCleared());
  },
  onOptionDelete: id => {
    dispatch(optionDeleted(id));
  }
});

//make this component available to the app
export default connect(mapStoreStateToProps, mapDispatchToProps)(App);
