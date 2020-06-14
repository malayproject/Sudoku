            var solGrid = new Array(9);
            var quesGrid = new Array(9);
            var flag = false;
            function getRandomInt(maxExcl)  {
                return 1+Math.floor(Math.random()*Math.floor(maxExcl));
            }
            var initGrid = function(grid)   {
                for(var i = 0; i < 9; i++) {
                    if(typeof grid[i] == "undefined")
                        grid[i] = new Array(9);
                    for(var j = 0; j < 9; j++)  {
                        grid[i][j] = " ";
                    }
                }
            }
            /*var reInitGrid = function(grid) {
                for(var i = 0; i < grid.length; i++) {
                    for(var j = 0; j < 9; j++)  {
                        grid[i][j] = 0;
                    }
                }
            }*/
            function getNewUnusedSet() {
                var unUsed = new Set();
                for(var i = 1; i < 10; i++) {
                    unUsed.add(i);
                }
                return unUsed;
            }
            var sudokuSolBuilder = function(row, col, unUsed)    {
                if(row == 9)    {
                    flag = true;
                    return;
                }
                
                while(unUsed.size != 0)   {
                    var x = getRandomInt(9);
                    while(!unUsed.has(x) || !valid(row, col, x)) {
                        if(unUsed.size == 0)  {
                            solGrid[row][col] = " ";
                            return;
                        }
                        if(!valid(row, col, x) && unUsed.has(x))   {
                            unUsed.delete(x);
                        }
                        x = getRandomInt(9);
                    }
                    unUsed.delete(x);
                    var nextRow = col == 8?row+1:row;
                    var nextCol = col == 8?0:col+1;
                    solGrid[row][col] = x;
                    sudokuSolBuilder(nextRow, nextCol, getNewUnusedSet());
                    if(flag)   {
                        return;
                    }
                }
            }
            var valid = function(row, col, val)    {
                for(var i = 0; i < 9; i++)  {
                    if(solGrid[i][col]==val)
                    return false;
                }
                for(var i = 0; i < 9; i++)  {
                    if(solGrid[row][i]==val)
                    return false;
                }
                var startRow = Math.floor(row/3)*3;
                var startCol = Math.floor(col/3)*3;
                for(var x = startRow; x < startRow+3; x++)  {
                    for(var y = startCol; y < startCol+3; y++)  {
                        if(solGrid[x][y] == val)
                            return false;
                    }
                }
                return true;
            }
            var sudokuQuesBuilder = function()  {
                var diff = 25;
                for(var i = 0; i < 30; i++) {
                    var currRow = getRandomInt(9)-1;
                    var currCol = getRandomInt(9)-1;
                    while(quesGrid[currRow][currCol] != " ")  {
                    currRow = getRandomInt(9)-1;
                    currCol = getRandomInt(9)-1;
                    }
                    quesGrid[currRow][currCol] = solGrid[currRow][currCol];
                }
                console.log(quesGrid);
            }
            var buildSudokuGridData = function(grid) {

                var str = new String("");
                str += "<table>";
                for(var i = 0;i < 9; i++)   {
                    str += "<tr>";
                    for(var j = 0; j < 9; j++)  {
                        str += "<td>";
                        str += grid[i][j];
                        str += "</td>";
                    }
                    str += "</tr>";
                }
                str += "</table>";
                return str;
            }
            var printQuesGrid = function()  {
                var data = document.getElementById("sudokuGridPara");
                console.log(data.innerHTML);
                data.innerHTML = buildSudokuGridData(quesGrid);
                console.log(data.innerHTML);
            }
            var printSolGrid = function()    {
                var data = document.getElementById("sudokuGridPara");
                console.log(data.innerHTML);
                data.innerHTML = buildSudokuGridData(solGrid);
                console.log(data.innerHTML);
            }
            var init = function(){
                flag = false;
                initGrid(solGrid);
                initGrid(quesGrid);
                sudokuSolBuilder(0, 0, getNewUnusedSet());
                sudokuQuesBuilder();
                printQuesGrid();
            }
            var initSolution = function()   {
                printSolGrid();
            }
            
            var clicker = function()    {
                //console.log("button clicked");
                init();
                setTimeout(initSolution, 2000);
            }
            var buttonElement ;
            function init2()  {
                buttonElement = document.getElementById("button1");
                buttonElement.addEventListener("click", clicker);
            }
            setTimeout(init2,1);