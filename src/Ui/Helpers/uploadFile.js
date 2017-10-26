export default (file, params) => {

  const defaults = {
    url      : '/',
    field    : 'file',
    method   : 'POST',
    accept   : 'text',
    complete : function() {},
    error    : function() {},
    success  : function() {},
    progress : function() {}
  };

  const options  = Object.assign(defaults, params);
  const formData = new FormData();

  formData.append(options.field, file);

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('progress', (event) => {

    if (!event.lengthComputable || !options.progress) {
      return;
    }

    let percent = Math.max(0, Math.min(100, (event.loaded / event.total) * 100));

    options.progress(xhr, file, Math.ceil(percent));

  });

  xhr.addEventListener('load', (event) => {

    const json = JSON.parse(event.target.response);

    if (json.status && json.status === 'error') {
      options.error(xhr, file, json);
    } else {
      options.success(xhr, file, json);
      options.progress(xhr, file, 100);
    }

  });

  xhr.addEventListener('error', (event) => {

    const json = JSON.parse(event.target.response);

    options.error(xhr, file, json);
    options.progress(xhr, file, 100);

  });

  xhr.open('POST', options.url, true);
  xhr.send(formData);

};
