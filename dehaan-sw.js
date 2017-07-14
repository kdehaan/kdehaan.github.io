

function prefetch_page(request_url) {
  var fetchRequest = request_url;
  return fetch(fetchRequest, { credentials: 'include' }).then(
    function(response) {
      if(!response || response.status !== 200 || response.type !== 'basic') {
        console.log("response failed")
			  return;
      }
      caches.open(CURRENT_CACHES.main_cache).then(function(cache) {
        cache.put(fetchRequest, response);
      });
      // console.log("cached", request_url);
			return;
    }
  );
}

function delswcaches(){
	// console.log("attempting deletion");
	caches.keys().then(function (cachesNames) {
	  // console.log("Delete caches");
	  return Promise.all(cachesNames.map(function (cacheName) {
		return caches.delete(cacheName).then(function () {
       // console.log("Cache with name " + cacheName + " is deleted");
		});
	  }))
	}).catch(function(error) {
		//deletion failed
		console.log('cache deletion failed with ' + error);
	});
}

self.addEventListener('fetch', function(event) {

	
  console.log('Handling fetch event for', event.request.url);
  event.respondWith(
    caches.open(CURRENT_CACHES.main_cache).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request.clone()).then(function(response) {
         console.log('  Response for %s from network is: %O',
           event.request.url, response);

          if (response.status < 400) {
            // This avoids caching responses that we know are errors (i.e. HTTP status code of 4xx or 5xx).
            cache.put(event.request, response.clone()).catch(function(error) {
		     //console.log('unsupported' + error);
		    });
          } else {
            //console.log('  Not caching the response to', event.request.url);
          }

          // Return the original response object, which will be used to fulfill the resource request.
          return response;
        });
      }).catch(function(error) {
        console.error('  Error in fetch handler:', error);

        throw error;
      });
    })
  );
});