import React from 'react';
import ReactDOM from 'react-dom';
import App, { generateCoordinateValidator, generateMineFieldObjects } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('#generateCoordinateValidator', () => {
  const validateCoordinate = generateCoordinateValidator(3, 3)
  it('detects underflowed y', () => {
    expect(validateCoordinate(-1,1)).toEqual(false)
  })
  it('detects underflowed x', () => {
    expect(validateCoordinate(1,-1)).toEqual(false)
  })
  it('detects underflowed x & y', () => {
    expect(validateCoordinate(-1,-1)).toEqual(false)
  })
  it('detects overflowed y', () => {
    expect(validateCoordinate(4,1)).toEqual(false)
  })
  it('detects overflowed x', () => {
    expect(validateCoordinate(1,4)).toEqual(false)
  })
  it('detects overflowed x & y', () => {
    expect(validateCoordinate(4,4)).toEqual(false)
  })
  it('succeeds on inbounds coordinate', () => {
    expect(validateCoordinate(2,2)).toEqual(true)
  })
})

describe('#generateMineFieldObjects', () => {
  it('generates a correct 2x2', () => {
    const testMineFieldBitMap = [
      [1,0],
      [0,1],
    ]
    const expectedObjects = [
      [{bombsNearby: 0, isBomb: 1, isHidden: true},{bombsNearby: 2, isBomb: 0, isHidden: true}],
      [{bombsNearby: 2, isBomb: 0, isHidden: true},{bombsNearby: 0, isBomb: 1, isHidden: true}],
    ]

    expect(generateMineFieldObjects(testMineFieldBitMap)).toEqual(expectedObjects)
  })
  it('generates a correct 5x5', () => {
    const testMineFieldBitMap = [
      [0,0,0,0,0],
      [0,1,1,0,0],
      [0,1,0,0,0],
      [0,0,0,1,0],
      [0,0,0,0,0],
    ]
    const expectedObjects = [
      [{bombsNearby: 1, isBomb: 0, isHidden: true},{bombsNearby: 2, isBomb: 0, isHidden: true},{bombsNearby: 2, isBomb: 0, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true},{bombsNearby: 0, isBomb: 0, isHidden: true}],
      [{bombsNearby: 2, isBomb: 0, isHidden: true},{bombsNearby: 0, isBomb: 1, isHidden: true},{bombsNearby: 0, isBomb: 1, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true},{bombsNearby: 0, isBomb: 0, isHidden: true}],
      [{bombsNearby: 2, isBomb: 0, isHidden: true},{bombsNearby: 0, isBomb: 1, isHidden: true},{bombsNearby: 4, isBomb: 0, isHidden: true},{bombsNearby: 2, isBomb: 0, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true}],
      [{bombsNearby: 1, isBomb: 0, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true},{bombsNearby: 2, isBomb: 0, isHidden: true},{bombsNearby: 0, isBomb: 1, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true}],
      [{bombsNearby: 0, isBomb: 0, isHidden: true},{bombsNearby: 0, isBomb: 0, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true},{bombsNearby: 1, isBomb: 0, isHidden: true}],
    ]

    expect(generateMineFieldObjects(testMineFieldBitMap)).toEqual(expectedObjects)
  })
})
