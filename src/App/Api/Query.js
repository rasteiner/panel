const api = 'http://localhost:8000'

export default (query, variables, headers) => {

    return fetch(api, {
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
