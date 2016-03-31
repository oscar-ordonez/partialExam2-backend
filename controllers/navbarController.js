angular.module('AngularScaffold.Controllers')
  .controller('NavbarController', ['AuthService', '$scope', '$rootScope', '$sessionStorage','$state',  function (authService, $scope, $rootScope, $sessionStorage, $state) {
      $scope.user = {};
      $scope.$sessionStorage = $sessionStorage;
      $scope.srctodb = "";

      function imageTo64(){
        var filesSelected = document.getElementById("imgup").files;//imgup id del input
        if (filesSelected.length>0) {
          var fileToLoad = filesSelected[0];
          if (fileToLoad.size > 11000) {
            swal({title: "Archivo muy grande!", type: "warning", showCancelButton: false});
          }else{
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent){
            var srcData = fileLoadedEvent.target.result;//<- data:base64
            var newImage = document.createElement('img');
            newImage.src = srcData;
            document.getElementById("propic").innerHTML = newImage.outerHTML;//div propic donde enseña la imagen
            $scope.srctodb = $('#propic img').attr('src');
            console.log($scope.srctodb);
          }
            fileReader.readAsDataURL(fileToLoad);
          }
        }
      }

      document.getElementById('imgup').addEventListener('change',imageTo64, false);

      $scope.logout = function(){
        authService.Logout().then(function(response){
          swal({title: "Cerró sesion exitosamente!", type: "success", timer:1500, showCancelButton: false, showConfirmButton: false});
          $sessionStorage.$reset();
        }).catch(function(err){
          swal({title: err.data.error + " " + err.data.message, type: "error", showCancelButton: false});
        })
        $state.go('home');
      };

      $scope.login = function(user){
        authService.Login(user).then(function(response){
          $sessionStorage.currentUser = response.data;
          $scope.user = {};
        }).catch(function(err){
          swal({title: err.data.error + " " + err.data.message, type: "error", showCancelButton: false});
        });
      };

      $scope.register = function(){
        if ($scope.user.password != $scope.user.re_password) {
          swal({title: "Contraseñas no coinciden!", type: "warning", showCancelButton: false});
        }else{
          var user = {foto: $scope.srctodb, username: $scope.user.username, password:  $scope.user.password, email: $scope.user.email, name: $scope.user.name, phone: $scope.user.phone,  scope: ['regularUser']};
          authService.Register(user).then(function(response){
            swal({title: "Usuario registrado exitosamente!", type: "success", timer:1500, showCancelButton: false, showConfirmButton: false});
            $scope.login({username: user.username, password: user.password});
          }).catch(function(err){
            console.log(err);
            swal({title: err.data.error + " " + err.data.message, type: "error", showCancelButton: false});
          })
        }
      };

      $scope.goCliente = function(){
        $state.go('Cliente');
      };

      $scope.goHome = function(){
        $state.go('home');
      };

  }]);
