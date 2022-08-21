import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "./sortingAlgorithms/Mergesort";
import { getBubbleSortAnimations } from "./sortingAlgorithms/BubbleSort";
import { getInsertionSortAnimations } from "./sortingAlgorithms/InsertionSort";
import { getQuickSortAnimations } from "./sortingAlgorithms/QuickSort";
import { getSelectionSortAnimations } from "./sortingAlgorithms/SelectionSort";
import { getHeapSortAnimations } from "./sortingAlgorithms/HeapSort";

import "bootstrap/dist/css/bootstrap.css";

// Animations Speed
const ANIMATION_SPEED_MS = 1.5; // merge sort
const ANIMATION_SPEED_BS = 1; // bubble sort
const ANIMATION_SPEED_IS = 1; // insertion sort
const ANIMATION_SPEED_QS = 1.25; // quick sort
const ANIMATION_SPEED_SS = 1.5; // selection sort
const ANIMATION_SPEED_HS = 1; // heap sort

// Initial color of the array bars.
const PRIMARY_COLOR = "#756454";

// Color of Array bars being compared
const SECONDARY_COLOR = "#ff0000";

// After all the bars in the sorted orders
const SUCCESS_COLOR = "#046327";

// Color for the sorted bars
const SORTED_BAR_COLOR = "#7a76e8";

// Color for the single bars for comparison with the other bar of different color (for quick sort)
const SINGLE_BAR_COLOR = "#a7fa00";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isFinished: false,
      quickSort: false,
      mergeSort: false,
      heapSort: false,
      bubbleSort: false,
      insertionSort: false,
      selectionSort: false,
      size: 200,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  componentDidUpdate(prevprops, prevState) {
    if (
      prevState.quickSort !== this.state.quickSort &&
      this.state.quickSort === true
    )
      this.quickSort();
    if (
      prevState.bubbleSort !== this.state.bubbleSort &&
      this.state.bubbleSort === true
    )
      this.bubbleSort();
    if (
      prevState.mergeSort !== this.state.mergeSort &&
      this.state.mergeSort === true
    )
      this.mergeSort();
    if (
      prevState.insertionSort !== this.state.insertionSort &&
      this.state.insertionSort === true
    )
      this.insertionSort();
    if (
      prevState.selectionSort !== this.state.selectionSort &&
      this.state.selectionSort === true
    )
      this.selectionSort();
    if (
      prevState.heapSort !== this.state.heapSort &&
      this.state.heapSort === true
    )
      this.heapSort();

    //to render the real time size
    if (prevState.size !== this.state.size) this.resetArray();
  }


  resetArray() {
    const array = [];
    //to stop all timeout on the page
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }

    // Generate array
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < this.state.size; i++) {
      array.push(randomIntFromInterval(10,700));
    }

    // Reset color to initial
    for (let j = 0; j < arrayBars.length; j++) {
      const barOneStyle = arrayBars[j].style;
      barOneStyle.backgroundColor = PRIMARY_COLOR;
    }

    this.setState({
      array,
      isFinished: false,
      quickSort: false,
      mergeSort: false,
      heapSort: false,
      bubbleSort: false,
      insertionSort: false,
      selectionSort: false
    });
  }


  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // Giving the animation after all the array bars will be in the sorted order
    // giving success color to the array bar
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length * ANIMATION_SPEED_MS + 400);

    // Managing the state
    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        mergeSort: false,
      });
    }, animations.length * ANIMATION_SPEED_MS + 500);
  }


  quickSort() {
    const animations = getQuickSortAnimations(this.state.array, 0, this.state.array.length-1);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SINGLE_BAR_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_QS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = SORTED_BAR_COLOR;
          barTwoStyle.backgroundColor = SORTED_BAR_COLOR;
          barOneStyle.height = `${animations[i][3]}px`;
          barTwoStyle.height = `${animations[i][2]}px`;
        }, i * ANIMATION_SPEED_QS);
      }
    }


    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length + ANIMATION_SPEED_QS + 400);


    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        quickSort: false,
      });
    }, animations.length * ANIMATION_SPEED_QS + 500);
  }


  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_HS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          barOneStyle.height = `${animations[i][3]}px`;
          barTwoStyle.height = `${animations[i][2]}px`;
        }, i * ANIMATION_SPEED_HS);
      }
    }


    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length * ANIMATION_SPEED_HS + 400);

    
    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        heapSort: false,
      });
    }, animations.length * ANIMATION_SPEED_MS + 500);
  }


  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_SS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = SORTED_BAR_COLOR;
          barOneStyle.height = `${animations[i][3]}px`;
          barTwoStyle.height = `${animations[i][2]}px`;
        }, i * ANIMATION_SPEED_SS);
      }
    }

    
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length + ANIMATION_SPEED_SS + 400);

    
    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        selectionSort: false,
      });
    }, animations.length * ANIMATION_SPEED_SS + 500);

  }


  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_IS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = SINGLE_BAR_COLOR;
          barTwoStyle.backgroundColor = SORTED_BAR_COLOR;
          barOneStyle.height = `${animations[i][3]}px`;
          barTwoStyle.height = `${animations[i][2]}px`;
        }, i * ANIMATION_SPEED_IS);
      }
    }

    
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length + ANIMATION_SPEED_IS + 400);

    
    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        insertionSort: false,
      });
    }, animations.length * ANIMATION_SPEED_IS + 500);
  }


  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SINGLE_BAR_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR; 
        }, i * ANIMATION_SPEED_BS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR; // PRIMARY_COLOR
          barTwoStyle.backgroundColor = PRIMARY_COLOR; // PRIMARY_COLOR
          barOneStyle.height = `${animations[i][3]}px`;
          barTwoStyle.height = `${animations[i][2]}px`;
        }, i * ANIMATION_SPEED_BS);
      }
    }

    //Now the array is sorted and now giving the animations of success color
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length + ANIMATION_SPEED_BS + 400);

    //managing the state
    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        bubbleSort: false,
      });
    }, animations.length * ANIMATION_SPEED_BS + 500);
  }

  //Change size of array 
  handleChange = (event) => {
    //to allow only numbers
    const arraySize = event.target.value.replace(/\D/, "");
    this.setState({
      size: arraySize <= 400 ? arraySize : 400, //to limit the size
    });
  };

  render() {
    const { array } = this.state;

    return (
      <>
        {/* ------------------Array bars------------------ */}
        <div className="container-fluid">
          <div
            className="row no-gutters pt-4 mt-2 w-100 d-flex align-items-end"
            style={{ minHeight: "90vh" }}
          >
            <div className="col-12 pb-2">
              {array.map((value, idx) => (
                <div
                  className="array-bar"
                  key={idx}
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                    marginBottom: 0,
                    paddingBottom: 0,
                    width: `${29 / this.state.size}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row no-gutters">
            {/* Input form to give the array size */}
            <div className="col-md-3 d-flex align-items-center">
              <input
                id="array size"
                name="size"
                value={this.state.size}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                aria-describedby="array size"
                placeholder="Array Size"
                disabled={
                  this.state.mergeSort ||
                  this.state.bubbleSort ||
                  this.state.insertionSort ||
                  this.state.quickSort ||
                  this.state.heapSort ||
                  this.state.selectionSort
                }
              />
              <small
                id="passwordHelpBlock"
                className="form-text text-muted ml-1 pt-1"
              >
                Maximum 400
              </small>
            </div>

            <div className="d-flex flex-row justify-content-evenly">
              <button
                className="btn btn-outline-success font-weight-bold ml-4"
                onClick={() => this.resetArray()}
              >
                Generate New Array
              </button>

              {/* ------------------Merge Sort------------------ */}
              {!this.state.mergeSort && (
                <button
                  className="btn btn-outline-success font-weight-bold ml-1"
                  onClick={() => {
                    this.setState({ mergeSort: true });
                  }}
                  disabled={
                    this.state.bubbleSort ||
                    this.state.insertionSort ||
                    this.state.quickSort ||
                    this.state.selectionSort ||
                    this.state.heapSort
                  }
                >
                  Merge Sort
                </button>
              )}{" "}
              {this.state.mergeSort && (
                <button
                  className="btn btn-outline-secondary font-weight-bold ml-1"
                  disabled={this.state.mergeSort}
                >
                  Merge Sort
                </button>
              )}

              {/* ------------------Quick Sort------------------ */}
              {!this.state.quickSort && (
                <button
                  className="btn btn-outline-success font-weight-bold ml-1"
                  onClick={() => {
                    this.setState({ quickSort: true });
                  }}
                  disabled={
                    this.state.mergeSort ||
                    this.state.bubbleSort ||
                    this.state.insertionSort ||
                    this.state.selectionSort ||
                    this.state.heapSort
                  }
                >
                  Quick Sort
                </button>
              )}{" "}
              {this.state.quickSort && (
                <button
                  className="btn btn-outline-secondary font-weight-bold ml-1"
                  disabled={this.state.quickSort}
                >
                  Quick Sort
                </button>
              )}

              {/* ------------------Heap Sort------------------ */}
              {!this.state.heapSort && (
                <button
                  className="btn btn-outline-success font-weight-bold ml-1"
                  onClick={() => {
                    this.setState({ heapSort: true });
                  }}
                  disabled={
                    this.state.mergeSort ||
                    this.state.bubbleSort ||
                    this.state.insertionSort ||
                    this.state.quickSort ||
                    this.state.selectionSort
                  }
                >
                  Heap Sort
                </button>
              )}{" "}
              {this.state.heapSort && (
                <button
                  className="btn btn-outline-secondary font-weight-bold ml-1"
                  disabled={this.state.heapSort}
                >
                  Heap Sort
                </button>
              )}
              
              {/* ------------------Selection Sort------------------ */}
              {!this.state.selectionSort && (
                <button
                  className="btn btn-outline-success font-weight-bold ml-1"
                  onClick={() => {
                    this.setState({ selectionSort: true });
                  }}
                  disabled={
                    this.state.mergeSort ||
                    this.state.bubbleSort ||
                    this.state.insertionSort ||
                    this.state.quickSort ||
                    this.state.heapSort
                  }
                >
                  Selection Sort
                </button>
              )}{" "}
              {this.state.selectionSort && (
                <button
                  className="btn btn-outline-secondary font-weight-bold ml-1"
                  disabled={this.state.selectionSort}
                >
                  Selection Sort
                </button>
              )}

              {/* ------------------Insertion Sort------------------ */}
              {!this.state.insertionSort && (
                <button
                  className="btn btn-outline-success font-weight-bold ml-1"
                  onClick={() => {
                    this.setState({ insertionSort: true });
                  }}
                  disabled={
                    this.state.mergeSort ||
                    this.state.bubbleSort ||
                    this.state.quickSort ||
                    this.state.heapSort ||
                    this.state.selectionSort
                  }
                >
                  Insertion Sort
                </button>
              )}{" "}
              {this.state.insertionSort && (
                <button
                  className="btn btn-outline-secondary font-weight-bold ml-1"
                  disabled={this.state.insertionSort}
                >
                  Insertion Sort
                </button>
              )}

              {/* ------------------Bubble Sort------------------ */}
              {!this.state.bubbleSort && (
                <button
                  className="btn btn-outline-success font-weight-bold ml-1"
                  onClick={() => {
                    this.setState({ bubbleSort: true });
                  }}
                  disabled={
                    this.state.mergeSort ||
                    this.state.insertionSort ||
                    this.state.quickSort ||
                    this.state.selectionSort ||
                    this.state.heapSort
                  }
                >
                  Bubble Sort
                </button>
              )}{" "}
              {this.state.bubbleSort && (
                <button
                  className="btn btn-outline-secondary font-weight-bold ml-1"
                  disabled={this.state.bubbleSort}
                >
                  Bubble Sort
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Generate Random number from range
const randomIntFromInterval = (min, max) => {
  //min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
