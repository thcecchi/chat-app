var templates = {};

templates.userList = [
"<div class='userCard' rel='<%= name %>' data-userid='<%= _id %>'>",
"<h3 class='userName'><%= name %></h3>",
"</div>"
].join("")

templates.message = [
'<div class="messageCard" rel="<%= name %>" data-msgid="<%= timeStamp %>">',
'<span class = "userIdentifier"><%= name %>:</span>',
'<span class = "userMessage"><%= content %></span>',
'<i class="fa fa-times"></i>',
'</div>'
].join("")
