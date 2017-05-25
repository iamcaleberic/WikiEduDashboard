import {
  DISMISS_SURVEY_NOTIFICATION, RECEIVE_COURSE, CREATED_COURSE, CAMPAIGN_MODIFIED,
  SAVED_COURSE, CHECK_COURSE, PERSISTED_COURSE, UPDATE_CLONE, RECEIVE_COURSE_CLONE,
  UPDATE_COURSE, SYLLABUS_UPLOAD_SUCCESS, UPLOADING_SYLLABUS, TOGGLE_EDITING_SYLLABUS,
  ADD_COURSE, RECEIVE_INITIAL_CAMPAIGN, ENABLE_CHAT_SUCCEEDED, LINKED_TO_SALESFORCE,
  RESTORE_COURSE
} from '../constants/action_types.js';

const blankCourse = {
  title: '',
  description: '',
  school: '',
  term: '',
  subject: '',
  expected_students: '0',
  start: null,
  end: null,
  day_exceptions: '',
  weekdays: '0000000',
  editingSyllabus: false
};

const initialState = {
  course: {},
  persisted: {},
  loaded: false
};

function persistCourse(state) {
  return { ...state, peristed: state.course };
}

function restoreCourse(state) {
  return { ...state, course: state.persisted };
}

function setCourse(state, courseData) {
  return {
    ...state,
    loaded: true,
    course: {
      ...state.course,
      error: undefined, // clear previously set errors
      ...courseData
    }
  };
}

function dismissNotification(state, id) {
  const newState = { ...state };
  const notifications = state.course.survey_notifications;
  const index = _.indexOf(notifications, _.where(notifications, { id })[0]);
  delete newState.course.survey_notifications[index];
  return newState;
}

export default function course(state = initialState, action) {
  switch (action.type) {
    case ADD_COURSE:
      return setCourse(state, blankCourse);
    case UPDATE_COURSE:
      return setCourse(state, action.course);
    case RECEIVE_COURSE: case CREATED_COURSE: case CAMPAIGN_MODIFIED:
    case SAVED_COURSE: case CHECK_COURSE: case PERSISTED_COURSE:
    case UPDATE_CLONE: case RECEIVE_COURSE_CLONE:
      return persistCourse(setCourse(state, action.course));
    case RESTORE_COURSE:
      return restoreCourse(state);
    case RECEIVE_INITIAL_CAMPAIGN:
      return setCourse(state, {
        initial_campaign_id: action.campaign.id,
        initial_campaign_title: action.campaign.title,
        description: action.campaign.template_description
      });
    case DISMISS_SURVEY_NOTIFICATION:
      return dismissNotification(state, action.notificationId);
    case ENABLE_CHAT_SUCCEEDED:
      return setCourse(state, { flags: { enable_chat: true } });
    case LINKED_TO_SALESFORCE:
      return setCourse(state, { flags: action.flags });
    case TOGGLE_EDITING_SYLLABUS:
      return setCourse(state, { editingSyllabus: action.editingSyllabus });
    case UPLOADING_SYLLABUS:
      return setCourse(state, { uploadingSyllabs: true });
    case SYLLABUS_UPLOAD_SUCCESS:
      return setCourse(state, { uploadingSyllabus: false, editingSyllabus: false });
    default:
      return state;
  }
}
