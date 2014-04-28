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

  //Initialize Firebase connection
  var base = new Firebase('https://brilliant-fire-3777.firebaseio.com');

  //Initialize Firebase Simple Login connection
  var auth = new FirebaseSimpleLogin(base, function(error, user) {

  });

  //Create tip list === firebaseio.com/tips
  var tips = base.child('tips');

  /*
    Tip Model
    title: String
    content: String
    author: String
    submittedOn: DateToString
  */

  tips.on('child_added', function(tip) {
    console.log(tip.name());
    tip = tip.val();
    var html = '<article class="tip">',
        contentArea = $('section.tips');
    html += '<h1 class="title">'+ tip.title +'</h1>';
    html += '<p class="smaller submitted">Submitted On: <span class="date">'+ tip.submittedOn +'</span></p>';
    html += '<p class="content">'+ tip.content +'</p>';
    html += '<p class="thanks">Thank You <span class="author">'+ tip.author +'</span> for the helpful tip!';
    console.log(html);
    contentArea.append(html);
  });

  /*
  tips.push({
    title: 'Another title for winners',
    content: 'How much lorem ipsum text can you stand?',
    author: 'HipsterBrown',
    submittedOn: new Date().toString()
  }, function(error) {
    if (error) {
      console.log('New tip could not be added, please try again.');
    } else {
      console.log('New tip added!');
    }
  });
  */
});
