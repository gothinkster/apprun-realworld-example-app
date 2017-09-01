export function toQueryString(obj) {
  const parts = [];
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return parts.join("&");
}

export function serializeObject(form) {
  let obj = {};
  if (typeof form == 'object' && form.nodeName == "FORM") {
    for (let i = 0; i < form.elements.length; i++) {
      const field = form.elements[i];
      if (field.name
        && field.type != 'file'
        && field.type != 'reset'
        && field.type != 'submit'
        && field.type != 'button') {
        if (field.type == 'select-multiple') {
          obj[field.name] = '';
          let tempvalue = '';
          for (let j = 0; j < form.elements[i].options.length; j++) {
            if (field.options[j].selected)
              tempvalue += field.options[j].value + ';';
          }
          if (tempvalue.charAt(tempvalue.length - 1) === ';') obj[field.name] = tempvalue.substring(0, tempvalue.length - 1);

        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
          obj[field.name] = field.value;
        }
      }
    }
  }
  return obj;
}

export async function get(url: string, access_token?: string) {
  const headers = access_token ? { 'Authorization': `Bearer ${access_token}` } : {}
  const response = await window['fetch'](url, {
    method: 'GET',
    headers
  });
  return await response.json();
}

export async function post(url: string, data: any, access_token?: string) {
  const headers = access_token ? { 'Authorization': `Bearer ${access_token}` } : {}
  headers['Content-Type'] = 'application/json; charset=utf-8';
  const response = await window['fetch'](url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return await response.json();
}

