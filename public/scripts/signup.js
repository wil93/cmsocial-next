'use strict';

/* Signup page */

angular.module('cmsocial')
  .controller('SignupCtrl', function($scope, $http, $state, md5,
    notificationHub, userManager, contestManager, API_PREFIX) {
    $scope.cm = contestManager;

    contestManager.getContestPromise().then(function(response) {
        if (!contestManager.getContest().captcha_enabled) return;

        // FIXME: why is this onloadCallback needed??
        //        see https://github.com/appleboy/react-recaptcha/issues/181
        ReactDOM.render(
            React.createElement(
              ReactRecaptcha,
              {
                sitekey: contestManager.getContest().recaptcha_public_key,
                render: "explicit",
                onloadCallback: console.log.bind(this, "recaptcha loaded"),
              },
              null
            ),
            document.getElementById('recaptcha-div')
        );
    });

    $(".avatar")
      .load(function() {
        $(".avatar-loader").hide();
      })
      .error(function() {
        console.log("Errore nel caricamento dell'immagine");
      });
    $("#email1").blur(function() {
      var newSrc = 'http://gravatar.com/avatar/' + md5.createHash(this.value).toString() + '?d=identicon&s=200';
      var avatar = $(".avatar");
      if (avatar.attr('src') != newSrc) {
        $(".avatar-loader").show();
        avatar.attr('src', newSrc);
      }
    });
    $scope.isBad = {
      'username': true,
      'email': true,
      'password': true,
      'password2': true,
      'email2': true,
      'region': true,
      'province': true,
      'city': true,
    };
    $scope.user = {
      'username': '',
      'email': '',
      'email2': '',
      'password': '',
      'password2': '',
    };
    $scope.errorMsg = {
      'password': 'Password\'s too short',
      'password2': 'Passwords don\'t match',
      'email2': 'E-mails don\'t match',
      'region': 'You must specify a region',
      'province': 'You must specify a province',
      'city': 'You must specify a city',
    };
    $http.post(API_PREFIX + 'location', {
        'action': 'listregions'
      }).success(function(data, status, headers, config) {
        $scope.regions = data.regions;
      })
      .error(function(data, status, headers, config) {
        notificationHub.serverError(status);
      });
    $scope.submit = function() {
      $scope.checkUsername();
      $scope.checkEmail();
      $scope.checkPassword();
      if ($scope.isBad['username']) {
        $scope.signupform.username.$dirty = true;
        $("#username1").focus();
        return;
      } else if ($scope.isBad['password']) {
        $scope.signupform.password.$dirty = true;
        $("#password1").focus();
        return;
      } else if ($scope.isBad['password2']) {
        $scope.signupform.password2.$dirty = true;
        $("#password2").focus();
        return;
      } else if ($scope.isBad['email']) {
        $scope.signupform.email.$dirty = true;
        $("#email1").focus();
        return;
      } else if ($scope.isBad['email2']) {
        $scope.signupform.email2.$dirty = true;
        $("#email2").focus();
        return;
      }

      var data = $scope.user;
      if (contestManager.getContest().captcha_enabled) {
          // FIXME: the following doesn't work because if you switch multiple times
          //        between, e.g., "Signup" and "Ranking", many recaptchas will be
          //        rendered, and in the end the correct ID will be something like
          //        "g-recaptcha-response-4" or similar, so we just look by classname
          //data['recaptcha_response'] = document.getElementById("g-recaptcha-response").value
          data['recaptcha_response'] = document.querySelectorAll("textarea.g-recaptcha-response")[0].value;
      }

      data['action'] = 'new';
      $http.post(API_PREFIX + 'user', data)
        .success(function(data, status, headers, config) {
          if (data.success === 1) {
            notificationHub.createAlert('success', 'Complimenti, ' +
              'la registrazione è andata a buon fine, adesso puoi accedere con le credenziali ' +
              'del tuo nuovo account usando il modulo in alto a destra. Una volta entrato ' +
              'nel sistema avrai la possibilità di sottoporre le soluzioni ai task presenti ' +
              'in questa pagina. Buon allenamento.', 10);
            $state.go('overview');
            userManager.refresh();
          } else {
            notificationHub.createAlert('danger', data.error, 3);
          }
        })
        .error(function(data, status, headers, config) {
          notificationHub.serverError(status);
        });
    };
    $scope.askServer = function(type, value) {
      $http.post(API_PREFIX + 'check', {
          'type': type,
          'value': value
        })
        .success(function(data, status, headers, config) {
          $scope.isBad[type] = (data.success == 0);
          $scope.errorMsg[type] = data.error;
        })
        .error(function(data, status, headers, config) {
          notificationHub.serverError(status);
        });
    };
    $scope.checkUsername = function() {
      $scope.askServer('username', $scope.user.username);
    };
    $scope.checkEmail = function() {
      $scope.askServer('email', $scope.user.email);
    };
    $scope.checkPassword = function() {
      $scope.isBad['password'] = ($scope.user.password.length < 5);
    };
    $scope.matchPassword = function() {
      $scope.isBad['password2'] = ($scope.user.password !== $scope.user.password2);
    };
    $scope.matchEmail = function() {
      $scope.isBad['email2'] = ($scope.user.email !== $scope.user.email2);
    };
  });
