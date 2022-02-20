import jsonData from '../../dist/notifications.json';
import { normalize, schema } from 'normalizr';

const user = new schema.Entity("users");

const message = new schema.Entity(
  "messages",
  {},
  {
    idAttribute: 'guid',
  },
);

const notification = new schema.Entity("notifications", {
  author: user,
  context: message,
});

const notificationArray = new schema.Array(notification);

const normalizedData = normalize(jsonData, notificationArray);
export { normalizedData };

export const getAllNotificationsByUser = (userId) => {
  let result = [];

  for (const [key, value] of Object.entries(normalizedData.entities.notifications)) {
    if (value.author === userId) {
      result.push(normalizedData.entities.messages[value.context]);
    }
  }
  return result;
};


export const notificationsNormalizer = (data) => {
  let normalizedData = normalize(data, notificationArray);
  return normalizedData;
};
export default notificationsNormalizer;
