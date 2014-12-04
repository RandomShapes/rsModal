function $rsModal($rootScope,$templateCache,MODAL_EVENTS) {
	var openIndex = 0;

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
			$templateCache.remove('$rsModal.html' + (openIndex - 1));
			$templateCache.put('$rsModal.html' + openIndex,templateUrl);
			templateUrl = "$rsModal.html" + openIndex;
			openIndex++;
		}

		$rootScope.$broadcast(MODAL_EVENTS.open, templateUrl, scopeObjects, callback);
	}

	function close() {
		$rootScope.$broadcast(MODAL_EVENTS.close);
	}

	function flash() {
		var message = arguments[0];
		var type = arguments[1] || "alert-info";
		$rootScope.$broadcast(MODAL_EVENTS.flash, message, type);
	}
}