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