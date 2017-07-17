(function() {
    jQuery(document).ready(function () {

		 
		
		if ('serviceWorker' in navigator) {
			if (navigator.serviceWorker.controller){
				// console.log("service worker already installed");
        if (typeof sw_message !== 'undefined') {
          navigator.serviceWorker.controller.postMessage(sw_message);
        } else {
          // console.log('no message');
        }
			}
			// else{
				// navigator.serviceWorker.register('/dehaan-sw.js', 
				// {scope: '/'}) 
			  // .then(function(reg) {
				////registration worked
				////console.log('Registration succeeded. Scope is ' + reg.scope);
				
			  // }).catch(function(error) {
				////registration failed
				// console.log('Registration failed with ' + error);
			  // });
			// }
			
		} else {
      console.log('No appropriate scope for serviceworker');
    }
		
    });
}).call(this);