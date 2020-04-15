"use strict";
/*
 * MTD280 Online Multimedia
 * http://www.fh-ooe.at/mtd
 *
 * Simple Vue.js Application Template
 *
 */

const COLOR0 = "#000";
const COLOR1 = "#FFF";
const IMAGE0 = "img/Realistic_Go_Stone.svg";
const IMAGE1 = "img/Realistic_White_Go_Stone.svg";


new Vue({
	el: "#app",

	data: {
		images: false,
		dimension: 9
	},

	methods: {
		drawBoard: function() {
			let ctx, offsetX, offsetY;

			offsetX = this.colSize / 2;
			offsetY = this.rowSize / 2;

			ctx = this.canvas.getContext('2d');
			ctx.beginPath();

			for (let i = 0; i < this.dimension; i++) {
				// vertical lines
				ctx.moveTo(offsetX + i * this.colSize, offsetY);
				ctx.lineTo(offsetX + i * this.colSize, this.canvas.height - offsetY);

				// horizontal lines
				ctx.moveTo(offsetX, offsetY + i * this.rowSize);
				ctx.lineTo(this.canvas.width - offsetX, offsetY + i * this.rowSize);
			}

			ctx.stroke();
			ctx.closePath();
		},

		clickHandler: function(e) {
			let x, y;
			x = Math.floor((e.clientX - this.canvas.offsetLeft) / this.colSize);
			y = Math.floor((e.clientY - this.canvas.offsetTop) / this.rowSize);

			if(!this.board[x][y] && !this.won) {
				this.drawStone(x, y);
				this.board[x][y] = this.stoneColor ? '0' : '1';
				this.stoneColor = !this.stoneColor;
			}

			this.checkState();
		},

		redrawBoard: function() {
			this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.drawBoard();

			for (var i = 0; i < this.dimension; i++) {
				for (var j = 0; j < this.dimension; j++) {
					if(this.board[i][j]) {
						this.drawStone(i, j);
					}
				}
			}
		},

		drawStone: function(x, y) {
			let ctx;
			ctx = this.canvas.getContext('2d');

			if (this.board[x][y])
				ctx.fillStyle = this.board[x][y] === '0' ? COLOR0 : COLOR1;
			else
				ctx.fillStyle = this.stoneColor ? COLOR0 : COLOR1;

			if (!this.images) {
				ctx.beginPath();
				ctx.arc(x * this.colSize + this.colSize/2, y * this.rowSize + this.rowSize/2, this.colSize/4, 0, 2 * Math.PI);
				ctx.fill();
			} else {
				let img = new Image();

				img.onload = function() {
					ctx.drawImage(img, x * this.colSize + this.colSize/2 - this.colSize/4, y * this.rowSize + this.rowSize/2 - this.rowSize/4, this.colSize/2, this.rowSize/2);
				}.bind(this);

				if (this.board[x][y])
					img.src = this.board[x][y] === '0' ? IMAGE0 : IMAGE1;
				else
					img.src = this.stoneColor ? IMAGE0 : IMAGE1;
			}
		},

		checkState: function() {
			let count = 0;
			let player;

			//Horizontal
			for (let i = 0; i < this.dimension; i++) {
				for (let j = 0; j < this.dimension; j++) {
					if(this.board[i][j]){
						if (count === 0) {
							player = this.board[i][j];
						}

						if (this.board[i][j] === player) {
							count++;
							if(count >= 5)
								this.win(player);
						}
						else
							count = 0;
					} else
						count = 0;
				}
			}

			count = 0;

			//Vertical
			for (let i = 0; i < this.dimension; i++) {
				for (let j = 0; j < this.dimension; j++) {
					if(this.board[j][i]){
						if (count === 0) {
							player = this.board[j][i];
						}

						if (this.board[j][i] === player) {
							count++;
							if(count >= 5)
								this.win(player);
						}
						else
							count = 0;
					} else
						count = 0;
				}
			}

			count = 0;

			//Diagonal top-left to bottom-right
			for(let i = 0; i < this.dimension - 4; i++){
			    count = 0;
			    for(let row = i, col = 0; row < this.dimension && col < this.dimension; row++, col++ ){
						if(this.board[row][col]){
							if(count === 0)
								player = this.board[row][col];
			        if(this.board[row][col] == player){
			            count++;
			            if(count >= 5)
										this.win(player);
			        }
			        else {
			            count = 0;
			        }
						} else
							count = 0;
			    }
			}

			count = 0;

			//Diagonal top-left to bottom-right
			for(let i = 1; i < this.dimension - 4; i++){
			    count = 0;
			    for(let row = 0, col = i; row < this.dimension && col < this.dimension; row++, col++ ){
						if(this.board[row][col]){
							if(count === 0)
								player = this.board[row][col];
			        if(this.board[row][col] == player){
			            count++;
			            if(count >= 5)
										this.win(player);
			        }
			        else {
			            count = 0;
			        }
						} else
							count = 0;
			    }
			}

			count = 0;

			//Diagonal bottom-left to top-right
			for(let i = this.dimension - 1; i > 3; i--){
			    count = 0;
			    for(let row = i, col = 0; row >= 0 && col < this.dimension; row--, col++){
						if(this.board[row][col]){
							if(count === 0)
								player = this.board[row][col];
			        if(this.board[row][col] == player){
			            count++;
			            if(count >= 5)
										this.win(player);
			        }
			        else {
			            count = 0;
			        }
						} else
							count = 0;
			    }
			}

			count = 0;

			//Diagonal bottom-left to top-right
			for(let i = 1; i < this.dimension - 4; i++){
			    count = 0;
			    for(let row = this.dimension - 1, col = i; row >= 0 && col < this.dimension; row--, col++){
						if(this.board[row][col]){
							if(count === 0)
								player = this.board[row][col];
			        if(this.board[row][col] == player){
			            count++;
			            if(count >= 5)
										this.win(player);
			        }
			        else {
			            count = 0;
			        }
						} else
							count = 0;
			    }
			}
		},

		win: function(player) {
			this.won = true;
			let ctx = this.canvas.getContext('2d');
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			ctx.fillStyle = player === '0' ? "black" : "white";
			ctx.textAlign = "center";
			ctx.font = "40px Arial";
			ctx.fillText((player === '0' ? "Black" : "White") + " won!", this.canvas.width/2, this.canvas.height/2);
		},

		restart: function() {
			this.colSize = this.canvas.width / this.dimension;
			this.rowSize = this.canvas.height / this.dimension;
			this.board = new Array(this.dimension);

			for (var i = 0; i < this.board.length; i++) {
	    	this.board[i] = new Array(this.dimension);
			}

			this.won = false;
			this.stoneColor = true;

			this.redrawBoard();
		},
	},

	watch: {
		images: function() {
			if(!this.won)
				this.redrawBoard();
		}
	},

	mounted: function() {
		this.canvas = document.getElementById('canvas');
		this.canvas.style.background = "url('img/Wood.jpg')";
		this.colSize = this.canvas.width / this.dimension;
		this.rowSize = this.canvas.height / this.dimension;
		this.board = new Array(this.dimension);
		this.won = false;

		for (var i = 0; i < this.board.length; i++) {
    	this.board[i] = new Array(this.dimension);
		}

		this.stoneColor = true;

		this.drawBoard();
	}
});
