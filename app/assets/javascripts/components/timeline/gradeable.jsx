import React from 'react';
import TextInput from '../common/text_input.jsx';

const Gradeable = React.createClass({
  displayName: 'Gradeable',

  propTypes: {
    block: React.PropTypes.object.isRequired
  },

  render() {
    const { block } = this.props;
    return (
      <li className="gradeable block">
        <h4 className="block-title">
          {block.title}
        </h4>
        <TextInput
          value={block.points || ''}
          value_key={'points'}
          label={I18n.t('timeline.gradeable_value')}
          append="%"
        />
      </li>
    );
  }
}
);

export default Gradeable;
