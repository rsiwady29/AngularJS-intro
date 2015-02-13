angular.module('Services')
	.factory('postService', 
		function($http){

			var baseUrl = 'http://127.0.0.1:8000';
			var postService = {};

			postService.crearPost = function(post){
				return $http.post(baseUrl + '/crearPost', post);
			};

			postService.obtenerPosts = function(){
				return $http.get(baseUrl + '/obtenerPosts');
			};

			postService.obtenerPost = function(id){
				return $http.get(baseUrl + '/obtenerPost/' + id);
			};

			postService.eliminarPost = function(id){
				return $http.delete(baseUrl + '/eliminarPost/' + id);
			};

			postService.actualizarPost = function(id, post){
				return $http.put(baseUrl + '/actualizarPost/' + id, post);
			};

			return postService;
		});