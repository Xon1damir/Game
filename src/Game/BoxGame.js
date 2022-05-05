import react from "react";
import "./style/BoxGame.css";

var colors = ["white", "black", "red", "green", "blue", "yellow"];
class BoxGame extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen_id: 0,
      colored_boxes: [],
    };
    this.boxClickHandler = this.boxClickHandler.bind(this);
    this.insertRandomBoxes = this.insertRandomBoxes.bind(this);
    this.check = this.check.bind(this);
  }

  check() {}
  insertRandomBoxes(numberOfBoxes) {
    let randomBoxes = this.state.colored_boxes;
    for (let i = 0; i < numberOfBoxes; i++) {
      // finding free box id
      let randomId = Math.floor(Math.random() * 81);
      let findColoredBox = this.findColoredBox(randomId);
      while (findColoredBox) {
        randomId = Math.floor(Math.random() * 81);
        findColoredBox = this.findColoredBox(randomId);
      }

      // insert new box
      randomBoxes.push({
        id: randomId,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    // updating the state
    this.setState({
      colored_boxes: randomBoxes,
    });
  }
  boxClickHandler(id) {
    let box2 = this.findColoredBox(id);
    let new_colored_boxes = this.state.colored_boxes;
    let new_chosen_id = box2 ? id : 0;

    // moving the box
    if (this.isMoveable(this.state.chosen_id, id)) {
      let box1 = this.findColoredBox(this.state.chosen_id);

      this.insertRandomBoxes(5);
      this.check();
      new_chosen_id = 0;

      new_colored_boxes = new_colored_boxes.map((box, _) => {
        if (box.id == box1.id) {
          return {
            ...box,
            id: id,
          };
        } else if (box2 && box.id == box2.id) {
          return {
            ...box,
            id: this.state.chosen_id,
          };
        }
        return box;
      });
    }

    // updating the state
    this.setState({
      colored_boxes: new_colored_boxes,
      chosen_id: new_chosen_id,
    });
  }
  isMoveable(index1, index2) {
    let number = 9;
    if (!index1 || !index2) return false;

    if (index2 == index1 + 1 && index1 % number !== 0) return true;

    if (index2 == index1 - 1 && index2 % number !== 0) return true;

    if (index1 == index2 + 9) return true;

    if (index1 == index2 - 9) return true;

    return false;
  }
  findColoredBox(id) {
    let box = this.state.colored_boxes.filter((colored_box, j) => {
      return colored_box.id == id;
    })[0];
    return box;
  }
  componentDidMount() {
    this.insertRandomBoxes(5);
  }
  render() {
    let boxes = [];
    for (let i = 0; i < 81; i++) {
      let box = this.findColoredBox(i + 1);
      if (box) {
        boxes.push(
          <Box
            id={box.id}
            color={box.color}
            handleClick={this.boxClickHandler}
            chosen_id={this.state.chosen_id}
          />
        );
      } else {
        boxes.push(
          <Box id={i + 1} color="default" handleClick={this.boxClickHandler} />
        );
      }
    }
    return (
      <div className="box-game-container">
        <div className="game-area">{boxes}</div>
      </div>
    );
  }
}

const Box = (props) => {
  let selectChosenStyle = "";
  if (props.chosen_id == props.id) {
    selectChosenStyle = "chosen";
  }
  return (
    <div
      className={"box " + props.color + " " + selectChosenStyle}
      id={"box" + props.id}
      onClick={() => {
        props.handleClick(props.id);
      }}
    >
      <div className="circle"></div>
    </div>
  );
};

export default BoxGame;
