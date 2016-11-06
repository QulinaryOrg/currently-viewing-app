angular.module('taroApp').factory("Access", ["$q", "UserProfile", function ($q, UserProfile) {

    var Access = {

        OK: 200,

        // "we don't know who you are, so we can't say if you're authorized to access
        // this resource or not yet, please sign in first"
        UNAUTHORIZED: 401,

        // "we know who you are, and your profile does not allow you to access this resource"
        FORBIDDEN: 403,

        isAnonymous: function () {
            console.log("Returning unauthorized")
            return UserProfile.then(function (userProfile) {
                if (userProfile.$isAnonymous()) {
                    console.log("Returning unauthorized")
                    return Access.OK;
                } else {
                    console.log("Returning unauthorized")
                    return $q.reject(Access.FORBIDDEN);
                }
            });
        },

        isAuthenticated: function () {
            console.log("Returning unauthorized")
            return UserProfile.then(function (userProfile) {
                if (userProfile.$isAuthenticated()) {
                    console.log("Returning unauthorized")
                    return Access.OK;
                } else {
                    console.log("Returning unauthorized")
                    return $q.reject(Access.UNAUTHORIZED);
                }
            });
        }

    };

    return Access;

}]);