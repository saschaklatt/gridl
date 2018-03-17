import gridl from '../index';
import {
    setValueAt,
    subtractPositions,
    index2pos,
    flatten,
    unflatten,
    addPositions,
    getValueAt,
    countRows,
    countColumns,
} from '../utils';

const _getAreaAt = (data, columns, rows, position, size, anchor = [0,0]) => {
    const posTmp = subtractPositions(position, anchor);
    const end = [
        Math.min(posTmp[0] + size[0], columns),
        Math.min(posTmp[1] + size[1], rows),
    ];
    const pos = [
        Math.max(0, posTmp[0]),
        Math.max(0, posTmp[1]),
    ];
    const area = [];
    for (let r = pos[1]; r < end[1]; r++) {
        const rArea = r - pos[1];
        if (!area[rArea]) {
            area[rArea] = [];
        }
        for (let c = pos[0]; c < end[0]; c++) {
            const cArea = c - pos[0];
            area[rArea][cArea] = getValueAt(data, columns, [c, r]);
        }
    }
    return area;
};

const _checkAreaFitsAt = (columns, rows, position, area, anchor = [0,0]) => {
    const pos = subtractPositions(position, anchor);
    const fitsHorizontally = pos[0] >= 0 && pos[0] + area[0].length <= columns;
    const fitsVertically = pos[1] >= 0 && pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
};

const _setAreaAt = (data, columns, rows, position, area, anchor = [0,0]) => {
    const pos = subtractPositions(position, anchor);
    area.forEach((row, r) => {
        const targetPos = [0, r + pos[1]];
        if (targetPos[1] >= rows) {
            return;
        }
        row.forEach((cell, c) => {
            targetPos[0] = c + pos[0];
            if (targetPos[0] >= columns) {
                return;
            }
            setValueAt(data, columns, rows, targetPos, cell);
        });
    });
    return data;
};

const _validateAreaMember = member => member === undefined || typeof member === 'number';

const _validateAreaDescription = areaDescription => {
    if (areaDescription.length > 6) {
        throw new Error('Invalid area description: too many fields');
    }
    const [_columns = 0, _rows = 0, _x = 0, _y = 0, _ax = 0, _ay = 0] = areaDescription;
    if (!_validateAreaMember(_columns)) {
        throw new Error('Invalid area description: column is not a number');
    }
    if (!_validateAreaMember(_rows)) {
        throw new Error('Invalid area description: row is not a number');
    }
    if (!_validateAreaMember(_x)) {
        throw new Error('Invalid area description: x is not a number');
    }
    if (!_validateAreaMember(_y)) {
        throw new Error('Invalid area description: y is not a number');
    }
    if (!_validateAreaMember(_ax)) {
        throw new Error('Invalid area description: anchorX is not a number');
    }
    if (!_validateAreaMember(_ay)) {
        throw new Error('Invalid area description: anchorY is not a number');
    }
    if (_columns && _columns < 0) {
        throw new Error('Invalid area description: columns cannot be negative');
    }
    if (_rows && _rows < 0) {
        throw new Error('Invalid area description: rows cannot be negative');
    }
};

const _contains = (inner, outer) => {
    const size1   = [inner[0] || 0, inner[1] || 0];
    const pos1    = [inner[2] || 0, inner[3] || 0];
    const anchor1 = [inner[4] || 0, inner[5] || 0];
    const innerStart = subtractPositions(pos1, anchor1);
    const innerEnd   = addPositions(innerStart, size1);

    const size2   = [outer[0] || 0, outer[1] || 0];
    const pos2    = [outer[2] || 0, outer[3] || 0];
    const anchor2 = [outer[4] || 0, outer[5] || 0];
    const outerStart = subtractPositions(pos2, anchor2);
    const outerEnd   = addPositions(outerStart, size2);

    return (
        innerEnd[0]   <= outerEnd[0]   &&
        innerStart[0] >= outerStart[0] &&
        innerEnd[1]   <= outerEnd[1]   &&
        innerStart[1] >= outerStart[1]
    );
};

export default function(instance, state) {

    const area = areaDescription => {
        _validateAreaDescription(areaDescription);

        // input values
        const [_columns = 0, _rows = 0, _x = 0, _y = 0, _ax = 0, _ay = 0] = areaDescription;
        const _position = [_x, _y];
        const _anchor = [_ax, _ay];
        const _size = [_columns, _rows];

        // calculated values
        const data = _getAreaAt(state.data, state.columns, state.rows, _position, _size, _anchor);
        const columns = countColumns(data);
        const rows = countRows(data);
        const size = [columns, rows];

        // area api
        const subgrid = gridl(data);
        const api = {
            numRows: () => rows,
            numColumns: () => columns,
            size: () => size,
            position: () => _position,
            anchor: () => _anchor,
            localToGlobal: (localPosition) => addPositions(api.position(), localPosition),
            valueAt: function(localPosition, value) {
                return arguments.length > 1 ?
                    subgrid.valueAt(localPosition, value) :
                    subgrid.valueAt(localPosition);
            },
            data: function(value) {
                if (arguments.length > 0) {
                    const _newColumns = countColumns(value);
                    const _newRows = countRows(value);
                    if (_newRows !== rows || _newColumns !== columns) {
                        throw new Error('New area data has an invalid size.');
                    }
                    subgrid.data(value);
                    return api;
                }
                return subgrid.data();
            },
            apply: () => {
                _setAreaAt(state.data, state.columns, state.rows, _position, subgrid.data(), _anchor);
                return instance;
            },
            parent: () => instance,
            reduce: function(callback, initialValue) {
                const reducer = (acc, v, i) => {
                    const local = index2pos(i, columns);
                    return callback(acc, v, local, api);
                };
                return arguments.length < 1 ?
                    flatten(data).reduce(reducer) :
                    flatten(data).reduce(reducer, initialValue);
            },
            map: function(callback, thisArg) {
                const mapper = function(v, i) {
                    const local = index2pos(i, columns);
                    return callback.call(this, v, local, api);
                };
                // TODO: looks too complicated (flatten -> unflatten)
                const newData = arguments.length < 2 ?
                    flatten(data).map(mapper) :
                    flatten(data).map(mapper, thisArg);
                // return a copy with the new data
                return area(areaDescription).data(unflatten(newData, columns, rows));
            },
            fill: (callbackOrValue, thisArg) => {
                if (typeof callbackOrValue === 'function') {
                    subgrid.fill((v, pos) => callbackOrValue.call(thisArg, v, pos, api));
                }
                else {
                    subgrid.fill(callbackOrValue);
                }
                return api;
            },
            find: (callbackOrValue, thisArg) => {
                if (typeof callbackOrValue === 'function') {
                    return subgrid.find((v, pos) => callbackOrValue.call(thisArg, v, pos, api));
                }
                return subgrid.find(v => v === callbackOrValue);
            },
            description: () => [columns, rows, _x, _y, _ax, _ay],
            isInside: otherAreaDescription => {
                _validateAreaDescription(otherAreaDescription);
                return _contains(api.description(), otherAreaDescription);
            },
            contains: otherAreaDescription => {
                _validateAreaDescription(otherAreaDescription);
                return _contains(otherAreaDescription, api.description());
            },
        };
        return api;
    };

    return {
        methods: { area },
    };
}
