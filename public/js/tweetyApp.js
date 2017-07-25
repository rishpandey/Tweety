var app = angular.module("tweetyApp", ['ngRoute', 'ngResource']).run(function ($rootScope) {
    $rootScope.authenticated = false;
    $rootScope.current_user = '';

    $rootScope.signout = function () {
        $http.get('/auth/signout');
        $rootScope.authenticated = false;
        $rootScope.current_user = '';
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'main.html', controller: 'mainController' })
        .when('/login', { templateUrl: 'login.html', controller: 'authController' })
        .when('/register', { templateUrl: 'register.html', controller: 'authController' });
});


app.factory('postService', function ($resource) {
    return $resource('/api/posts/:id');
});

app.controller("mainController", function ($scope, postService, $rootScope) {
    $scope.posts = postService.query();
    $scope.newPost = { createdBy: '', text: '', createdAt: '' };

    $scope.post = function () {
        $scope.newPost.created_by = $rootScope.current_user;
        $scope.newPost.created_at = Date.now();
        postService.save($scope.newPost, function () {
            $scope.posts.push($scope.newPost);
            $scope.newPost = { createdBy: '', text: '', createdAt: '' };
        });
    };
});


app.controller("authController", function ($scope, $http, $rootScope, $location) {
    $scope.user = { username: '', password: '' };
    $scope.errorMsg = "";

    $scope.login = function () {
        $http.post('/auth/login', $scope.user).success(function (data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else {
                $scope.errorMsg = data.message;
            }
        });
    };
    $scope.register = function () {
        // changed from signup
        $http.post('/auth/signup', $scope.user).success(function (data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            } else {
                $scope.errorMsg = data.message;
            }
        });
    };
});