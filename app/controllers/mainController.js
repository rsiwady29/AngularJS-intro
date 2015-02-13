angular.module('Controllers')
	.controller('MainController', 
		function($scope, $location, postService){
			$scope.posts = [];

			var recargar = function(){
				postService.obtenerPosts()
					.success(function(posts){
						$scope.posts = posts;
					})
					.error(function(){
						alert('error');
					});
			};

			$scope.delete = function(id){
				postService.eliminarPost(id)
					.success(function(){
						recargar();
					})
					.error(function(){						
						alert('error');
					});
			};
			
			$scope.update = function(id){
				$location.path('/actualizarPost/' + id);
			};

			recargar();

		});