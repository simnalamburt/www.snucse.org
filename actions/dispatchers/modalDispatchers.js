import * as types from '../actionTypes';

export function cancelModal(dispatch) {
  dispatch({
    type: types.INITIALIZE_MODAL
  });
}

export function normalModal(dispatch, title, message, callback) {
  const callbackWrapper = () => {
    if (typeof callback === 'function') {
      callback();
    }
    cancelModal(dispatch);
  };
  dispatch({
    type: types.SET_MODAL,
    modalType: 'normal',
    title,
    message,
    buttons: [{label: '확인', callback: callbackWrapper}]
  });
}

export function confirmModal(dispatch, title, message, positiveCallback, negativeCallback) {
  const positiveCallbackWrapper = () => {
    if (typeof positiveCallback === 'function') {
      positiveCallback();
    }
    cancelModal(dispatch);
  };
  const negativeCallbackWrapper = () => {
    if (typeof negativeCallback === 'function') {
      negativeCallback();
    }
    cancelModal(dispatch);
  };
  dispatch({
    type: types.SET_MODAL,
    modalType: 'confirm',
    title,
    message,
    buttons: [
      {label: '확인', callback: positiveCallbackWrapper},
      {label: '취소', callback: negativeCallbackWrapper}
    ],
    options: {closable: false} // '취소'를 눌러야만 하게끔
  });
}

export function alertModal(dispatch, title, message, callback) {
  const callbackWrapper = () => {
    if (typeof callback === 'function') {
      callback();
    }
    cancelModal(dispatch);
  };
  dispatch({
    type: types.SET_MODAL,
    modalType: 'alert',
    title,
    message,
    buttons: [{label: '확인', callback: callbackWrapper}]
  });
}

export function makeCustomModal(dispatch, modalType, title, message, buttons, options) {
  /*
    buttons = [
      { label: string, callback: function },
      { ... },
    ]
  */
  dispatch({
    type: types.SET_MODAL,
    modalType,
    title,
    message,
    buttons,
    options
  });
}
