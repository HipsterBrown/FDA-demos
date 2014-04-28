$( document ).ready(function() {
  'use stict';

  $('section.login-form').on('click', 'button.signup', function(e) {
    var signup = $('section.signup-form');
    var parent = $(this).parents('section');
    parent.toggleClass('hide');
    signup.toggleClass('hide');
  });

  //Initialize Firebase connection
  var base = new Firebase('https://brilliant-fire-3777.firebaseio.com');

  var currentUser;

  //Initialize Firebase Simple Login connection
  var auth = new FirebaseSimpleLogin(base, function(error, user) {
    if (error) {
      alert(error);
      return;
    }
    if (user) {
      //alert(user.email);
      currentUser = {
        email: user.email,
        id: user.id,
        username: user.email.split('@', 1),
        loggedIn: true
      };
      $('section.tip-form').toggleClass('hide');
      return currentUser;
    }
  });

  $('body').on('click', 'button.add-tip', function(e) {
    var login = $('section.login-form');
    if ( currentUser ) {
      $('section.tip-form').toggleClass('hide');
    } else {
      login.toggleClass('hide');
    }
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

  var pushTip = function(tipTitle, tipContent, tipAuthor) {
    tips.push({
      title: tipTitle,
      content: tipContent,
      author: tipAuthor,
      submittedOn: new Date().toString()
    }, function(error) {
      if (error) {
        alert('Sorry about that Trooper! Please try submitting again.');
      } else {
        $('section.tip-form').toggleClass('hide');
      }
    });
  };

  //Login flow

  $('section.signup-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();
    var username = $('#signup-name').val(),
        email = $('#signup-email').val(),
        password = $('#signup-pass').val(),
        form = $('section.signup-form');

    console.log(username + ' ' + email + ' ' + password);

    auth.createUser(email, password, function(error, user) {
      if (!error) {
        form.toggleClass('hide');
        $('section.tip-form').toggleClass('hide');
      }
    });

  });


  $('section.login-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();
    var email = $('#email').val(),
        password = $('#password').val(),
        form = $('section.login-form');

    auth.login('password', {
      email: email,
      password: password,
      debug: true
    });

    form.toggleClass('hide');

  });

  $('section.tip-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();
    var title = $('#tip-title').val(),
        content = $('#tip-content').val(),
        form = $('section.tip-form');

    console.log(title + ' ' + content);

    pushTip(title, content, currentUser.username);
  });

  $('footer').on('click', 'button.logout', function(e) {
    auth.logout();
    document.location.reload();
  });


});
