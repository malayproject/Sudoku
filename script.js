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
                    while(!unUsed.has(x) || !valid(solGrid, row, col, x)) {
                        if(unUsed.size == 0)  {
                            solGrid[row][col] = " ";
                            return;
                        }
                        if(!valid(solGrid, row, col, x) && unUsed.has(x))   {
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
            var valid = function(grid, row, col, val)    {
                for(var i = 0; i < 9; i++)  {
                    if(grid[i][col]==val)
                    return false;
                }
                for(var i = 0; i < 9; i++)  {
                    if(grid[row][i]==val)
                    return false;
                }
                var startRow = Math.floor(row/3)*3;
                var startCol = Math.floor(col/3)*3;
                for(var x = startRow; x < startRow+3; x++)  {
                    for(var y = startCol; y < startCol+3; y++)  {
                        if(grid[x][y] == val)
                            return false;
                    }
                }
                return true;
            }
            var sudokuQuesBuilder = function()  {
                var diff = 77;
                for(var i = 0; i < diff; i++) {
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
                var unfilledCells = [];
                var str = new String("");
                str += "<table>";
                for(var i = 0;i < 9; i++)   {
                    str += '<tr class="row">';
                    for(var j = 0; j < 9; j++)  {
                        if(grid[i][j] == " ")   {
                            str += '<td id="c'+i+''+j+' class="cell">';
                            str += '<input id="c'+i+''+j+'ip" class="cellIp">';
                            unfilledCells.push([i, j]);
                        }
                        else{
                            str += '<td class="cell">';
                            str += grid[i][j];
                        }
                        
                        str += "</td>";
                    }
                    str += "</tr>";
                }
                str += "</table>";
                return [str, unfilledCells];    
            }
            var unfilledCellsContains = function(unfilledCells, i, j)  {
                for(var k = 0; k < unfilledCells.length; k++)   {
                    if(unfilledCells[k][0] == i && unfilledCells[k][1] == j)    {
                        return true;
                    }
                }
                return false;
            }
            var eventListenerAdder = function(unfilledCells)    {
                for(var i = 0; i < unfilledCells.length; i++)   {
                    var elementId = "c"+unfilledCells[i][0]+""+unfilledCells[i][1]+"ip";
                    cellInputElement = document.getElementById(elementId);
                    cellInputElement.addEventListener("input", checkInput.bind(event, cellInputElement, unfilledCells[i]));
                }
            }
            var checkInput = function(cellInputElement, currUnfilledCell)    {
                var inputVal = cellInputElement.value;
                var row = currUnfilledCell[0];
                var col = currUnfilledCell[1];
                if(isNaN(inputVal) || inputVal == 0) {
                    cellInputElement.value = "";
                    return;
                }
                if(valid(quesGrid, row, col, inputVal)) {
                    cellInputElement.value = inputVal;
                    
                }
                else    {
                    cellInputElement.value = "";
                }
                // printQuesGrid();
            }
            var printQuesGrid = function()  {
                var data = document.getElementById("sudokuGridPara");
                console.log(data.innerHTML);
                var quesGridData = buildSudokuGridData(quesGrid);
                data.innerHTML = quesGridData[0];
                eventListenerAdder(quesGridData[1]);
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
                setTimeout(initSolution, 300000);
            }
            var buttonElement ;
            function init2()  {
                buttonElement = document.getElementById("button1");
                buttonElement.addEventListener("click", clicker);
            }
            setTimeout(init2,1);