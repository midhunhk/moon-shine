/**
 *	data.js
 * 	The data for displaying the graph are defined in this file
 **/

graphData = [
    {
        text: "Boston", _id: "node00", xPos: 658, yPos: 348,
        links:[ {"_id": "node01"}, {"_id": "node07"} ]
    },
    {
        text: "Nevada", _id: "node01", xPos: 380, yPos: 519,
        links:[ {"_id": "node07"} ]
    },
    {
        text: "Fort Worth", _id: "node02", xPos: 509, yPos: 14,
        links:[ ]
    },
    {
        text: "San Jose", _id: "node03", xPos: 508, yPos: 174,
        links:[ {"_id": "node02"} ]
    },
    {
        text: "New York", _id: "node04", xPos: 809, yPos: 127,
        links:[ {"_id": "node02"} ]
    },
    {
        text: "Dallas", _id: "node05", xPos: 978, yPos: 175,
        links:[ {"_id": "node03"} ]
    },
    {
        text: "Chicago", _id: "node06", xPos: 800, yPos: 250,
        links:[  ]
    },
    {
        text: "Cincinatti", _id: "node07", xPos: 100, yPos: 350,
        links:[  ]
    },
    {
        text: "Florida", _id: "node08", xPos: 867, yPos: 19,
        links:[ {"_id": "node02"} ]
    },
    {
        text: "Washington", _id: "node09", xPos: 257, yPos: 249,
        links:[ {"_id": "node02"} ]
    },
    {
        text: "Seattle", _id: "node10", xPos: 625, yPos: 250,
        links:[ ]
    }
    
];
