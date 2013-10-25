$ ->
  App.socket = io.connect()
  window.overflowViewModel = new App.ViewModels.Overflow()
  ko.applyBindings overflowViewModel

  App.socket.emit 'readQuestions', null, (err,questionsJsonData) ->
    questionsData = JSON.parse(questionsJsonData)
    _(questionsData).each (questionData) ->
      questionViewModel = new App.ViewModels.Question(questionData)
      overflowViewModel.questions.push questionViewModel

  App.socket.on 'newQuestion', (questionJsonData) ->
    questionData = JSON.parse questionJsonData
    questionViewModel = new App.ViewModels.Question(questionData)
    overflowViewModel.questions.push questionViewModel