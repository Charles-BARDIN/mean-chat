import angular from 'angular';
import appModule from 'config';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import ngMessage from 'angular-messages';
import 'css/master.scss';

angular.bootstrap(document, [appModule.name, ngSanitize, ngMaterial, ngMdIcons, ngMessage]);

/**
 * Created by Charles on 02/04/2016.
 */
