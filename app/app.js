var app = angular.module('taller', ['ngRoute', 'Controllers', 'Services']);

angular.module('Controllers', []);
angular.module('Services', []);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'MainController',
			templateUrl: 'app/views/main.html'
		})
		.when('/crearPost', {
			controller: 'CrearPostController',
			templateUrl: 'app/views/crearPost.html'
		})
		// Por motivos de ejemplo usare 2 rutas. Se podria utilizar una sola ruta
		.when('/actualizarPost/:id', {
			controller: 'ActualizarPostController',
			templateUrl: 'app/views/actualizarPost.html'
		});
});

