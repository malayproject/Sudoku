            var grid = new Array(9);
            var flag = false;
            function getRandomInt(maxExcl)  {
                return 1+Math.floor(Math.random()*Math.floor(maxExcl));
            }
            var initGrid = function(grid)   {
                for(var i = 0; i < grid.length; i++) {
                    grid[i] = new Array(9);
                    for(var j = 0; j < 9; j++)  {
                        grid[i][j] = 0;
                    }
                }
            }
            function getNewUnusedSet() {
                var unUsed = new Set();
                for(var i = 1; i < 10; i++) {
                    unUsed.add(i);
                }
                return unUsed;
            }
            var sudokuBuilder = function(grid, row, col, unUsed)    {
                if(row == 9)    {
                    flag = true;
                    return;
                }
                
                while(unUsed.size != 0)   {
                    var x = getRandomInt(9);
                    while(!unUsed.has(x) || !valid(grid, row, col, x)) {
                        if(unUsed.size == 0)  {
                            grid[row][col] = 0;
                            return;
                        }
                        if(!valid(grid, row, col, x) && unUsed.has(x))   {
                            unUsed.delete(x);
                        }
                        x = getRandomInt(9);
                    }
                    unUsed.delete(x);
                    var nextRow = col == 8?row+1:row;
                    var nextCol = col == 8?0:col+1;
                    grid[row][col] = x;
                    sudokuBuilder(grid, nextRow, nextCol, getNewUnusedSet());
                    if(flag)   {
                        return;
                    }
                }
            }
            var valid = function(a, row, col, val)    {
                for(var i = 0; i < 9; i++)  {
                    if(a[i][col]==val)
                    return false;
                }
                for(var i = 0; i < 9; i++)  {
                    if(a[row][i]==val)
                    return false;
                }
                var startRow = Math.floor(row/3)*3;
                var startCol = Math.floor(col/3)*3;
                for(var x = startRow; x < startRow+3; x++)  {
                    for(var y = startCol; y < startCol+3; y++)  {
                        if(a[x][y] == val)
                            return false;
                    }
                }
                return true;
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
            var printGrid = function()    {
                var data = document.getElementById("sudokuGridPara");
                console.log(data.innerHTML);
                data.innerHTML = buildSudokuGridData(grid);
                console.log(data.innerHTML);
            }
            var init = function(){
                initGrid(grid);
                sudokuBuilder(grid, 0, 0, getNewUnusedSet());
                printGrid();
            }
            setTimeout(init, 1);