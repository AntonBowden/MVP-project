var taskList = angular
  .module("taskList", [])
  .controller("MainCtrl", function($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all tasks and show them
    $http.get("/api/tasks").then(
      function(response) {
        // success callback
        $scope.tasks = response.data;
        console.log('>>>GET, RESPONSE DATA', response.data);
      },
      function(error) {
        // failure call back
        console.log("Error: " + error);
      }
    );

    //sends the text to the node API when submitting the add task form
    $scope.createTask = function() {
      $http.post("/api/tasks", $scope.formData).then(
        function(response) {
          $scope.formData = {}; // clears the form
          $scope.tasks = response.data;
          console.log('>>>CREATE TASK, RESPONSE DATA',response.data);
        },
        function(error) {
          console.log("Error: " + error);
        }
      );
    };

    // cross a task  out after clicking it
    $scope.crossTask = function(id) {
      $http.put("/api/tasks/" + id).then(
        function(response) {
          // success callback
          $scope.tasks = response.data;
          console.log('>>> crossTask: ', response.data);
        },
        function(error) {
          // failure call back
          console.log("crossTask Error: " + error);
        }
      );
    };

    // delete a task after checking it
    $scope.deleteTask = function(id) {
      $http.delete("/api/tasks/" + id).then(
        function(response) {
          // success callback
          $scope.tasks = response.data;
          console.log(response.data);
        },
        function(error) {
          // failure call back
          console.log("Error: " + error);
        }
      );
    };

    $scope.clearCompleted = function() {
      $http.delete("/api/tasks/").then(
        function(response) {
          // success callback
          $scope.tasks = response.data;
          console.log(response.data);
        },
        function(error) {
          // failure call back
          console.log("Error: " + error);
        }
      );

    // $scope.tasks = $scope.tasks.filter(function(el) {
    //   return !el.done;
    // });
    }

  });
