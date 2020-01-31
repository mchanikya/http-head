(function(){
	'use strict';

	angular.module("httpGetApp",[])
	.controller("httpGetController",httpGetController)
	.constant('ApiBasePath', "http://10.20.121.73:8000/restaurantMenu/");

	httpGetController.$inject=['$http','ApiBasePath'];
	function httpGetController($http,ApiBasePath){
		var $ctrl=this;

		$ctrl.htmlResult="None";
		$ctrl.jsonResult="None";

		$ctrl.fetchDetails=function(type){
			if (type=='html') {
				type='';
			}else{
				type=type+"/";
			}

			var response=$http({
				method:"GET",
				url:(ApiBasePath+type)
			});

		response.then(function(data){
			console.log("Response: ",data);
			if (type=="") {
				$ctrl.htmlResult=data.data;
			}else{
				$ctrl.jsonResult=data.data;
			}
		})
		.catch(function(error){
			console.log("Failed to fetch details",error);
		});

		};
	}

})();