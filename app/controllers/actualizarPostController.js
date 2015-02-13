angular.module('Controllers')
	.controller('ActualizarPostController', 
		function($scope, $location, $routeParams, postService){
			$scope.id = $routeParams.id;
			$scope.post = {};

			var init = function(){
				postService.obtenerPost($scope.id)
					.success(function(post){
						$scope.post = post;
					})
					.error(function(){
						alert('error');
					});
			};

			$scope.actualizarPost = function(){
				postService.actualizarPost($scope.id, $scope.post)
					.success(function(post){
						$location.path('/');
					})
					.error(function(){
						alert('error');
					});
			};

			init();
		});