(function(){
    "use strict";

    $(document).ready(function () {
        // Listen to submit event on the <form> itself!
        $('#contact-form').submit(function (e) {
      
          // Prevent form submission which refreshes page
          e.preventDefault();
      
          // Serialize data
          var formData = JSON.parse(JSON.stringify($(this).serializeArray()))
          // Make AJAX request
          $.post("api/contact", formData
                ).done(function(){
                    document.getElementById("contact-form").reset();
                });
        });
      });
})();