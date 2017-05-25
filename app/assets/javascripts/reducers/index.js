import { combineReducers } from 'redux';
import articleDetails from './article_details.js';
import course from './course.js';
import needHelpAlert from './need_help_alert.js';
import ui from './ui.js';

const reducer = combineReducers({
  articleDetails,
  course,
  needHelpAlert,
  ui
});

export default reducer;
