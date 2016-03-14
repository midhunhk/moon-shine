/** codegen.js - experimental code generation
  * Midhun Harikumar
  *
  *
  **/

  // Initialzations on page load
$(document).ready(function () {
    $("#code-preview").hide();

    $("#btnCode").click(function () {
        // Do some code generation	

        var completeCode = "";
        $('.node').each(function (index, obj) {
            $obj = $(obj);
            var code = "node" + index + " = createNode(\"";
            code = code + $obj.children().first().text() + "\", \"";
            code = code + obj.id + "\", ";
            code = code + $obj.position().left + ",";
            code = code + $obj.position().top + ");";

            // Add this element's code with a break-rule to the entire code
            completeCode += code + "<br/>";
        });

        $("#code-preview").html(completeCode);

        // show or hide the section
        $("#code-preview").slideToggle();
    });
});
  