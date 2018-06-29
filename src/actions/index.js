export function timeInfo() {
  return new Promise((resolve) => {
    resolve({
      message: 'This came from the api server',
      time: Date.now()
    });
  });
}

export function getAuth(req) {
  return Promise.resolve((req.session || {}).user || null);
}

export function signin(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);
}

export function logout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session = null;
      return resolve(null);
    });
  });
}

export * as widget from './widget/index';
export * as survey from './survey/index';
