export default function() {

  return fetch('/mock/data/users.json').then(function (response) {
    return response.json()
  })

}
