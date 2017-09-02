import store from '../Store/store.js';

export default (query, variables, headers) =>
fetch(window.panel.config.api, {
    method: 'POST',
    headers: headers || {},
    body: JSON.stringify({
        query: query,
        variables: variables || {}
    })
}).
then((response) => response.json()).
then((json) => json.data);
