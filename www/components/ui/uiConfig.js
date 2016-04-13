import chatController from './chat/ctrl';

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
        .state('chat', {
            url: '/chat',
            title: 'Chat',
            template: require('./chat/tmpl.html'),
            controller: chatController
        })

    $locationProvider.html5Mode(true); // Remove # from url

    $urlRouterProvider.otherwise('chat');
}];