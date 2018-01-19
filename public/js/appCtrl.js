var todosApp=angular.module('todosApp',[]);

todosApp.controller('appCtrl',['$scope','$http',function(_scope,_http){

	//READ
 _scope.gettaskrecords=function(){
                    //console.log("GET");

                 	_http({
                	method:'GET',
                	url:'/getTask',
                	
                }).then(function(response) {
                    
                    
                    _scope.taskrecords=response.data;
                    
                  }, function(err) {
                    console.log(err);
                    
                  });

}

_scope.gettaskrecords();

//add
_scope.addTask=function(){
	          // console.log("add");

                    var taskData={
                    task_text:_scope.new_task,
                    status:false
                    }


                    _http({
                    	method:'POST',
                    	url:'/addTask',
                    	data:taskData
                    }).then(function(response) {

                        
                        _scope.gettaskrecords();
                        
                      }, function(err) {
                        console.log(err);

                      });
  

            }
//delete
_scope.deleteTask = function(_obj) {
                     

                    _http({
                    method:'DELETE',
                    url:'/deleteTask?id='+_obj,
                    
                }).then(function(response) {
                    
                    _scope.gettaskrecords();
                    
                  }, function(err) {
                    console.log(err);
                    
                  });

            }

            //update status
_scope.update_status=function(id,status){



      var updateData={
                 id:id,
                 status:status
                    }


        _http({
              method:'POST',
             url:'/updateTask',
            data:updateData
            }).then(function(response) {
                 _scope.gettaskrecords();
                        }, function(err) {
                        console.log(err);

                      });
                }



}]);