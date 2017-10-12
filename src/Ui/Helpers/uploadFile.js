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

  var xhr = new XMLHttpRequest();
  xhr.open(options.method || 'POST', options.url || '/', true);

  // xhr.setRequestHeader('Accept', options.accept);
  // xhr.setRequestHeader('Cache-Control', 'no-cache');
  // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // xhr.setRequestHeader('X-File-Name', encodeURIComponent(file.name));

  xhr.upload.onprogress = (event) => {
    if (!event.lengthComputable || !options.progress) {
      return;
    }
    var percent = Math.max(0, Math.min(100, (event.loaded / event.total) * 100));
    options.progress(xhr, file, Math.ceil(percent));
  };

  xhr.onload = (event) => {
    options.success(xhr, file);
    options.progress(xhr, file, 100);
  };

  xhr.onerror = () => {
    options.error(xhr, file);
    options.progress(xhr, file, 100);
  };

  xhr.send(formData);

};
