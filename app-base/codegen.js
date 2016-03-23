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
        
        // Build all relations between nodes
        var allLinks = [];
        $('.segment').each( function(){
            var segments = $(this).attr("id").split("-");
            var sourceNode = segments[1];
            var targetNode = segments[2];
            
            var links = allLinks[sourceNode];
            
            if(links == undefined){
                allLinks[sourceNode] = targetNode;
            } else {
                allLinks[sourceNode] = links + "," + targetNode;
            }
        });
        
        var completeCode = "[ ";
        var nodesLength = $('.node').length;
        $('.node').each(function (index, obj) {
            var $obj = $(obj);
            var objId = $obj.attr("id");
            
            var code = "    {";
                code = code + 'text: "' + $obj.children().first().text() + '",';
                code = code + '_id:  "' + objId + '", ';
                code = code + 'xPos: ' + $obj.position().left + ",";
                code = code + 'yPos: ' + $obj.position().top + " ";
            
            // Generate code for links
            if(allLinks[objId] != undefined){
                var links = allLinks[objId].split(",");
                var linksCode = "";
                // Format : {"_id": "node01"}, {"_id": "node07"}
                $(links).each( function(index, obj){
                    linksCode += '{\"_id" : "' + obj + '"}';
                    if(index + 1 < links.length){
                        linksCode += ",";
                    }
                    
                });
                code = code + ', links: [' + linksCode + ']';
            }
                
            // Add this element's code with a break-rule to the entire code
            if(nodesLength == index + 1){
                // Last node doesn't need the comma
                completeCode += code + "    }<br/>";
            } else {
                completeCode += code + "    },<br/>";
            }
        });
        
        completeCode += "]";

        $("#code-preview").html(completeCode).slideToggle()
    });
});
