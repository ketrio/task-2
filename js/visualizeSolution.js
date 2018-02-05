(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция-генератор пошаговой визуализации алгоритма
     * 
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел 
     */
    function* stepGenerator(map) {
        const visited = map.map(row => row.map(() => false));
    
        function* dfsTrace(i, j, firstCall) {
            const between = (left, right, x) => left <= x && x < right;         
    
            if (
                !between(0, map.length, i) 
                || !between(0, map[0].length, j)
                || visited[i][j]
                || (map[i][j] === WATER && !firstCall)
            ) {
                return; 
            }
            if (map[i][j] === WATER) {
                return yield ({i, j, cell: WATER, inc: false});
            }
            yield ({i, j, cell: ISLAND, inc: firstCall})            
            visited[i][j] = true;
            neighbors = [
                {i: i - 1, j},
                {i: i + 1, j},
                {i, j: j + 1},
                {i, j: j - 1},
            ];
            for (let neighbor of neighbors) {
                yield* dfsTrace(neighbor.i, neighbor.j, false);
            }
        }
        
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                yield* dfsTrace(i, j, true);
            }
        }
    }

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution() {
        const generator = stepGenerator(root.SHRI_ISLANDS.MAP);
        const map = root.SHRI_ISLANDS.MAP.map(row => row.map(() => undefined));        
        let count = 0;

        const interval = setInterval(() => {
            data = generator.next();
            if (data.done)  {
                return clearInterval(interval);
            }

            map[data.value.i][data.value.j] = data.value.cell;
            if (data.value.inc) count++;

            document.querySelector('.outer').innerHTML = '';
            document.querySelector('.outer').appendChild(
                root.SHRI_ISLANDS.render(map, count)
            );
        }, 200);
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
