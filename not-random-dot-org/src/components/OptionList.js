//import liraries
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { optionValueChanged, optionDeleted } from "../actions";
import OptionItem from "./OptionItem";

// create a component
class OptionList extends PureComponent {
  render() {
    const items = this.props.options.map((option, index) => (
      <OptionItem
        key={option.id}
        value={option.value}
        index={index + 1}
        onChange={value => this.props.onOptionValueChanged(option.id, value)}
        onDelete={
          index !== this.props.options.length - 1
            ? () => this.props.onOptionDelete(option.id)
            : null
        }
      />
    ));

    return <section className="row">{items}</section>;
  }
}

const mapStoreStateToProps = ({ options }) => ({ options });

const mapDispatchToProps = dispatch => ({
  onOptionValueChanged: (id, value) => {
    dispatch(optionValueChanged({ id, value }));
  },
  onOptionDelete: id => {
    dispatch(optionDeleted(id));
  }
});

//make this component available to the app
export default connect(mapStoreStateToProps, mapDispatchToProps)(OptionList);
