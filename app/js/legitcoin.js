var username = "";
      $(document).ready(function() {
          $("#btnSubmit").click(function(){
              var emailStr = $("#email").val();
              var passStr = $("#password").val();
              var sendInfo = {
                type:"login",
                 username: emailStr,
                 password: passStr
              };
              $.ajax({
                url: 'http://localhost:3000',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(sendInfo),
                success: function(data) {
                  if (data.data == "true") {
                    username = emailStr;
                    window.location.href = '/main.html';
                  }
                }
              });
          }); 
      });

      