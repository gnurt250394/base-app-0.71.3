export function logError(error) {
  console.log('error: ', error);
  console.group &&
    console.group(
      '%cAPI ERROR',
      'color:white;font-weight:bold;background:red;padding:2px 6px',
    );
  if (error.response) {
    const apiName = error.config.apiName || 'UNKNOWN';

    console.log(apiName, error.response);
    console.groupEnd && console.groupEnd();
  } else if (error.request) {
    const apiName = error.config.headers.X_HEADER_API_LOG || 'UNKNOWN';

    console.log(apiName, error.request);
    console.groupEnd && console.groupEnd();
  } else {
    console.log('API Error', error.message);
    console.groupEnd && console.groupEnd();
  }
}
export function logResponse(res) {
  console.group &&
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:green;padding:2px 6px',
    );
  console.log('res: ', res);
  console.groupEnd && console.groupEnd();
}
