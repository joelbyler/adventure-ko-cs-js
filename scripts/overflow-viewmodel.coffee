class App.ViewModels.Overflow
  userName: ko.observable ""
  isLoggedIn: ko.observable false
 
  loginUser: =>
    @isLoggedIn( @userName != "" )