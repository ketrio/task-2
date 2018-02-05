(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        const visited = map.map(row => row.map(() => false));

        function dfs(i, j) {
            const allowed = (i, j) => map[i][j] === ISLAND && !visited[i][j];
            const between = (left, right, x) => left <= x && x < right;            
    
            if (
                !between(0, map.length, i) 
                || !between(0, map[0].length, j)
                || !allowed(i, j)
            ) {
                return 0; 
            }
            visited[i][j] = true;
            [
                {i: i - 1, j},
                {i: i + 1, j},
                {i, j: j + 1},
                {i, j: j - 1},
            ].forEach(isl => dfs(isl.i, isl.j));
            return 1;
        }

        return map.map((row, i) => row.reduce((acc, cur, j) => acc + dfs(i, j), 0))
            .reduce((acc, e) => acc += e);
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
