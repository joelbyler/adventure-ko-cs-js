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
    @questions.push questionViewModel
    @newQuestionText ""
