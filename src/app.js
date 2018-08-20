import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'bulma';

import Router from './config/routes';

import CarSharesIndexCtrl from './controllers/carShares/index';
import CarSharesShowCtrl from './controllers/carShares/show';
import CarSharesNewCtrl from './controllers/carShares/new';
import CarSharesEditCtrl from './controllers/carShares/edit';
import FestivalsIndexCtrl from './controllers/festivals/index';
import FestivalsShowCtrl from './controllers/festivals/show';
import FestivalsNewCtrl from './controllers/festivals/new';
import FestivalsEditCtrl from './controllers/festivals/edit';
import UsersShowCtrl from './controllers/users/show';
import UsersEditCtrl from './controllers/users/edit';
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';
import AuthRegisterOrgCtrl from './controllers/auth/register-organiser';

angular.module('Festival Companion App', [
  'ui.router', 'satellizer'
])
  .controller('CarSharesIndexCtrl', CarSharesIndexCtrl)
  .controller('CarSharesShowCtrl', CarSharesShowCtrl)
  .controller('CarSharesNewCtrl', CarSharesNewCtrl)
  .controller('CarSharesEditCtrl', CarSharesEditCtrl)
  .controller('FestivalsIndexCtrl', FestivalsIndexCtrl)
  .controller('FestivalsShowCtrl', FestivalsShowCtrl)
  .controller('FestivalsNewCtrl', FestivalsNewCtrl)
  .controller('FestivalsEditCtrl', FestivalsEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('AuthRegisterOrgCtrl', AuthRegisterOrgCtrl)
  .config(Router)
  .config(function($authProvider){
    $authProvider.loginUrl = '/api/login';
    $authProvider.registerUrl = '/api/register';
    $authProvider.registerOrgUrl = '/api/registerorg';
  });
