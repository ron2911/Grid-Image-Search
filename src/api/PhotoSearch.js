export default function photoSearch(tag, page, callback) {
  fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b9901ffcd4d02e9e7ceec0183b9aeb82&tags=${tag}&page=${page}&format=json&nojsoncallback=1`)
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    callback(data);
  }).catch(function(err) {
    console.log('Error ', err);
  });
}
