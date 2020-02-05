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
		$ctrl.accountStatus="";

		$ctrl.createAccount = function(name,email,password){
			var response=$http({
				method:'POST',
				url:("http://10.20.121.73:8000/login/"),
				data: {'name':name,"email":email,"password":password}
			});
			response.then(function(data){
				console.log("Response: ",data);
				$ctrl.accountStatus=data.data;
			})
			.catch(function(error){
				console.log("Failed to fetch details",error);	
			});
		};

		$ctrl.sendDetails=function (type) {
			var companies = [
							{ 'name':'Infosys Technologies',
								'employees': 125000,
								'headoffice': 'Bangalore'},
							{ 'name':'Cognizant Technologies',
								'employees': 100000,
								'headoffice': 'Bangalore'},
							{ 'name':'Wipro',
								'employees': 115000,
								'headoffice': 'Bangalore'},
							{ 'name':'Tata Consultancy Services (TCS)',
								'employees': 150000,
								'headoffice': 'Bangalore'},
	                    ];
			var response=$http({
				method:type,
				url:(ApiBasePath),
				data: companies
			});
			response.then(function(data){
				console.log("Response: ",data);
				if (type=='PUT') {
					$ctrl.PutStatus=data.data
				}else if (type=='POST') {
					$ctrl.PostStatus=data.data;
				}
			})
			.catch(function(error){
				console.log("Failed to fetch details",error);	
			});

		}
		$ctrl.fetchDetails=function(type){
			if (type=='html') {
				type='';
			}else{
				type=type+"/";
			}

			var response=$http({
				// method:"HEAD",
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
							if (type=="") {
					$ctrl.htmlResult=error.data;
				}else{
					$ctrl.jsonResult=error.data;
				}	
			});

		};
	}

})();