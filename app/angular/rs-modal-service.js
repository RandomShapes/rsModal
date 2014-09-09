function $rsModal($rootScope,$templateCache,MODAL_EVENTS) {
	return {
		open: open,
		close: close,
		flash: flash
	};

	///////////////
	function open() {
		var templateUrl = arguments[0] || "<h1>No template</h1>";
		var scopeObjects = arguments[1] || {};
		var callback = arguments[2] || '';
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