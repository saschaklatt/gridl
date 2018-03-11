import gridl from '../index';
import {
    setValueAt,
    subtractPositions,
    index2pos,
    flatten,
    addPositions,
    isValidPositionFormat, getValueAt,
} from '../utils';
import {expect} from 'chai';

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

const _reduceAreaAt = (api, data, columns, rows, position, size, callback, initialValue, hasInitialValue) => {
    if (!isValidPositionFormat(position)) {
        throw new Error('Trying to reduce an area at an invalid position.');
    }
    if (!isValidPositionFormat(size)) {
        throw new Error('Trying to reduce an area with invalid size.');
    }
    const reducer = (acc, v, i) => {
        const local = index2pos(i, size[0]);
        const global = addPositions(local, position);
        return callback(acc, v, global, api);
    };
    const flattenedArea = flatten(_getAreaAt(data, columns, rows, position, size));
    return hasInitialValue ? flattenedArea.reduce(reducer) : flattenedArea.reduce(reducer, initialValue);
};

export default function(instance, state) {

    const area = areaDescription => {
        const [columns = 0, rows = 0, x = 0, y = 0, ax = 0, ay = 0] = areaDescription;
        const api = {
            numRows: () => rows,
            numColumns: () => columns,
            size: () => [columns, rows],
            position: () => [x, y],
            anchor: () => [ax, ay],
            localToGlobal: (localPosition) => addPositions(api.position(), localPosition),
            valueAt: (localPosition) => {
                // TODO: validate localPosition to have a valid position format
                const areaPosition = api.position();
                const areaSize = api.size();
                const areaAnchor = api.anchor();
                const data = _getAreaAt(state.data, state.columns, state.rows, areaPosition, areaSize, areaAnchor);
                return gridl(data).valueAt(localPosition);
            },
        };
        return api;
    };

    return {
        methods: { area },
    };
}
