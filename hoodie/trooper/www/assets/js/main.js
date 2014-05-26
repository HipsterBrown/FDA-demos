/*
// handle creating a new task
$('#todoinput').on('keypress', function(event) {
  if (event.keyCode == 13) { // ENTER
    hoodie.store.add('todo', {title: event.target.value});
    event.target.value = '';
  }
});

function addTodo( todo ) {
  $('#todolist').append('<li>'+todo.title+'</li>');
}
function clearTodos() {
  $('#todolist').html('');
} */

$( document ).ready(function() {
  'use stict';

  // initialize Hoodie
  var hoodie  = new Hoodie();

  // initial load of all tips from the store
  hoodie.store.findAll('tip').then( function(tip) {
    tip.forEach( addTip );
  });



  //New user interaction
  $('section.login-form').on('click', 'button.signup', function(e) {
    var signup = $('section.signup-form');
    var parent = $(this).parents('section');
    parent.toggleClass('hide');
    signup.toggleClass('hide');
  });

  //Check for loggedIn user and show appropriate form
  $('body').on('click', 'button.add-tip', function(e) {
    var login = $('section.login-form');
    if ( hoodie.account.username !== undefined ) {
      alert(hoodie.account.username);
      $('section.tip-form').toggleClass('hide');
    } else {
      login.toggleClass('hide');
    }
  });

  /*
    Tip Model
    title: String
    content: String
    author: String
    submittedOn: DateToString
  */

  // Function to add a tip to the firebase database
  pushTip = function(tipTitle, tipContent, tipAuthor) {
    hoodie.store.add('tip', {
      title: tipTitle,
      content: tipContent,
      author: tipAuthor,
      submittedOn: new Date().toString()
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
    /*
    auth.createUser(email, password, function(error, user) {
      if (!error) {
        form.toggleClass('hide');
        $('section.tip-form').toggleClass('hide');
      }
    }); */

    hoodie.account.signUp(email, password);

  });

  hoodie.account.on('signup', function(user) {
    //alert(hoodie.account.username);
    $('section.signup-form').toggleClass('hide');
  });


  $('section.login-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();
    var email = $('#email').val(),
        password = $('#password').val(),
        form = $('section.login-form');
    /*
    auth.login('password', {
      email: email,
      password: password,
      debug: true
    }); */
    hoodie.account.signIn(email, password);

    //form.toggleClass('hide');

  });

  hoodie.account.on('signin', function(user) {
    alert(hoodie.account.username + ' is now signed in!');
    if ( !( $('section.signup-form').hasClass('hide') ) ) {
      $('section.signup-form').toggleClass('hide');
    }
    else if ( !( $('section.login-form').hasClass('hide') ) ) {
      $('section.login-form').toggleClass('hide');
      $('section.tip-form').toggleClass('hide');
    } else {
      $('section.tip-form').toggleClass('hide');
    }

  });

  $('section.tip-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();
    var title = $('#tip-title').val(),
        content = $('#tip-content').val(),
        username = hoodie.account.username.split('@', 1);

    console.log(title + ' ' + content);
    pushTip(title, content, username);
    $('section.tip-form').toggleClass('hide');
  });

  /*
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
    console.log(html);
    contentArea.prepend(html);
  });
  */

  function addTip( tip ) {
    var html = '<article class="tip">',
        contentArea = $('section.tips');
    html += '<h1 class="title">'+ tip.title +'</h1>';
    html += '<p class="smaller submitted">Submitted On: <span class="date">'+ tip.submittedOn +'</span></p>';
    html += '<p class="content">'+ tip.content +'</p>';
    html += '<p class="thanks">Thank You <span class="author">'+ tip.author +'</span> for the helpful tip!';

    $(html).insertAfter('section.tips > h2');
  }

  // when a new tip gets stored, add it to the UI
  hoodie.store.on('add:tip', addTip);

  // Simple logout
  $('footer').on('click', 'button.logout', function(e) {
    hoodie.account.signOut();
  });

  hoodie.account.on('signout', function(user) {
    if ( !( $('section.tip-form').hasClass('hide') ) ) {
      $('section.tip-form').toggleClass('hide');
    }
    alert('Thanks for contributing! You\'ve now been logged out.');
  });


});
