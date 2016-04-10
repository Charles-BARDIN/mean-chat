import angular from 'angular';
import uiRouter from 'angular-ui-router';

// Ui config
import uiConfig from 'components/ui/uiConfig';

// Directives
import chatSound from 'components/directives/chatSound';
import messTable from 'components/directives/messTable';

// Services
import TitleService from 'components/services/TitleService';
import SocketService from 'components/services/SocketService';
import MessagesService from 'components/services/MessagesService';

// Filters
import messagePreview from 'components/filters/messagePreview';

const app = angular.module('app', [uiRouter]);

app.config(uiConfig);

// Directives
app.directive('chatSound', chatSound);
app.directive('messTable', messTable);

// Services
app.factory('TitleService', TitleService);
app.factory('SocketService', SocketService);
app.factory('MessagesService', MessagesService);

// Filters
app.filter('messagePreview', messagePreview);

export default app;

/**
 * Created by Charles on 02/04/2016.
 */
