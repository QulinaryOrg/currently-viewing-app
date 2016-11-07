angular.module('taroApp').factory("Access", ["$q", "UserProfile", function ($q, UserProfile) {

    var Access = {

        OK: 200,

        // "we don't know who you are, so we can't say if you're authorized to access
        // this resource or not yet, please sign in first"
        UNAUTHORIZED: 401,

        // "we know who you are, and your profile does not allow you to access this resource"
        FORBIDDEN: 403,

        isAnonymous: function () {
            return UserProfile.then(function (userProfile) {
                if (userProfile.$isAnonymous()) {
                    return Access.OK;
                } else {
                    return $q.reject(Access.FORBIDDEN);
                }
            });
        },

        isAuthenticated: function () {
            return UserProfile.then(function (userProfile) {
                if (userProfile.$isAuthenticated()) {
                    return Access.OK;
                } else {
                    return $q.reject(Access.UNAUTHORIZED);
                }
            });
        }

    };

    return Access;

}]);