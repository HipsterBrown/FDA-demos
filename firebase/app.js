 $( document ).ready(function() {
  'use stict';

  //New user interaction
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
      $('button.logout').toggleClass('hide');
      return currentUser;
    }
  });

  //Check for loggedIn user and show appropriate form
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

  // Check for new tips and add them to the list
  tips.on('child_added', function(tip) {
    console.log(tip.name());
    tip = tip.val();
    var html = '<article class="tip">',
        contentArea = $('section.tips');
    html += '<h1 class="title">'+ tip.title +'</h1>';
    html += '<p class="smaller submitted">Submitted On: <span class="date">'+ tip.submittedOn +'</span></p>';
    html += '<p class="content">'+ tip.content +'</p>';
    html += '<p class="thanks">Thank You <span class="author">'+ tip.author +'</span> for the helpful tip!';
    //console.log(html);

    $(html).insertAfter('section.tips > h2');
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

  // Function to add a tip to the firebase database
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
    var email = $('#signup-email').val(),
        password = $('#signup-pass').val(),
        form = $('section.signup-form');

    console.log(email + ' ' + password);

    auth.createUser(email, password, function(error, user) {
      if (!error) {
		var currentUser = {
			  email: user.email,
			  id: user.id,
			  username: user.email.split('@', 1),
			  loggedIn: true
		  };
        //form.toggleClass('hide');
		alert('The page will now refresh. Then you can log in and start adding tips.\n I promise to make the process smoother in the future.\n Thank you for your patience.');
		document.location.reload();
        //$('section.tip-form').toggleClass('hide');
      } else {
		alert('Sorry, this seems to have been an error:\n ' + error + '\n Please refresh the page and try again.');
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
      debug: true,
      rememberMe: true
    });

    form.toggleClass('hide');

  });

  $('a.forget-pass').on('click', function(e) {
    e.preventDefault();

    var email = $('#email').val(),
      resultDiv = $('span#result');

    if ( email === '' ) {
      resultDiv.text('Please enter your email into the form');
      return false;
    }

    auth.sendPasswordResetEmail(email, function(error, success) {
      if ( error ) {
        resultDiv.text(error);
      } else {
        resultDiv.text('Email sent!');
      }
    });

  });

  $('a.change-pass').on('click.change', function(e) {
    e.preventDefault();

    $('section.pass-form').toggleClass('hide');

    $(this).off('click.change');
  });

  $('section.pass-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();

    var tempPass = $('section.pass-form').find('#temp-pass').val(),
      newPass = $('section.pass-form').find('#new-pass').val(),
      email = $('section.pass-form').find('#user-email').val(),
      resultsDiv = $('section.pass-form').find('#pass-results'),
      form = $('section.pass-form');

    auth.changePassword(email, tempPass, newPass, function(error, success) {
      if (!error) {
        form.toggleClass('hide');
        alert('Password successfully changed! Try logging in.');
      } else {
        resultsDiv.text(error + ' Please try again.');
      }
    });
  });

  $('section.tip-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();
    var title = $('#tip-title').val(),
        content = $('#tip-content').val(),
        form = $('section.tip-form'),
		author;

	if (currentUser === 'undefined') {
		author = 'Anon';
	} else {
		author = currentUser.username;
	}

    console.log(title + ' ' + content);

    pushTip(title, content, author);
  });

  // Simple logout
  $('footer').on('click', 'button.logout', function(e) {
    auth.logout();
    document.location.reload();
  });


});
