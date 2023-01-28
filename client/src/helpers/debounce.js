const debounce = fn => {
  console.log('debounce run');
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(args);
    }, 500);
  };
};

export default debounce;
