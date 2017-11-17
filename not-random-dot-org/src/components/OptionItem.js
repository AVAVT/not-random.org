//import liraries
import React, { PureComponent } from "react";

// create a component
class OptionItem extends PureComponent {
  _onValueChanged = event => {
    this.props.onChange(event.target.value);
  };

  _onPaste = event => {
    if(event.clipboardData.getData('text/plain').indexOf('\n') === -1) return;
    event.preventDefault();
    this.props.onChange(event.clipboardData.getData('text/plain'));
  }

  render() {
    const { value, index, onDelete } = this.props;
    return (
      <div className="col-12 col-md-6">
        <div className="form-group row">
          <div className="col-1 col-form-label text-right">{index}</div>
          <div className="col-11">
            <div className="input-group">
              <input
                type="text"
                value={value}
                onChange={this._onValueChanged}
                onPaste={this._onPaste}
                className="form-control"
              />
              {onDelete && (
                <span className="input-group-btn">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={onDelete}
                  >
                    <i className="fa fa-trash" aria-hidden="true" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//make this component available to the app
export default OptionItem;
