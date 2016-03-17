/**
 * 	Moonshine
 *	A multi node graph implementation using HTML5 Canvas
 * 
 * 	based on https://github.com/boundary/html5-node-diagram
 * 	Colors: http://www.colorhexa.com/0099cc
 **/
 
// Init
var NODE_DIMENSIONS = {
	w: 120,
	h: 50
};
var stage,
	Node = window.Node,
	Segment = window.Segment;

var ENABLE_EDIT_TITLE_ON_CLICK = true;

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

// Creates a node based on a template
function createNode(nodeTitle, nodeId, nodeX, nodeY){
	return new Node({ 
		title: nodeTitle,
		id: nodeId,
		filepath: 'placeholder',
		stage: stage,
		w: NODE_DIMENSIONS.w,
		h: NODE_DIMENSIONS.h,
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
					if(ENABLE_EDIT_TITLE_ON_CLICK){
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
					}
				}else{
					// Do stuff for non selected state
					$node.data( 'nodeSelected', 'notselected' );
					
					var includesegments = this.segments; 
					for( i = 0; i < includesegments.length; i++) {
						var includesegmentid = '#' + includesegments[i].id;
					}
					
					if(ENABLE_EDIT_TITLE_ON_CLICK){
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

/**
 * Utility method that creates and attaches a segment between two nodes
 */
function createAndAttachSegment(originNode, destinationNode){
	var segmentId = "includesegment-" + originNode.id + "-" + destinationNode.id;
	new Segment({h: 5, id:segmentId, stage: stage, origin: originNode, destination: destinationNode}).attach();
}
