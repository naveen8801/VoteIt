export const getErrorMessage = (error) => {
  let { status, data } = error?.response || {};
  let msg = '';
  if (status === 401) {
    msg = 'Unauthorized';
  } else if (status === 403) {
    msg = 'Unauthorized';
  } else if (status === 404) {
    msg = 'Not Found';
  } else if (status === 500) {
    msg = 'Internal Server Error';
  }
  if (data?.msg) {
    msg = data?.msg;
  }
  if (!msg) msg = 'Connection Error';
  return data?.error || msg;
};
