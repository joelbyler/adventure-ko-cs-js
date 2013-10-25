var uuid = require('node-uuid');
var connect = require('connect');
var _ = require('underscore');

var app = connect()
  .use(connect.static(__dirname + "/public"))
  .listen(3000);

var io = require('socket.io').listen(app);

var questions = [];

io.sockets.on('connection', function(socket) {
  console.log('client connected');

  socket.on('readQuestions', function(err, callback) { 
    callback(null,JSON.stringify(questions));
    console.log('readQuestions server side');
  });

  socket.on('addQuestion', function(questionJsonData,callback) {
    questionData = JSON.parse(questionJsonData);
    questionData.id = uuid.v1();
    questions.push(questionData);

    updatedQuestionJsonData = JSON.stringify(questionData);
    callback(updatedQuestionJsonData);
    socket.broadcast.emit('newQuestion', updatedQuestionJsonData );
  }); 
 
  socket.on('addVote', function(voteData) {
    updatedQuestion = _(questions).find( function(question) {
      return question.id === voteData.questionId;
    });
    updatedQuestion.votes.push(voteData.vote);
  });
  
  socket.on('removeVote', function(voteData) {
    updatedQuestion = _(questions).find( function(question) {
      return question.id === voteData.questionId;
    });
    newVotes = _(udpatedQuestion.votes).reject( function(vote) {
      return vote.voter === voteData.vote.voter &&
        vote.value === voteData.vote.value;
    });
    updatedQuestion.votes = newVotes;
  });

});
