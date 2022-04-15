import react from "react";
import "./style/BoxGame.css";

var colors = ["white", "black", "red", "green", "blue", "yellow"];
class BoxGame extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen_id: 0,
      colored_boxes: [
        {
          id: Math.floor(Math.random() * 81),
          color: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          id: Math.floor(Math.random() * 81),
          color: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          id: Math.floor(Math.random() * 81),
          color: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          id: Math.floor(Math.random() * 81),
          color: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          id: Math.floor(Math.random() * 81),
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ],
    };
    this.selectChosen = this.selectChosen.bind(this);
  }
  selectChosen(id) {
    this.setState({
      chosen_id: id,
    });
  }
  render() {
    let boxes = [];
    for (let i = 0; i < 81; i++) {
      let box = this.state.colored_boxes.filter((colored_box, j) => {
        return colored_box.id == i + 1;
      })[0];
      if (box) {
        boxes.push(
          <Box
            id={box.id}
            color={box.color}
            handleClick={this.selectChosen}
            chosen_id={this.state.chosen_id}
          />
        );
      } else {
        boxes.push(
          <Box id={i + 1} color="default" handleClick={this.selectChosen} />
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
