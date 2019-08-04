let session = {};

export const setValue = (key, value)=> {
  session[key] = value;
};

export const getValue = (key)=> session[key];
