 (function (window, document) {
    'use strict';

    // attach utils as a property of window
    var utils = window.utils || (window.utils = {});

     
    function noHelper(ipObjectList){
        return "";
    };

    // publish external API by extending utils
    function publishExternalAPI(utils) {
        angular.extend(utils, {
            'noHelper': noHelper
        });
    };

    publishExternalAPI(utils);

 })(window, document);