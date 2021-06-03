import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.methods = options.methods || 'GET';
  options.headers = options.headers || {};

  if (options.methods.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}
