angular.module('rs-modal', [])
    .factory('$rsModal', $rsModal)
    .directive('rsModal', rsModal)
    .controller('RsModalCtrl', RsModalCtrl)
    .run(rsModalRun);