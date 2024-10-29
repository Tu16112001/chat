import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './notificationActionTypes';

export const addNotification = (notification) => ({
    type: ADD_NOTIFICATION,
    payload: notification,
  });



export const removeNotification = (notificationId) => ({
  type: REMOVE_NOTIFICATION,
  payload: notificationId,
});