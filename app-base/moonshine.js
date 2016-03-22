/**
 * Moonshine
 * A multi node graph implementation using HTML5 Canvas
 * 
 * based on https://github.com/boundary/html5-node-diagram
 **/

// Configurations
var CONFIG = {
    width: 120,
    height: 50,
    enableEditTitleOnClick: false
};

// internal varaibles
var stage;
var Node = window.Node;
var Segment = window.Segment;
var highlightedNode;

/**
 * Initialize and run the application
 */
(function($, window) {
	function initialize() {
		// Do some animation to the stage onload
		$("#stage").hide().delay(100).fadeIn(300);
		stage = $('#stage');
		
		// Create the nodes
		createNodes();
		
		// Create links between nodes
		createLinks();
	}
	initialize();
}(jQuery, window));

//-------------------------------------------------------------------
// Utility Methods
//-------------------------------------------------------------------

// Creates a node based on a template
function createNode(nodeTitle, nodeId, nodeX, nodeY){
	return new Node({
		title: nodeTitle,
		id: nodeId,
		filepath: 'placeholder',
		stage: stage,
		w: CONFIG.width,
		h: CONFIG.height,
		x: nodeX,
		y: nodeY,
		events: {
			click: function() {
				var nodeid = '#' + this.id;
				$node = $(nodeid);
				$node.focus();
				
				var nodeSelected = $node.data( 'nodeSelected');
				
				$node.mouseup( function(){
					$( nodeid ).css( 'background', '#4db6ac' ); /* backgound color from .node*/
				});
				$node.mousedown( function(){
					$( nodeid ).css( 'background', '#99cc00' ); /* highlight color*/
				});
				if( nodeSelected != 'selected') {
					// Do stuff for selected state
					$node.data( 'nodeSelected', 'selected' );
					
					var includesegments = this.segments; 
					for( i = 0; i < includesegments.length; i++) {
						var includesegmentid = '#' + includesegments[i].id;
						$( includesegmentid ).css( 'opacity', '1' );
						$('#' + includesegments[i].origin.id ).css( 'opacity', '1' );
						$('#' + includesegments[i].destination.id ).css( 'opacity', '1' );
					}
					
					// allow the title to be modified if enabled
					if(CONFIG.enableEditTitleOnClick){
                        			// Reset the border for the previously highlighted node
                				if(undefined != highlightedNode){
                            				highlightedNode.css('border-color', '#ffffff');
                        			}
                        
                        			// Highlight this node and setup a listener for keypress
						$node.css('border-color', '#ec461c');
						$node.bind("keypress", function(e){
							$thisNode = $(this);
							
							// Clear the content on first keypress
							if($thisNode.data( 'editStarted') != 'true'){
								$thisNode.data( 'editStarted', 'true');
								$thisNode.children().first().text('')
							}
							
							var code = (e.keyCode ? e.keyCode : e.which);
							var text = $thisNode.children().first().text() + String.fromCharCode(code);
							$thisNode.children().first().text(text);
							
						});
						
						// Save this node as the highlighted node
                        			highlightedNode = $node;
					}
				} else {
					// Do stuff for non selected state
					$node.data( 'nodeSelected', 'notselected' );
					
					var includesegments = this.segments; 
					for( i = 0; i < includesegments.length; i++) {
						var includesegmentid = '#' + includesegments[i].id;
					}
					
					if(CONFIG.enableEditTitleOnClick){
						// Reset the node highlight signifying edit
						$node.css('border-color', '#ffffff');
                        
						// Stop edit when the node is clicked again
						$node.unbind("keypress");
						$node.data( 'editStarted', 'false');
					}
				}
			}
		}
	}).attach();
}

// Prevent backspace key from navigating out of the app
$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

/**
 * Create and attach a segment between two given nodes
 */
function createAndAttachSegment(originNode, destinationNode){
	var segmentId = "includesegment-" + originNode.id + "-" + destinationNode.id;
	new Segment({h: 5, id:segmentId, stage: stage, origin: originNode, destination: destinationNode}).attach();
}

/**
 * Creates all the nodes. All created nodes are public. 
 * Generated code can be placed in this method and the links should be added in
 * the createLinks() method
 */
function createNodes() {
    // Dictionary of all nodes with the ID as key
    nodes = [];
    
    // List of links in {source, destination} format
    links = [];
    
    // Iterate over the datas defined in data.js
    $(graphDatas).each( function(){
        $data = $(this)[0];
        
        // create a node from the data and add it to the dictionary
        nodes[$data._id] = createNode($data.text, $data._id, $data.xPos, $data.yPos);
        
        // Store the link references and build links later once we have all the nodes
        $($data.links).each( function(){
            links[links.length] = {"source": $data._id, "target": $(this)[0]._id};
        });
    });
}

/**
 * Cretes the links between the nodes
 */
function createLinks() {
    // Now all the nodes should be available for creating the links
    $(links).each( function(){
        var source = nodes[$(this)[0].source];
        var target = nodes[$(this)[0].target];
        
        createAndAttachSegment(source, target);
    });
}
