var templates = {};

templates.userList = [
"<div class='userCard' rel='<%= name %>' data-userid='<%= _id %>'>",
"<h5 class='userName'><%= name %></h5>",
'<i class="fa fa-times deleteUserIcon" rel="<%= name %>"></i>',
"</div>"
].join("")

templates.message = [
'<div class="messageCard" rel="<%= name %>" data-msgid="<%= timeStamp %>">',
'<span class = "userIdentifier"><%= name %>:</span>',
'<span class = "userMessage"><%= content %></span>',
'<i class="fa fa-times deleteMsgIcon" rel="<%= name %>"></i>',
'</div>'
].join("")
