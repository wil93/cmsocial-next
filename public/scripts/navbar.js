'use strict';

var _l10n;
var langlist = [{
  'code': 'en',
  'name': 'English'
}, {
  'code': 'it',
  'name': 'Italiano'
}];

angular.module('cmsocial')
  .directive('navbar', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/views/navbar.html',
      replace: true,
      transclude: true,
      controller: 'NavbarCtrl'
    };
  })
  .controller('NavbarCtrl', function($scope, $location, $state, userManager,
        contestManager, l10n) {
    $('.signin-form input').click(function(e) {
      e.stopPropagation();
    });
    $scope.me = userManager;
    $scope.cm = contestManager;
    $scope.participate = contestManager.participate;
    $scope.rt = function(entry) {
        if (entry.href != null) return entry.href;
        return $state.href(entry.sref, entry.params)
    };

    _l10n = l10n;

    ReactDOM.render(
      React.createElement(LanguageSelector, null, null),
      document.getElementById("langsel")
    );

    // ugly hack because of react limitation
    let x = document.getElementsByTagName("something");
    for (let y of Array.from(x)) {
        while (y.childNodes.length > 0) {
            y.parentNode.appendChild(y.childNodes[0]);
        }
    }
  });


class LanguageSelector extends React.Component {
    setLang(lang) {
        _l10n.setLanguage(lang);
        window.location.reload();
    }

    render() {
        let x = [], kk = 0;
        for (let lang of langlist) {
            // FIXME: put flag icon besides {lang.name}

            x.push(
              React.createElement(
                'li',
                {
                  key: kk,
                  className: lang.code == _l10n.getLanguage() ? 'active' : '',
                },
                React.createElement(
                  'a',
                  {
                    onClick: this.setLang.bind(this, lang.code)
                  },
                  lang.name
                )
              )
            );

            kk += 1;
        }

        return React.createElement('something', null, x);
    }
}
