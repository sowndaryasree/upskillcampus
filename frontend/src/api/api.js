// tiny fetch helper that uses proxy from package.json
export async function apiGet(path, token) {
  const headers = token ? { 'x-auth-token': token } : {};
  const res = await fetch(path, { headers });
  return res.json();
}

export async function apiPost(path, body, token) {
  const headers = { 'Content-Type': 'application/json', ...(token ? { 'x-auth-token': token } : {}) };
  const res = await fetch(path, { method: 'POST', headers, body: JSON.stringify(body) });
  return res.json();
}

export async function apiPut(path, body, token) {
  const headers = { 'Content-Type': 'application/json', ...(token ? { 'x-auth-token': token } : {}) };
  const res = await fetch(path, { method: 'PUT', headers, body: JSON.stringify(body) });
  return res.json();
}
