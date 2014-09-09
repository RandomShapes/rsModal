function rsModalRun($templateCache, $http) {
    $http.get('angular/rs-modal-template.html', {cache:$templateCache});
}