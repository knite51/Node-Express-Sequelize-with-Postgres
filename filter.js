const filterStr = (inputStr) => {
  const regex = /[a e i o u]/ig;
  if (inputStr.match(regex)) {
    return `The string ${inputStr} contains a vowel at the least`;
  }
  return `The string ${inputStr} doesn not contains any vowel`;
};

export default filterStr;
