$( document ).ready(function() {
  'use stict';

  $('body').on('click', 'button.add-tip', function(e) {
    var login = $('section.login-form');

    login.toggleClass('hide');
  });

  $('section.login-form').on('click', 'button.signup', function(e) {
    var signup = $('section.signup-form');
    var parent = $(this).parents('section');
    parent.toggleClass('hide');
    signup.toggleClass('hide');
  });

  var base = new Firebase('https://brilliant-fire-3777.firebaseio.com');
  var auth = new FirebaseSimpleLogin(base, function(error, user) {
    
  });

  var tips = base.child('tips');

  var tip1 = tips.child('tip');

  tip1.set({
    title: 'Title for Winners',
    content: 'Some sample content for winners to read and troopers to enjoy!',
    author: 'HipsterBrown',
    submittedOn: new Date().toString()
  }, function(error) {
    if (error) {
      console.log('Tip could not go through because: ' + error);
    } else {
      console.log('Tipped to the max!');
    }
  });

  tip1.on('value', function(tip) {
    if (tip.val() === null) {
      alert('This tip does not exist!');
    } else {
      var title = $('article.tip > h1.title'),
          date = $('article.tip > p > span.date'),
          content = $('article.tip > p.content'),
          author = $('article.tip > p.thanks > span.author');

      title.text(tip.val().title);
      date.text(tip.val().submittedOn);
      content.text(tip.val().content);
      author.text(tip.val().author);
    }
  });

});
