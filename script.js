$(function() {
	var ids=[];
    function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    do {
	    	for (var i = 0; i < 10; i++) {
	       		str += chars[Math.floor(Math.random() * chars.length)];
	    	}
	    } while(ids.includes(str))
	    ids.push(str);
	    return str;
	}
    function Column(name) {
	    var self = this;
	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();
	    function createColumn() {
	    	//struktura html kolumny
	    	var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
			//listenery w column
			$columnDelete.click(function() {
	        	self.removeColumn();
			});
	    	$columnAddCard.click(function() {
	        	self.addCard(new Card($(self),prompt("Enter the name of the card")));
			});
			//dodanie struktury
			$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
			return $column;
	    }
  	}
  	Column.prototype = {
	  	addCard: function(card) {
	  		this.$element.children('ul').append(card.$element);
	  	},
	  	removeColumn: function() {
	 	 	this.$element.remove();
	  	}
  	}
  	function Card($parent,description) {
		var self = this;
		this.$parent = $parent;
	    this.id = randomString();
	    this.description = description;
	    this.$element = createCard();
	    function createCard() {
	    	//struktura html karty
		    var $card = $('<li>').addClass('card').attr('id',self.id);
		    var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		    var $cardDelete = $('<button>').addClass('btn-delete').text('x');
		    var $cardArchive = $('<button>').addClass('btn-archive').text('archive');
		    var $cardRestore = $('<button>').addClass('btn-restore').text('restore');
		    //listener w karty
		    $cardDelete.click(function(){
	        	self.removeCard();
			});
			$cardArchive.click(function(){
	        	self.archiveCard();
			});
			$cardRestore.click(function() {
				self.restoreCard();
			});
			//dodanie struktury
			$card.append($cardDelete).append($cardDescription).append($cardArchive).append($cardRestore);
			$('.btn-restore').css("display","none");
			return $card;
		}
  	}
  	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		},
		archiveCard: function() {
			$('.archive').append(this.$element);
			console.log();
			$('#'+this.id+' .btn-delete').css("display","none");
			$('#'+this.id+' .btn-archive').css("display","none");
			$('#'+this.id+' .btn-restore').css("display","block");
		},
		restoreCard: function() {
			this.$parent.append(this.$element);
			$('#'+this.id+' .btn-delete').css("display","block");
			$('#'+this.id+' .btn-archive').css("display","block");
			$('#'+this.id+' .btn-restore').css("display","none");
		}
	}
  	var board = {
	    name: 'Kanban Board',
	    addColumn: function(column) {
	      this.$element.append(column.$element);
	      initSortable();
	    },
	    $element: $('#board .column-container')
	};
	function initSortable() {
   		$('.column-card-list').sortable({
	     	connectWith: '.column-card-list',
	    	placeholder: 'card-placeholder'
   		}).disableSelection();
   	}
	$('.create-column').click(function() {
		var name = prompt('Enter a column name');
		var column = new Column(name);
		board.addColumn(column);
	});

	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);
	todoColumn.addCard(new Card($(todoColumn.$element),'New task'));
	doingColumn.addCard(new Card($(doingColumn.$element),'Create kanban boards'));
})