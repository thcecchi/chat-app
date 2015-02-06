$(document).ready(function () {
  chatApp.init();

});


var chatApp = {

  config: {
    url: "http://tiy-fee-rest.herokuapp.com/collections/closetalkers"
  },

  userProfile: {
    profile: JSON.parse( localStorage.getItem( 'profile' ) ),
    messages: []
  },

  init: function () {
    chatApp.initStyle();
    chatApp.initEvents();

    /// RETRIVE USERNAME FROM LOCAL STORAGE ////
   ////////////////////////////////////////////
   var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );

   /// IF USER EXISTS IN LOCAL STORAGE HIDE LOGIN FIELD ////
  /////////////////////////////////////////////////////////
   if(localStorage.getItem('profile')) {
     $('.login').html(userProfile.user.name);
     $('#enterUserForm').css('display', 'none');
     chatApp.renderAllUsers();
   }

  },
  initEvents: function() {

     /// CREATE USER //
    //////////////////
    $('#enterUserForm').on('submit',function(e){
      e.preventDefault();

      var userInfo = {
        user:{
          name:$(this).find('input[name="enterUserInput"]').val(),
          // messages: []
        }
      };

      chatApp.createUser(userInfo);

       /// STORE USER INFO TO LOCAL STORAGE //
      ///////////////////////////////////////
      localStorage.setItem("profile" , JSON.stringify(userInfo));

    });

     /// LOGOUT USER //
    //////////////////
    // $('.userListContainer').on('click', '.delete', function (event) {
    //   event.preventDefault();
    //
    //   var itemId = $('.userCard').data('userid');
    //   console.log(userId);
    //   chatApp.deleteUser(userId);
    // });


    /// CREATE MESSAGE //
    //////////////////
    $('#enterMessageForm').on('submit',function(e){
      e.preventDefault();

      var userId = $('.userCard').data('userid');
      var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
      var userMessages = chatApp.userProfile.profile.user["messages"]
      var msg = $(this).find('input[name="enterMessageInput"]').val()

      var updatedUserInfo = {
        user:{
          name: userProfile.user.name,
          messages: userMessages
        }
      };

      userMessages.push(msg);

      chatApp.addMessage(userId, updatedUserInfo);

    });

  },

  initStyle: function () {

  },

  render: function (data, tmpl, $el) {

    var template = _.template(data, tmpl);

    $el.append(template);

  },

  renderAllUsers: function () {
    $.ajax({
      url: chatApp.config.url,
      type: 'GET',
      success: function (users) {

        var compiledUserTemplate = _.template(templates.userList);
        // $('.container').append(compiledTemplate);

        var markup = "";
        users.forEach(function (item, idx, arr) {
          markup += compiledUserTemplate(item);
        });
        console.log('markup is.....', markup);
        $('.userListContainer').html(markup);
      },

      error: function (err) {
        console.log(err);
      }

    });
  },

  createUser: function (passedUser) {
    $.ajax({
      url: chatApp.config.url,
      data: passedUser,
      type: 'POST',
      success:function(data){
        chatApp.renderAllUsers();
        console.log(passedUser);
      },
      error:function(error){
        console.log(error);
      }
    });
  },

  deleteUser: function (id) {
    $.ajax({
      url: chatApp.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        chatApp.renderAllUsers();
      },
      error: function (err) {
        console.log(err);
      }
    })
  },

  /// MESSAGE ACTIONS ////
  ////////////////////////

  renderAllMessages: function () {
    $.ajax({
      url: chatApp.config.url,
      type: 'GET',
      success: function (message) {

        var compiledMessageTemplate = _.template(templates.messageList);
        var markup = "";

        message.forEach(function (item, idx, arr) {
          markup += compiledMessageTemplate(item);
        });
        console.log('markup is.....', markup);
        $('.messageListContainer').html(markup);
      },

      error: function (err) {
        console.log(err);
      }

    });
  },

  addMessage: function (id, msg) {
    $.ajax({
      url: chatApp.config.url + '/' + id,
      data: msg,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        chatApp.renderAllMessages();
      },
      error: function (err) {
        console.log(err);
      }
    });

  }

}
