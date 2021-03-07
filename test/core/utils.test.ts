import {getIntersectingArea} from "../../src/core/utils";

describe("utils", () => {
    describe("getIntersectingArea", () => {
        it("returns the intersecting area", () => {
            const area1 = {columnCount: 5, rowCount: 5, x: 0, y: 0};
            const area2 = {columnCount: 3, rowCount: 3, x: 2, y: 1};

            expect(getIntersectingArea(area1, area2)).toEqual({columnCount: 3, rowCount: 3, x: 2, y: 1});
            expect(getIntersectingArea(area2, area1)).toEqual({columnCount: 3, rowCount: 3, x: 2, y: 1});
        });

        it("ignores values outside the grid", () => {
            const area1 = {columnCount: 5, rowCount: 5, x: 0, y: 0};
            const area2 = {columnCount: 3, rowCount: 3, x: 3, y: 3};

            expect(getIntersectingArea(area1, area2)).toEqual({columnCount: 2, rowCount: 2, x: 3, y: 3});
            expect(getIntersectingArea(area2, area1)).toEqual({columnCount: 2, rowCount: 2, x: 3, y: 3});
        });
    });
});
