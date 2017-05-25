import React from 'react';
import Gradeable from './gradeable.jsx';
import BlockStore from '../../stores/block_store';

function getState() {
  return {
    blocks: BlockStore.getBlocks({ graded: true }).filter(block => block.graded)
  };
}

const Grading = React.createClass({
  displayName: 'Grading',

  mixins: [BlockStore.mixin],

  getInitialState() {
    return getState();
  },

  storeDidChange() {
    return this.setState(getState());
  },

  render() {
    // TODO: Change _.sum to _.sumBy when lodash is upgraded to v4.
    const total = _.sum(this.state.blocks, 'points');
    const gradeables = this.state.blocks.map((block) => {
      return (
        <Gradeable
          key={block.id}
          block={block}
        />
      );
    });
    gradeables.sort((a, b) => {
      if (!a.props.gradeable || !b.props.gradeable) { return 1; }
      return a.props.gradeable.order - b.props.gradeable.order;
    });
    let noGradeables;
    if (!gradeables.length) {
      noGradeables = (
        <li className="row view-all">
          <div><p>{I18n.t('timeline.gradeables_none')}</p></div>
        </li>
      );
    }

    return (
      <div className="grading__grading-container">
        <a name="grading"></a>
        <div className="section-header timeline__grading-container">
          <h3>{I18n.t('timeline.grading_header', { total })}</h3>
        </div>
        <ul className="list-unstyled timeline__grading-container">
          {gradeables}
          {noGradeables}
        </ul>
      </div>
    );
  }
}
);

export default Grading;
