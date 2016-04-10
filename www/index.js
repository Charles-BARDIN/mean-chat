import angular from 'angular';
import appModule from 'config';
import ngSanitize from 'angular-sanitize';
import 'css/master.scss';

angular.bootstrap(document, [appModule.name, ngSanitize]);

/**
 * Created by Charles on 02/04/2016.
 */
