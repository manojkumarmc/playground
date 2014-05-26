var TicTacToe = (function() {

    var container;
    var dims = 0;
    var clickedObj;
    var row;
    var col;

    var board = [
	[ {id:0}, {id:1}, {id:2} ],
	[ {id:3}, {id:4}, {id:5} ],
	[ {id:6}, {id:7}, {id:8} ]
    ];

    var neighbors = [
	[ board[0][1], board[1][0], board[1][1]	],
	[ board[0][0], board[0][2], board[1][0], board[1][1], board[1][2] ],
        [ board[0][1], board[1][1], board[1][2]	],
	[ board[0][0], board[0][1], board[1][1], board[2][0], board[2][1] ],
	[ board[0][0], board[0][1], board[0][2], board[1][0], board[1][2], board[2][0], board[2][1], board[2][2] ],
	[ board[0][1], board[0][2], board[1][1], board[2][1], board[2][2] ],
	[ board[1][0], board[1][1], board[2][1]	],
	[ board[2][0], board[1][0], board[1][1], board[1][2], board[2][2] ],
	[ board[2][1], board[1][1], board[1][2]	]
    ];


    var nb = [
	{
	    h : [ board[0][1] ],
	    d : [ board[1][1] ],
	    v : [ board[1][0] ]
	},
	{
	    h : [ board[0][0], board[0][2] ],
	    v : [ board[1][1] ]
	},
	{
	    h : [ board[0][1] ],
	    d : [ board[1][1] ],
	    v : [ board[1][2] ]
	},
	{
	    h : [ board[1][1] ],
	    v : [ board[0][0], board[0][2] ]
	},
	{
	    h : [ board[1][0], board[1][2] ],
	    d : [ board[0][0], board[2][1] ],
	    v : [ board[0][1], board[2][1] ]
	},
	{
	    h : [ board[1][1] ],
	    v : [ board[0][2], board[2][2] ]
	},
	{
	    h : [ board[2][1] ],
	    d : [ board[1][1] ],
	    v : [ board[1][0] ]
	},
	{
	    h : [ board[2][0], board[2][2] ],
	    v : [ board[1][1] ]
	},
	{
	    h : [ board[2][1] ],
	    d : [ board[1][1] ],
	    v : [ board[1][2] ]
	}
    ]

    var diagonals = [
	{
	    h : [ board[0][1], board[0][2] ],
            v : [ board[1][0], board[2][0] ],
	    d : [ board[1][1], board[2][2] ]
	},
    	{
	    h : [ board[0][0], board[0][2] ],
	    v : [ board[1][1], board[2][1] ] 
	},
    	{
	    h : [ board[0][0], board[0][1] ],  
	    v : [ board[1][2], board[2][2] ],
	    d : [ board[1][1], board[2][0] ]  
	},
    	{
	    h : [ board[1][1], board[1][2] ],
	    v : [ board[0][0], board[2][0] ]  
	},
        {
	    h : [ board[1][0], board[1][2] ],
	    v : [ board[0][1], board[2][1] ],
	    d : [ [ board[0][0],board[2][2] ], [ board[0][2], , board[2][0] ] ]  
	},
    	{
	    h : [ board[1][0], board[1][1] ],
	    v : [ board[0][2], board[2][2] ]
	},
    	{
	    h : [ board[2][1], board[2][2] ],
	    v : [ board[0][0], board[1][0] ],
	    d : [ board[1][1], board[0][2] ]
	},
    	{
	   h :  [ board[2][0], board[2][2] ],
	   v :  [ board[0][1], board[1][1] ]
	}, 
    	{
	    h : [ board[2][0], board[2][1] ],
	    v : [ board[0][2], board[1][2] ],
	    d : [ board[0][0], board[1][1] ]
	}
    ];
    
    function _container(containerName) {
	container = document.getElementById(containerName)
	if ((container.offsetHeight) && (container.offsetWidth === container.offsetHeight)) {
	    dims = container.offsetWidth
	} else {
	    throw new Error('Bad to go.')
	}
	_addCols()
	_reset()
    }

    function _addCols() {
	var r = 0,c = 0;

	for(var i = 0; i < 9; i += 1) {
    	    var box = document.createElement('div')
	    box.id = i
	    box.setAttribute('r', r)
	    box.setAttribute('c', c)
	    box.style.border = '1px solid black'
	    box.style.height = (dims / 3) - 10
	    box.style.width =  (dims / 3) - 10
	    box.style.cssFloat = 'left'
	    box.style.backgroundColor = 'rgb(81, 196, 241)'
	    box.onclick = _clickMe
	    
	    if (i === 2 || i === 5) {
		r += 1
		c = 0	
	    } else {
		c += 1		
	    }
	    
	    container.appendChild(box)	    
	}
    }


    function _clickMe() {
        clickedObj = document.getElementById(this.id);
	row = parseInt(clickedObj.getAttribute('r'));
	col = parseInt(clickedObj.getAttribute('c'));
	_processUserClick(_updateObj)
    }

    function _processUserClick(fn) {
	if (board[row][col].player === '') {
	    if (fn instanceof Function) {
		fn.call(null, row, col, 'H', _respondToHuman)	
	    }
	    clickedObj.style.backgroundColor = 'rgb(100,100,0)'
	}
    }

    function _respondToHuman() {
	var moved = false;
	var inDiagonal = false;
	var statusObj = {};
	var cElement;

	diagonals[clickedObj.id]['h'].forEach(function(dObj) {
	    if ((dObj.player === 'H') && (!inDiagonal)) {
		statusObj.filledObj = dObj
		statusObj.position = 'h'
		inDiagonal = true
	    }
	})

	diagonals[clickedObj.id]['v'].forEach(function(dObj) {
	    if ((dObj.player === 'H') && (!inDiagonal)) {
		statusObj.filledObj = dObj
		statusObj.position = 'v'
		inDiagonal = true
	    }
	})

	if (!(diagonals[clickedObj.id]['d'] === undefined)) {	
	    diagonals[clickedObj.id]['d'].forEach(function(dObj) {
		if ((dObj.player === 'H') && (!inDiagonal)) {
		    statusObj.filledObj = dObj
		    statusObj.position = 'd'
		    inDiagonal = true
		}
	    })
	}
	    
        console.log(nb[parseInt(clickedObj.id)][statusObj.position])

	if (!(nb[parseInt(clickedObj.id)][statusObj.position] === undefined)) {
	    nb[parseInt(clickedObj.id)][statusObj.position].forEach(function(nObj) {
		if ((nObj.player === '') && (!moved)) {
		    nObj.player = 'C'
		    cElement = document.getElementById(nObj.id)
		    cElement.style.backgroundColor = 'red'
		    moved = true
		}
	    }) 
	} else {
	    
	    console.log('in here')

	    if (!(nb[parseInt(clickedObj.id)]['d'] === undefined) && (!moved)) {
		console.log(nb[parseInt(clickedObj.id)]['d'].length)
		if (nb[parseInt(clickedObj.id)]['d'][0].player === '') {
		    nb[parseInt(clickedObj.id)]['d'][0].player = 'C'
  	            cElement = document.getElementById(nb[parseInt(clickedObj.id)]['d'][0].id)
		    cElement.style.backgroundColor = 'red'		
		    moved = true
		}
	    }

	    if (!(nb[parseInt(clickedObj.id)]['h'] === undefined) && (!moved)) {
		console.log(nb[parseInt(clickedObj.id)]['h'].length)
		if (nb[parseInt(clickedObj.id)]['h'][0].player === '') {
		    nb[parseInt(clickedObj.id)]['h'][0].player = 'C'
  	            cElement = document.getElementById(nb[parseInt(clickedObj.id)]['h'][0].id)
		    cElement.style.backgroundColor = 'red'		
		    moved = true
		}
	    }

	    if (!(nb[parseInt(clickedObj.id)]['v'] === undefined) && (!moved)) {
		console.log(nb[parseInt(clickedObj.id)]['v'].length)
		if (nb[parseInt(clickedObj.id)]['v'][0].player === '') {
		    nb[parseInt(clickedObj.id)]['v'][0].player = 'C'
  	            cElement = document.getElementById(nb[parseInt(clickedObj.id)]['v'][0].id)
		    cElement.style.backgroundColor = 'red'		
		    moved = true
		}
	    }


	}

    }

    

    function countHumansInDiagonals() {
	var humanClickCount = 0;
	diagonals[clickedObj.id]['h'].forEach(function(obj) {
	    if (obj.player === 'H') {
		humanClickCount += 1
	    }
	    console.log(obj)
	})
	diagonals[clickedObj.id]['v'].forEach(function(obj) {
	    if (obj.player === 'H') {
		humanClickCount += 1
	    }
	    console.log(obj)
	})
        console.log(humanClickCount)
	return humanClickCount
    }

    function type(obj){
	return Object.prototype.toString.call(obj).slice(8, -1);
    }

    function _repaint(idExcept) {
	for (var x = 0; x < 9; x += 1) {
	    document.getElementById(x).style.backgroundColor = 'rgb(81, 196, 241)'		
	}
    }

    function _listAll() {
	_list(diagonals)
	_list(neighbors)
    }

    function _list(listObj) {
	listObj.forEach(function(lObj) {
	    if (lObj instanceof Array) {
		lObj.forEach(function(dObj) {
		    console.log(dObj)
		})		
	    } else {
		console.log(lObj)
	    }

	})
    }

    function _updateObj(row, col,  playerMode, fn) {
	board[row][col].player = playerMode
	if (fn instanceof Function) {
	    setTimeout(function() {
		fn.apply(this, [])
	    } , 1000)
	}
    }

    function _resetObj(resetObj) {
	resetObj.forEach(function(rObj) {
	    rObj.forEach(function(dObj) {
		dObj.player = ''
	    })
	})
    }

    function _reset() {
//	_resetObj(diagonals)
	_resetObj(neighbors)
	_repaint()
    }
    
    return {
	init : _container,
	reset: _reset
    } 

}())
