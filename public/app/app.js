angular.module('bookie', ['bookieRoute', 'authService', 'bookService', 'postService', 'userService'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })

  .controller('GlobalCtrl', ['$window', '$location', 'Auth', function($window, $location, Auth) {
    var vm = this;

    vm.logout = function () {
      Auth.logout();
      $location.path('/');
    };

    vm.isLoggedIn = function () {
      return Auth.isLoggedIn();
    }
  }])

  .controller('UserCtrl', ['$window', '$location', 'User', 'Auth', function($window, $location, User, Auth) {
    var vm = this;

    vm.signup = function (user) {
      User
        .signup(user)
        .then(function (res) {
          console.log(res);
          $location.path('/login');
        }, function (err) {
          console.log(err);
        });
    };

    vm.login = function (user) {
      Auth
        .login(user.username, user.password)
        .then(function (res) {
          console.log(res);
          $location.path('/');
        }, function (err) {
          console.log(err);
        });
    };
  }])

  .controller('BookIndexCtrl', ['Book', function (Book) {
    var vm = this;

    Book
      .getAll()
      .then(function (data) {
        vm.books = data;
      }, function (err) {
        console.log(err);
      });
  }])

  .controller('BookCtrl', ['$location', 'Book', function ($location, Book) {
    var vm = this;

    vm.save = function (book) {
      Book
        .save(book)
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        })
    };
  }])

  .controller('BookPostsCtrl', ['$routeParams', 'Book', function ($routeParams, Book) {
    var vm = this;
    
    Book
      .get($routeParams.book_id)
      .then(function (data) {
        vm.book = data;
      }, function (err) {
        console.log(err);
      });

    Book
      .getPosts($routeParams.book_id)
      .then(function (data) {
        vm.posts = data;
      }, function (err) {
        console.log(err);
      });
  }])

  .controller('PostCtrl', ['Book', 'Post', function (Book, Post) {
    var vm = this;

    Book
      .getAll()
      .then(function (data) {
        vm.books = data;
      }, function (err) {
        console.log(err);
      });

    vm.save = function (post) {
      console.log(post);
      
      Post
        .save(post)
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        })
    };
  }])

  .directive('selectBook', function () {
    return {
      restrict: 'A',
      link: function(scope, element) {
        $(element).dropdown({
          fullTextSearch: true,
          message: {
            noResults: 'No results found: <a href="/books/new">Create a new book?</a>'
          }
        });
      }
    }
  })

  .directive('selectCondition', function () {
    return {
      restrict: 'A',
      link: function(scope, element) {
        $(element).dropdown();
      }
    }
  });
