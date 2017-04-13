import React, { Component } from 'react';
import './App.css';

// {rowMovement, columnMovement}
const directions = [
  [-1,-1],
  [-1,0],
  [-1,1],
  [0,-1],
  [0,1],
  [1,-1],
  [1,0],
  [1,1],
]

const testMineFieldBitMap = [
  [1,0,0,1,0],
  [1,0,0,0,0],
  [0,0,1,0,0],
  [0,0,0,1,0],
  [1,0,0,0,0],
]

export const generateCoordinateValidator = (height, width) => (y,x) => {
  return (y >= 0 && y < height) && (x >= 0 && x < width)
}


export const generateMineFieldObjects = (mineFieldBitMap) => {
  const height = mineFieldBitMap.length
  const width = mineFieldBitMap[0].length
  const validateCoordinate = generateCoordinateValidator(height, width)

  const mineFieldObjects = []

  mineFieldBitMap.forEach((row, rowIndex) => {
    const mineFieldObjectsRow = []

    row.forEach((value, columnIndex) => {
      let bombsNearby = 0
      const isBomb = mineFieldBitMap[rowIndex][columnIndex]
      if(!isBomb) {
        bombsNearby = directions.reduce((totalBombs, direction) => {
          const rowProbeIndex = rowIndex+direction[0]
          const columnProbeIndex = columnIndex+direction[1]
          const isValidDirection = validateCoordinate(rowProbeIndex,columnProbeIndex)
          if(!isValidDirection) {
            return totalBombs
          }
          return totalBombs + mineFieldBitMap[rowProbeIndex][columnProbeIndex]
        }, 0)
      }
      mineFieldObjectsRow.push({bombsNearby, isBomb, isHidden: true, isFlagged: false})
    })

    mineFieldObjects.push(mineFieldObjectsRow)
  })

  return mineFieldObjects
}

class App extends Component {
  state = {
    mineField: generateMineFieldObjects(testMineFieldBitMap)
  }

  revealCell = (row, column) => () => {
    const newMineField = [...this.state.mineField]
    newMineField[row][column].isHidden = false;

    this.setState({ mineField: newMineField })
  }
  render() {
    return (
      <div className="App">
        {this.state.mineField.map((row, index) => <MineRow row={row} key={index} rowIndex={index} revealCell={this.revealCell} />)}
      </div>
    );
  }
}

const MineRow = ({row, rowIndex, revealCell}) => {
  return (
    <div className="mineRow">
      {row.map((cell, index) => <MineCell cell={cell} key={index} revealCell={revealCell} rowIndex={rowIndex} columnIndex={index} />)}
    </div>
  )
}

export const MineCell = ({cell, revealCell, rowIndex, columnIndex}) => {
  return (
    <div onClick={revealCell(rowIndex, columnIndex)} className={`mineCell ${cell.isHidden ? "hidden" : "revealed"}`}>
      {cell.isHidden ? (cell.isFlagged  ? <i className="fa fa-flag" aria-hidden="true"></i> : '') : (cell.bombsNearby ? cell.bombsNearby : <i className="fa fa-bomb" aria-hidden="true"></i>)}
    </div>
  )
}



export default App;
