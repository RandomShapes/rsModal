(function(angular,$) { 

angular.module('rs-modal', [])
    .factory('$rsModal', $rsModal)
    .directive('rsModal', rsModal)
    .controller('RsModalCtrl', RsModalCtrl)
    .run(rsModalRun);
angular.module('rs-modal').constant('MODAL_EVENTS', {
	open: 'modal-open-event',
	close: 'modal-close-event',
	flash: 'modal-flash-event'
});
function RsModalCtrl($scope,$rootScope,$timeout,MODAL_EVENTS){
	var vm = this;	

	vm.isVisible = false;
	vm.template = '';
	vm.modalFlash = '';
	vm.modalType = '';

	//////////////////////////////////

	//For dismissal of Modal
	$(document).ready(function() {
		$(document).on('click', function(event) {
		  if (!$(event.target).closest('.modal-body').length) {
		    if(vm.isVisible) {
		    	close();
		    }
		  }
		});
	});

	$rootScope.$on(MODAL_EVENTS.open, function(e, templateUrl, scopeObj, callback) {
		vm.template = templateUrl;
		assignScope(scopeObj);
		open();
		if (callback !== '') {
			$timeout(function() {
				callback();
			}, 50);
		}
	});	

	$rootScope.$on(MODAL_EVENTS.close, function() {
		close();
	});

	$rootScope.$on(MODAL_EVENTS.flash, function(e, message, type) {
		flash(message,type);
	});

	function assignScope(scopeObj) {
		for (var prop in scopeObj) {
			$scope[prop] = scopeObj[prop];
		}
	}

	var animTime = 300;

	function open() {
		$('rs-modal').addClass('modal-show');

		$('rs-modal .modal-background').transition({
			opacity: 1
		}, animTime, 'snap');

		$('rs-modal .modal-body').transition({
			opacity: 1,
			y: "2rem"
		}, animTime, 'snap', function() {
			vm.isVisible = true;
		});

	}

	function close() {
		$('rs-modal .modal-background').css({
			opacity: 0
		});

		$('rs-modal .modal-body').css({
			opacity: 0,
			y: "0"
		});

		$('rs-modal').removeClass('modal-show');

		vm.isVisible = false;
		vm.modalFlash = '';
	}


	function flash(message, type) {
		vm.modalFlash = message;
		vm.modalFlashType = type;
	}
}
RsModalCtrl.$inject = ["$scope", "$rootScope", "$timeout", "MODAL_EVENTS"];
function rsModal() {
	return {
		restrict: "E",
		templateUrl: 'angular/rs-modal-template.html',
		controller: 'RsModalCtrl',
		controllerAs: 'vm'
	};
}
function rsModalRun($templateCache, $http) {
    $http.get('angular/rs-modal-template.html', {cache:$templateCache});
}
rsModalRun.$inject = ["$templateCache", "$http"];
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
$rsModal.$inject = ["$rootScope", "$templateCache", "MODAL_EVENTS"]; 

})(angular,$);