import store from '../Store/store.js';

export default (query, variables, headers) => {

    return fetch(store.getters.api, {
        method: 'POST',
        headers: headers || {},
        body: JSON.stringify({
              query: query,
              variables: variables || {}
        })
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json.data
    });

}
