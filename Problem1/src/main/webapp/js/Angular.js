var app = angular.module('PersonalControl', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/home", {
                templateUrl: "view/home.html",
                controller: "HomeController"
            })
            .when("/info/:index", {
                templateUrl: "view/details.html",
                controller: "HomeController"
            })
            .when("/newperson", {
                templateUrl: "view/newperson.html",
                controller: "NewPersonController"
            })
            .otherwise({
                redirectTo: "/home"
            });
});
app.factory("detailList", function () {
    var persons = [
        {id: 1, name: "Jens", age: 18}
        , {id: 2, name: "Peter", age: 23}
        , {id: 3, name: "Hanne", age: 23}
    ];
    return {
        getAll: function () {
            return persons;
        },
        addPerson: function (person) {
            persons.push(person);
        },
        getTotal: function () {
            return persons.length;
        }
    };
});
app.controller("HomeController", function ($scope, $routeParams, detailList) {
    $scope.persons = detailList.getAll();
    if (angular.isDefined($routeParams.index)) {
        var i = $routeParams.index;
        $scope.person = $scope.persons[i];
    }

});
app.controller("NewPersonController", function ($scope, detailList) {
    $scope.addperson = function (name, age) {
        try {
            
            var person = {};
            person = {id: detailList.getTotal()+1, name: name, age: age};
            detailList.addPerson(person);
            console.log(detailList.getAll());
        } catch (ex) {
            console.log("failed");
        }


    }





});