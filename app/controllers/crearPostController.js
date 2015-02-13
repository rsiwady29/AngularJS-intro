angular.module('Controllers')
	.controller('CrearPostController', function($scope, $location, postService)	{

		$scope.crearPost = function(){
			postService.crearPost($scope.post);
			$location.path('/');
		};	

	});