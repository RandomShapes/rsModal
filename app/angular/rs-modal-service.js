function $rsModal($rootScope,$templateCache,MODAL_EVENTS) {
	return {
		open: open,
		close: close,
		flash: flash
	};

	///////////////
	function open() {
		var templateUrl = arguments[0];
		var scopeObjects = arguments[1] || {};
		var callback = arguments[2] || '';

		if(typeof $templateCache.get(templateUrl) === 'undefined') {
			$templateCache.put('$rsModal.html',templateUrl);
			templateUrl = "$rsModal.html";
		}

		$rootScope.$broadcast(MODAL_EVENTS.open, templateUrl, scopeObjects, callback);
	}

	function close() {
		$rootScope.$broadcast(MODAL_EVENTS.close);
	}

	function flash() {
		var message = arguments[0] || "Please supply a message";
		var type = arguments[1] || "alert-info";
		$rootScope.$broadcast(MODAL_EVENTS.flash, message, type);
	}
}