import angular from 'angular';
import uiRouter from 'angular-ui-router';

// User interface
import uiConfig from 'components/ui/uiConfig';

// Directives
import chatSound from 'components/directives/chatSound';
import messTable from 'components/directives/messTable';

// Services
import TitleService from 'components/services/TitleService';
import SocketService from 'components/services/SocketService';
import MessagesService from 'components/services/MessagesService';
import UserService from 'components/services/UserService';
import WindowService from 'components/services/WindowService';
import MessageEventService from 'components/services/MessageEventService';

// Filters
import messagePreview from 'components/filters/messagePreview';
import smiley from 'components/filters/smiley';


// Building app
const app = angular.module('app', [uiRouter]);

// User interface
app.config(uiConfig);

// Directives
app.directive('chatSound', chatSound);
app.directive('messTable', messTable);

// Services
app.factory('TitleService', TitleService);
app.factory('SocketService', SocketService);
app.factory('MessagesService', MessagesService);
app.factory('UserService', UserService);
app.factory('WindowService', WindowService);
app.factory('MessageEventService', MessageEventService);

// Filters
app.filter('messagePreview', messagePreview);
app.filter('smiley', smiley);

export default app;

/**
 * Created by Charles on 02/04/2016.
 */
