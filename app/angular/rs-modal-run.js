function rsModalRun($templateCache) {
    $templateCache.put('rs-modal-template.html','<div class="modal-background"><div class="modal-body"><div ng-click="vm.close()" class="close-button">X</div><div class="alert {{vm.modalFlashType}}" ng-show="vm.modalFlash">{{vm.modalFlash}}</div><ng-include src="vm.template"></ng-include></div></div>');
}