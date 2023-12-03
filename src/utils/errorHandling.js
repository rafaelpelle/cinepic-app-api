// Error handling reference:
// Kent C. Dodds
// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

function isErrorWithMessage(error) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

function toErrorWithMessage(maybeError) {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error) {
  const errorMessage = toErrorWithMessage(error).message;
  console.error(errorMessage);

  return errorMessage;
}

module.exports = {
  getErrorMessage,
};
