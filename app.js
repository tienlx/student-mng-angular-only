(function() {
  'use strict';
  var app = angular.module('users_management', ['ngRoute']);
  var ListStudentController = function($scope, $http, students) {
    $scope.students = students.getStudents();
    $scope.student_info = {};
    $scope.order_options = [
      {name: "Name - Ascending", value:"+name"},
      {name: "Name - Descending", value:"-name"},
      {name: "Age - Ascending", value:"+age"},
      {name: "Age - Descending", value:"-age"}
    ];

    $scope.addStudent = function() {
      var student = {
        name: $scope.student_info.name,
        age: $scope.student_info.age,
        gender: $scope.student_info.gender,
        address: $scope.student_info.address,
        country: $scope.student_info.country,
      };
      students.addStudent(student);
      $scope.students = students.getStudents();
      $scope.student_info = {}; // reset student_info
    };
  };
  
  var EditStudentController = function($scope, $http, $routeParams, $location, students) {
    var
      student_index = $routeParams.student_index,
      student = students.findStudent(student_index);
    $scope.student_info = student;
    $scope.editStudent = function() {
      var student = {
        name: $scope.student_info.name,
        age: $scope.student_info.age,
        gender: $scope.student_info.gender,
        address: $scope.student_info.address,
        country: $scope.student_info.country,
      };
      students.editStudent(student_index, student);
      $scope.student_info = {}; // reset student_info
      $location.path('/');
    };

  };
  
  var DeleteStudentController = function($scope, $http, $routeParams, $location, students) {
    var
      student_index = $routeParams.student_index,
      student = students.findStudent(student_index);
    $scope.student_info = student;
    $scope.deleteStudent = function() {
      students.deleteStudent(student_index);
      $location.path('/');
    };
  };

  var StudentsService = function() {
    var students = [{
      name: 'Tien Le',
      age: 10,
      gender: 'Male',
      address: 'Thuy Khue, Tay Ho, Ha Noi',
      country: 'Viet Nam',
    }, {
      name: 'Hieu Hoang',
      age: 9,
      gender: 'Male',
      address: 'Thuy Khue, Tay Ho, Ha Noi',
      country: 'Viet Nam',
    }, {
      name: 'Quang Cong',
      age: 20,
      gender: 'Male',
      address: 'Thuy Khue, Tay Ho, Ha Noi',
      country: 'Viet Nam',
    }];
    return {
      getStudents: function() {
        return students;
      },
      findStudent: function(student_index) {
        var student = students[student_index];
        return student;
      },
      addStudent: function(student) {
        students.push(student);
        return;
      },
      editStudent: function(student_index, student) {
        students.splice(student_index, 1, student);
        return;
      },
      deleteStudent: function(student_index) {
        students.splice(student_index, 1);
        return;
      }
    };
  };
  
  var StudentsRoute = function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: ListStudentController,
        templateUrl: 'list_student.html'
      })
      .when('/edit/:student_index', {
        controller: EditStudentController,
        templateUrl: 'edit_student.html'
      })
      .when('/delete/:student_index', {
        controller: DeleteStudentController,
        templateUrl: 'delete_student.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  };
  
  app.config(StudentsRoute);
  app.service('students', StudentsService);
  app.controller('ListStudentController', ['$scope', '$http', 'students', ListStudentController]);
  app.controller('EditStudentController', ['$scope', '$http', '$routeParams', '$location', 'students', EditStudentController]);
  app.controller('DeleteStudentController', ['$scope', '$http', '$routeParams', '$location', 'students', DeleteStudentController]);
}());