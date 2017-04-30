/**
 * Contains action types for redux.
 * @module redux/types
 */

//ProjectRequirementView
export const GET_PUBLIC_PROJECTS = 'GET_PUBLIC_PROJECTS';
export const GET_PRIVATE_PROJECTS = 'GET_PRIVATE_PROJECTS';
export const GET_ARCHIVED_PROJECTS = 'GET_ARCHIVED_PROJECTS';

export const GET_PROJECT_DATA_BY_ID = 'PROJECT_GET_DATA_BY_ID';
export const GET_PROJECT_META_BY_ID = 'PROJECT_GET_META_BY_ID';
export const GET_REQUIREMENTS_BY_PROJECT_ID = 'GET_REQUIREMENTS_BY_PROJECT_ID';
export const POST_REQUIREMENT_TO_PROJECT = 'POST_REQUIREMENT_TO_PROJECT';
export const DELETE_REQUIREMENT_TO_PROJECT = 'DELETE_REQUIREMENT_TO_PROJECT';
export const POST_PROJECT_NEW = 'POST_PROJECT_NEW';
export const CHANGE_PROJECTS_TABLE_MODE = 'CHANGE_PROJECTS_TABLE_MODE';
export const DELETE_PROJECT = 'DELETE_PROJECT';

//Projectform
export const CHANGE_PROJECT_FORM_MODE = 'CHANGE_PROJECT_FORM_MODE';
export const PROJECT_CLICKED = 'PROJECT_CLICKED';
export const FILL_PROJECT_FORM = 'FILL_PROJECT_FORM';

//Table actions
export const TABLE_PAGE = 'TABLE_PAGE';
export const TABLE_ROWS = 'TABLE_ROWS';
export const TABLE_SEARCH_DATA = 'TABLE_SEARCH_DATA';
export const TABLE_SEARCH_VALUE = 'TABLE_SEARCH_VALUE';

//Dialog actions
export const DIALOG_OPEN = 'DIALOG_OPEN';
export const DIALOG_CHANGE_ACTION = 'DIALOG_CHANGE_ACTION';

//Requirement
export const GET_ALL_REQUIREMENTS = 'GET_ALL_REQUIREMENTS';
export const GET_ALL_CATEGORY_NAMES = 'GET_CATEGORIES';
export const POST_UPDATE_REQUIREMENT = 'POST_UPDATE_REQUIREMENT';
export const ADD_REQUIREMENT = 'ADD_REQUIREMENT';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const DELETE_REQUIREMENT = 'DELETE_REQUIREMENT';

//Filter
export const UPDATE_FILTER_REQUIREMENT_LIST = 'UPDATE_FILTER_REQUIREMENT_LIST';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const ADD_TO_FILTER = 'ADD_TO_FILTER';
export const REMOVE_FROM_FILTER = 'REMOVE_FROM_FILTER';
export const ADD_TO_SUB_FILTER = 'ADD_TO_SUB_FILTER';
export const REMOVE_FROM_SUB_FILTER = 'REMOVE_FROM_SUB_FILTER';
export const ADD_FILTER = 'ADD_FILTER';
export const ADD_FILTERED = 'ADD_FILTERED';

//SideMenu
export const CHANGE_SIDE_MENU_MODE = 'CHANGE_SIDE_MENU_MODE';

//Snackbar
export const SNACKBAR = 'SNACKBAR';

//User
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_WITH_CLASS = 'GET_USERS_WITH_CLASS';
export const GET_USERCLASSES = 'GET_USERCLASSES';

//UserForm
export const FILL_FORM = 'FILL_FORM';
export const POST_USER_NEW = 'POST_USER_NEW';
export const POST_USER_UPDATE = 'POST_USER_UPDATE';
export const POST_USER_DELETE = 'POST_USER_DELETE';

//Classform
export const FILL_CLASS_FORM = "FILL_CLASS_FORM";
export const POST_CLASS_NEW = "POST_CLASS_NEW";
export const POST_CLASS_UPDATE = "POST_CLASS_UPDATE";
export const POST_CLASS_DELETE = "POST_CLASS_DELETE";

//Statistics
export const GET_PROJECTS_PER_REQUIREMENT = 'GET_PROJECTS_PER_REQUIREMENT';

//Popover
export const POPOVER_ANCHOR = 'POPOVER_ANCHOR';
export const POPOVER_CONTENT = 'POPOVER_CONTENT';
export const POPOVER_OPEN = 'POPOVER_OPEN';
export const POPOVER_ADD = 'POPOVER_ADD';