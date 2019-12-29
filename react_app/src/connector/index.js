export * from './config';

async function handleJsonResponse(resp) {
  let json;
  try {
    json = await resp.json();
  } catch (err) {
    throw new Error(`HTTP_ERROR_${resp.status}`);
  }
  if (json.message !== 'OK') {
    throw new Error(json.message);
  }
  return json;
}
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
  return handleJsonResponse(resp);
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
  return handleJsonResponse(resp);
}

export async function upload(endpoint, body = {}, headers = {}) {
  const fd = new FormData();
  Object.keys(body).forEach((k) => {
    fd.append(k, body[k]);
  });
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: fd,
  });
  return handleJsonResponse(resp);
}
