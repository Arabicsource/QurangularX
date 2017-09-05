export const routeParams = {
  verses: {
    key: 'verses',
    urlRegex: /^\d+\.\d+(-\d+)?(,\d+\.\d+(-\d+)?)*$/,
    extractRegex: /(\d+)\.(\d+)-?(\d+)/g
  }
};
