import angular from 'angular';
import appModule from 'config';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import 'css/master.scss';

angular.bootstrap(document, [appModule.name, ngSanitize, ngMaterial]);

/**
 * Created by Charles on 02/04/2016.
 */
