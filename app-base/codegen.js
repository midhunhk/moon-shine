/** codegen.js - experimental code generation
 *
 * Midhun Harikumar
 *
 **/

// Initialzations on page load
$(document).ready(function () {
    $("#code-preview").hide();

    $("#btnCode").click(function () {
        // Let's generate some code!!!

        var completeCode = "[ ";
        var nodesLength = $('.node').length;
        $('.node').each(function (index, obj) {
            var $obj = $(obj);
            
            var code = "    {";
                code = code + "text: \"" + $obj.children().first().text() + "\",";
                code = code + "_id:  \"" + $obj.attr("id") + "\", ";
                code = code + "xPos: " + $obj.position().left + ",";
                code = code + "yPos: " + $obj.position().top + " ";
            
                // TODO: Generate code for links
                // code = code + "links: \"[]\"";
                
            // Add this element's code with a break-rule to the entire code
            if(nodesLength == index + 1){
                // Last node doesn't need the comma
                completeCode += code + "    }<br/>";
            } else {
                completeCode += code + "    },<br/>";
            }
        });
        
        completeCode += "]";

        $("#code-preview").html(completeCode);

        // show or hide the section
        $("#code-preview").slideToggle();
    });
});
  
