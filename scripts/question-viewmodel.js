// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.ViewModels.Question = (function() {
    function Question(questionData) {
      this.addVote = __bind(this.addVote, this);
      var _this = this;
      this.content = questionData.content;
      this.author = questionData.author;
      this.votes = ko.observableArray(questionData.votes || []);
      this.voteTally = ko.computed(function() {
        return _this.votes().reduce(_this.addVoteToTally, 0);
      });
    }

    Question.prototype.addVote = function(voter, voteType) {
      var voteValue;
      voteValue = voteType === 'up' ? 1 : -1;
      return this.votes.push({
        value: voteValue,
        voter: voter
      });
    };

    Question.prototype.addVoteToTally = function(tally, vote) {
      return tally + vote.value;
    };

    return Question;

  })();

}).call(this);