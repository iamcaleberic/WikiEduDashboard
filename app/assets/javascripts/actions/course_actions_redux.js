import * as types from '../constants/action_types.js';
// import ApiFailAction from './api_fail_action.js';
// import API from '../utils/api.js';
import ServerActions from './server_actions.js';

// This action uses the Thunk middleware pattern: instead of returning a plain
// action object, it returns a function that takes the store dispatch and getState
// functions — which Thunk automatically provides — and can then dispatch a series
// of plain actions to be handled by the store.
// This is how actions with side effects — such as API calls — are handled in
// Redux.
export function updateCourse(course, save = false) {
  return function (dispatch, getState) {
    dispatch({ type: types.UPDATE_COURSE, course: course });
    if (!save) { return; }
    const updatedCourse = getState().course.course;
    ServerActions.saveCourse(updatedCourse, updatedCourse.slug);
  };
}
