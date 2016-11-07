angular.module('taroApp').factory("UserProfile", ["Auth", function (Auth) {

    var userProfile = {};

    var fetchUserProfile = function () {

        return Auth.getProfile().then(function (response) {

            for (var prop in userProfile) {
                if (userProfile.hasOwnProperty(prop)) {
                    delete userProfile[prop];
                }
            }

            return angular.extend(userProfile, response.data, {

                $refresh: fetchUserProfile,

                $isAnonymous: function () {
                    return userProfile.anonymous;
                },

                $isAuthenticated: function () {
                    return !userProfile.anonymous;
                }

            });

        });
    };

    return fetchUserProfile();

}]);