export * from './config';

export async function post(endpoint, body = {}, headers = {}) {
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const json = await resp.json();
  if (json.message !== 'OK') {
    throw new Error(json.message);
  }
  return json;
}

export async function get(endpoint, params = {}, headers = {}) {
  const params1 = Object.keys(params).map((k) => `${k}=${params[k]}`);
  const paramsStr = params1.join('&');
  const composedUrl = `${endpoint}?${paramsStr}`;

  const resp = await fetch(composedUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const json = await resp.json();
  if (json.message !== 'OK') {
    throw new Error(json.message);
  }
  return json;
}
