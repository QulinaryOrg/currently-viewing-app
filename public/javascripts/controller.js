/**
 * Created by shyam on 08/05/16.
 */
(function () {
    app.controller.updateDeviceList = function (devices) {
        var devicesLi = "";
        for (var i = 0; i < devices.length; i++) {
            devicesLi = devicesLi+ "<li>"+ devices[i]+"</li>";
        }
        document.getElementById("devices-list").innerHTML = devicesLi;
    };
})();