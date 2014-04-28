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

  // initial load of all todo items from the store
  hoodie.store.findAll('tips').then( function(tips) {
    tips.sort( sortByCreatedAt ).forEach( addTip );
  });

  function sortByCreatedAt(a, b) {
    return a.createdAt > b.createdAt;
  }

  // when a new tip gets stored, add it to the UI
  hoodie.store.on('add:tip', addTips);
  // clear tip list when the get wiped from store
  hoodie.account.on('signout', clearTips);

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
    //if ( currentUser ) {
      //$('section.tip-form').toggleClass('hide');
    //} else {
      login.toggleClass('hide');
    //}
  });

  /*
    Tip Model
    title: String
    content: String
    author: String
    submittedOn: DateToString
  */
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
    contentArea.append(html);
  });
  */
  /*
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
  }; */

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

    form.toggleClass('hide');

  });

  $('section.tip-form').on('click', 'input[type="submit"]', function(e) {
    e.preventDefault();
    var title = $('#tip-title').val(),
        content = $('#tip-content').val(),
        form = $('section.tip-form');

    console.log(title + ' ' + content);

    //pushTip(title, content, currentUser.username);
  });

  // Simple logout
  $('footer').on('click', 'button.logout', function(e) {
    //auth.logout();
    document.location.reload();
  });


});
