const first = (list) => {
  if (Array.isArray(list)) {
      return list[0];
  } else {
    return undefined;
  }
}

export default first;