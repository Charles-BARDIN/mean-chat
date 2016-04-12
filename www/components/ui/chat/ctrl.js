import newMessageSound from 'sounds/chat/new_message.mp3';
import config from 'components/constants';

export default ['$scope', 'MessagesService', 'SocketService', 'UserService',
  ($scope, MessagesService, SocketService, UserService) => {
    const MESSAGE_SIZE_LIMIT = config.MESSAGE_SIZE_LIMIT;
    const USERNAME_SIZE_LIMIT = config.USERNAME_SIZE_LIMIT;

    SocketService.connectToSocket()
      .then(() => {
        $scope.messages = MessagesService.getMessages();
        $scope.usersConnected = UserService.getConnectedUser();
        console.log($scope.usersConnected)
      });

    $scope.maxLength = MESSAGE_SIZE_LIMIT;
    $scope.nameMaxLength = USERNAME_SIZE_LIMIT
    $scope.preview = false;
    $scope.volume = 1;
    $scope.srcSound = newMessageSound;

    $scope.changeVolume = () => {
      $scope.volume++;
      if($scope.volume > 1)
        $scope.volume = -1;

      $scope.$broadcast('volumeChange', $scope.volume);
    };

    $scope.togglePreviewMessage = () => {
      $scope.preview = !$scope.preview;
    }

    $scope.submit = () => {
      if($scope.newMess) {
        if($scope.newMess > MESSAGE_SIZE_LIMIT){
          console.log("Message too long");
          return;
        }

        if($scope.username && $scope.username > USERNAME_SIZE_LIMIT){
          console.log("Username too long")
          return;
        }

        SocketService.sendMessage({username: $scope.username, content: $scope.newMess})
        $scope.newMess = "";
      }
    }
  }
]