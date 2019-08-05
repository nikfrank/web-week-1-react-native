let session = {};

export const setValue = (key, value)=> {
  session[key] = value;
};

export const getValue = (key)=> session[key];


let subscriptions = [];

export const publish = (key, value)=> {
  session[key] = value;

  // call all subscriptions
  subscriptions.filter(sub => sub.key === key)
               .forEach(sub => sub.callback( session[key] ));
};

export const subscribe = (key, callback)=> {
  const index = Math.random() + 1;

  subscriptions.push({ key, callback, index });

  callback( session[key] );

  return index;
};

export const unsubscribe = (index)=> {
  subscriptions = subscriptions.filter(sub => sub.index !== index);
};
