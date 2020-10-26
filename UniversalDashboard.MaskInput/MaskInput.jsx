import React from 'react';
import MaskedInput from 'react-text-mask'
class MaskInput extends React.Component {

  // state is for keeping control state before or after changes.
  state = {
    // the things you want to put in state.
    // text: this.props.text //un comment the line to use state insted props
  }


  render() {

    return (
      <MaskedInput
        mask={[/[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/]}
        className={this.props.className}
        placeholder={this.props.placeholder}
        guide={this.props.guide}
      // onChange={() => { }}
      />
    );

  }
}

export default MaskInput
