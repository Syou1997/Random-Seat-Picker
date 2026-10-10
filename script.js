
// ========================================
// 座席ランダム指名システム
// ========================================

// 座席数
const TOTAL_SEATS = 20;

// HTML要素を取得
const seatGrid = document.getElementById("seatGrid");
const drawButton = document.getElementById("drawButton");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");
const counter = document.getElementById("counter");

// 指名済みの座席
let selectedSeats = [];

// 現在選ばれている座席
let currentSeat = null;


// ========================================
// 座席を作成
// ========================================

function createSeats() {

  seatGrid.innerHTML = "";

  for (let i = 1; i <= TOTAL_SEATS; i++) {

    const seat = document.createElement("div");

    seat.classList.add("seat");

    seat.id = `seat-${i}`;

    seat.textContent = String(i).padStart(2, "0");

    seatGrid.appendChild(seat);
  }
}


// ========================================
// ランダム指名
// ========================================

function drawSeat() {

  // 指名可能な座席を取得
  const availableSeats = [];

  for (let i = 1; i <= TOTAL_SEATS; i++) {

    if (!selectedSeats.includes(i)) {
      availableSeats.push(i);
    }
  }

  // 全員指名済みの場合
  if (availableSeats.length === 0) {

    result.textContent =
      "すべての座席の指名が終了しました。";

    drawButton.disabled = true;

    return;
  }

  // 前回の黄色表示を解除
  if (currentSeat !== null) {

    const previousSeat = document.getElementById(
      `seat-${currentSeat}`
    );

    previousSeat.classList.remove("selected");
  }

  // ランダムに座席を選択
  const randomIndex = Math.floor(
    Math.random() * availableSeats.length
  );

  const chosenSeat = availableSeats[randomIndex];

  // 指名履歴に追加
  selectedSeats.push(chosenSeat);

  currentSeat = chosenSeat;

  // 選ばれた座席を黄色に変更
  const seatElement = document.getElementById(
    `seat-${chosenSeat}`
  );

  seatElement.classList.add("selected");

  // 結果を表示
  result.textContent =
    `抽選結果：${chosenSeat}番の座席`;

  // 指名済み人数を表示
  counter.textContent =
    `指名済み：${selectedSeats.length} / ${TOTAL_SEATS}席`;

  // 全席指名済みなら抽選終了
  if (selectedSeats.length === TOTAL_SEATS) {

    drawButton.disabled = true;
  }
}


// ========================================
// リセット
// ========================================

function resetSeats() {

  selectedSeats = [];

  currentSeat = null;

  createSeats();

  result.textContent =
    "「抽選」を押してください。";

  counter.textContent =
    `指名済み：0 / ${TOTAL_SEATS}席`;

  drawButton.disabled = false;
}


// ========================================
// ボタン操作
// ========================================

// 抽選ボタン
drawButton.addEventListener("click", drawSeat);

// リセットボタン
resetButton.addEventListener("click", resetSeats);


// ========================================
// Enterキーで抽選
// ========================================

document.addEventListener("keydown", function(event) {

  // Enterキー以外は無視
  if (event.key !== "Enter") {
    return;
  }

  // 日本語入力の変換確定中は無視
  if (event.isComposing || event.repeat) {
    return;
  }

  // ボタンへのフォーカスによる二重実行を防止
  event.preventDefault();

  // 抽選可能な場合のみ実行
  if (!drawButton.disabled) {
    drawSeat();
  }

});


// ========================================
// 初期化
// ========================================

createSeats();
