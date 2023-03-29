import { GiphyFetch } from '@giphy/js-fetch-api';

const API_KEYS = [
  'Fqp8BHSCeCKSLJrWd6U6GCrNVemmVM08',
  'XoSMKxxK7rTVA19MqQlSLHV6mk7OeYGs',
  'rBYuQR0BcwU2qBCP3jSmkac8nsTClMA3',
  'Ez8QDs8WNhHlIsebVh7wHBLmvdMBPRFA',
  '8FUM6p9d2qyXvw8o1ZFQonbOXZL3wUdA',
  'CUaZ3IYORYDlfAc0ELzDcUB9QB5qxohE',
  'KIZleMM5QFhwc9YVCBSM74CbAV9fd9eY',
];

let apiKeyIndex = 0;
let apiCallsCounter = 0;

function getNextApiKey() {
  apiKeyIndex = (apiKeyIndex + 1) % API_KEYS.length;
  return API_KEYS[apiKeyIndex];
}

function createGiphyFetch() {
  const apiKey = getNextApiKey();
  apiCallsCounter++;
  if (apiCallsCounter >= 42) {
    console.warn(`Giphy API call limit reached for key ${apiKey}, switching to next key...`);
    apiCallsCounter = 0;
    apiKeyIndex = (apiKeyIndex + 1) % API_KEYS.length;
  }
  return new GiphyFetch(apiKey);
}

function resetApiCallsCounter() {
  apiCallsCounter = 0;
}

setInterval(resetApiCallsCounter, 60 * 60 * 1000); // call resetApiCallsCounter every hour

export { createGiphyFetch };
