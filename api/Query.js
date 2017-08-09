const api = 'http://localhost:8000/api'

export default (type, params, select, headers) => {

    let args  = '';
    let vars  = '';
    let data  = {};
    let query = '';

    Object.keys(params || {}).forEach(function (key) {
        let param = params[key];
        args += '$' + key + ': ' + param.type;
        vars += key + ': $' + key;
        data[key] = param.value;
    });

    if (args.length) {
        query = 'query(' + args + ') {' + type + '(' + vars + ') {' + select + '}}';        
    } else {
        query = 'query {' + type + ' {' + select + '}}';                
    }

    return fetch(api, {
        method: 'POST',
        headers: headers || {},
        body: JSON.stringify({
              query: query,
              variables: data
        })
    }).then((response) => {
        return response.json()
    }).then((json) => {        
        return json.data[type]
    });

}