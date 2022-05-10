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

  check(box) {
    // bosilgan boxning rangi va idsini bilib olish
    let color = box.color;
    let id = box.id;
    // surilgan boxni keyingisining color va idsini bilib olish
    let nextBox = this.findColoredBox(id + 1);
    let nextColor = nextBox.color;
    let nextId = nextBox.id;
    // surilgan boxni undan oldingisining color va idsini bilib olish
    let oldBox = this.findColoredBox(id - 1);
    let oldColor = oldBox.color;
    let oldId = oldBox.id;
    // surilgan boxning tepasini color va idsini   bilib olish
    let topBox = this.findColoredBox(id - 9);
    let topColor = topBox.color;
    let topId = topBox.id;
    // surilgan boxning pastgi qismini color va idsini bilib olish
    let bottomBox = this.findColoredBox(id + 9);
    let bottomColor = bottomBox.color;
    let bottomId = bottomBox.id;
    console.log(nextId + " bitaa keyingining idsi");
    console.log(oldId + " bitta oldingining idsi");

    // surilgan boxning colorini undan keyingisining colori bilan tekshirish
    if (color == nextColor) {
      let nextBox2 = this.findColoredBox(nextId + 1);
      let nextColor2 = nextBox2.color;
      let nextId2 = nextBox2.id;
      console.log(nextId2 + " 2 ta keyingisining idsi");
      // Agar shart bajarilsa, surilgan boxning colorini undan 2 keyingisining colori bilan tekshirish
      if (nextColor2 == color) {
        // Agar shart bajarilsa alert chiqadi, chiqmasa else if shartiga o'tib ketadi
        alert("O'ng tomondan 3 ta bir xil rang");
      }
    } // surilgan boxning colorni undan oldingi boxning colori bilan tekshirish
    else if (color == oldColor) {
      // surilgan boxdan 2-ta oldingi boxni colori va idsini bilib olish
      let oldBox2 = this.findColoredBox(oldId - 1);
      let oldColor2 = oldBox2.color;
      let oldId2 = oldBox2.id;
      console.log(oldId2 + " 2 ta oldingisining id si");
      // Agar shart bajarilsa, surilgan boxning colorini undan 2 ta oldingi boxning colori bilan tekshirish
      if (color == oldColor2) {
        //Agar shart bajarilsa alert chiqadi
        alert("Chap tomondan 3-ta bir xil rang");
      }
    } else if (color == topColor) {
      // Agar shart bajarilsa, surilgan boxning 2-ta tepadagi boxning colori va idsini bilib olish
      let topBox2 = this.findColoredBox(topId - 9);
      let topColor2 = topBox2.color;
      let topId2 = topBox2.id;
      if (color == topColor2) {
        //Agar shart bajarilsa alert chiqadi
        alert("Tepadan 3-ta bir xil rang");
      }
    } else if (color == bottomColor) {
      // Agar shart bajarilsa, surilgan boxning 2-ta pastdagi boxning colori va idsini bilib olish
      let bottomBox2 = this.findColoredBox(bottomId + 9);
      let bottomColor2 = bottomBox2.color;
      let bottomId2 = bottomBox2.id;
      if (color == bottomColor2) {
        // Agar shart bajarilsa, alert chiqadi
        alert("Bottom 3-ta bir xil rang");
      }
    }

    // keyingi o'ngdagi boxni topaman

    // topilgan boxni colorini color bn solishtiraman

    // agar o'xshash bo'lsa:
    // undan kngi o'ngdagi boxni olaman
    // undan kngi o'ngdagi boxni colorini solishtiraman
    // agar o'xshash bo'lsa (3 ta box bir xil degani): console log qilaman
    // o'xshash bo'lmasa, chapga qarab boshlayman
    // undan oldingi chap tomondagi boxni olaman
    //
  }
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
    this.check(box2);
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
