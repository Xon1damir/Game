import react from "react";
import "./style/BoxGame.css";
class BoxGame extends react.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let boxes = [];
    for (let i = 0; i < 81; i++) {
      boxes.push(<Box id={i} color={"default"} />);
    }
    return (
      <div className="box-game-container">
        <div className="game-area">{boxes}</div>
      </div>
    );
  }
}

const Box = (props) => {
  return (
    <div className={"box " + props.color} id={"box" + props.id}>
      <div className="circle"></div>
    </div>
  );
};

export default BoxGame;
