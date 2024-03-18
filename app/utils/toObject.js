function toObject(obj) {
  const result = {};

  for (const key of Object.keys(obj)) {
    if (key === 'password') continue;
    
    result[key] = obj[key];
  }

  return result;
}

module.exports = toObject;