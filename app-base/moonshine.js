/**
 * 	Moonshine
 *	A multi node graph implementation in HTML5
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
	
(function($, window) {
	function initialize() {
		$("#stage").hide().delay(100).fadeIn(300);
		stage = $('#stage');
		createNodes();
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
						// Stop edit when clicked again
						$node.unbind("keypress");
						$node.data( 'editStarted', 'false');
					}
				}
			}
		}
	}).attach();
}


function createAndAttachSegment(originNode, destinationNode){
	var segmentId = "includesegment-" + originNode.id + "-" + destinationNode.id;
	new Segment({h: 5, id:segmentId, stage: stage, origin: originNode, destination: destinationNode}).attach();
}

/**
 * Cretes the links
 */
function createLinks() {
	/* Segment is a red line with an arrow head*/
	/*
	new Segment({id: 'includesegment4-0',h: 5,stage: stage,origin: node0,destination: node1}).attach();
	new Segment({id: 'includesegment4-1',h: 5,stage: stage,origin: node5,destination: node4}).attach();
	new Segment({id: 'includesegment4-2',h: 5,stage: stage,origin: node6,destination: node4}).attach();
	*/
	
	/* SegmentImport is an orange line with an arrowhead*/
	createAndAttachSegment(node0, node1)
	createAndAttachSegment(node4, node2)
	createAndAttachSegment(node5, node3)
	createAndAttachSegment(node1, node7)
	createAndAttachSegment(node0, node7)
	createAndAttachSegment(node3, node2)
	createAndAttachSegment(node8, node2)
	createAndAttachSegment(node9, node2)
	
}

/**
 * Creates all the nodes. All created nodes are public. 
 * Generated code can be placed in this method.
 */
function createNodes() {
	node0 = createNode("boston", "node00", 658,348);
	node1 = createNode("nevada", "node01", 380,519);
	node2 = createNode("fort worth", "node02", 509,14);
	node3 = createNode("san jose", "node03", 508,174);
	node4 = createNode("new york", "node04", 809,127);
	node5 = createNode("dallas", "node05", 978,175);
	node6 = createNode("chicago", "node06", 800,250);
	node7 = createNode("cincinatti", "node07", 100,350);
	node8 = createNode("florida", "node08", 867,19);
	node9 = createNode("washington", "node09", 257,249);
	node10 = createNode("seattle", "node10", 625,250);
}

