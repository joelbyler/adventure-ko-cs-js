class App.ViewModels.Overflow
  userName: ko.observable ""
  isLoggedIn: ko.observable false
  newQuestionText: ko.observable ""
  questions: ko.observableArray []

  loginUser: =>
    @isLoggedIn( @userName != "" )

  addQuestion: =>
    questionData =
      content: @newQuestionText()
      author: @userName()
    questionViewModel = new App.ViewModels.Question(questionData)
    App.socket.emit 'addQuestion', ko.toJSON(questionViewModel), (updatedQuestionJson) ->
      updatedQuestionViewModel = JSON.parse updatedQuestionJson
      questionViewModel.id = updatedQuestionViewModel.id
    @questions.push questionViewModel
    @newQuestionText ""