import { Console, Random } from "@woowacourse/mission-utils";

class App {
  async play() {
    const nameInput = await Console.readLineAsync("..."); // 사용자가 차 이름을 입력받는 부분
    const carNames = nameInput.split(",").map((name) => name.trim()) // ,으로 구분했는데 ,을 기준으로 배열을 만들어줌

      if (carNames.some((name) => name.length === 0 || name.length > 5)) { // 차 이름 유효성 검사
        throw new Error("[ERROR] 자동차 이름은 1자 이상 5자 이하만 가능합니다.");
      }

      const tryCountInput = await Console.readLineAsync( // 비동기 : 사용자 입력
          "시도할 횟수는 몇 회인가요?\n"
      );
      const tryCount = Number(tryCountInput);

      if (isNaN(tryCount) || tryCount <= 0) { // 숫자 유효성 검사
        throw new Error("[ERROR] 시도 횟수는 1 이상의 숫자여야 합니다.");
      }

      const carPositions = {};
      for (let i = 0; i < carNames.length; i++) {
        carPositions[carNames[i]] = 0; // 각 자동차의 초기 위치 설정
      }

      Console.print("\n실행 결과");

      for (let i = 0; i < tryCount; i++) {
        for (let j = 0; j < carNames.length; j++) {
          const carName = carNames[j];
          const random = Random.pickNumberInRange(0, 9); // 전진 조건
          if (random >= 4) {
            carPositions[carName]++;
          }
        }

        for (let j = 0; j < carNames.length; j++) { // 얼마나 전진했는지 나타냄
          const name = carNames[j];
          const moves = "-".repeat(carPositions[name]) // 지금까지 전진한 횟수, 시각화하기 위해 "-" 사용
          Console.print(`${name} : ${moves}`);
        }

        Console.print(""); // 줄바꿈
      }

      const max = Math.max(...Object.values(carPositions)); // carPositions 값을 배열로 만들어 가장 큰 값을 max에 저장
      const winners = carNames.filter((name) => carPositions[name] === max); // 자동차 이름 배열 돌면서 최대 위치와 같은 것을 골라냄
      Console.print(`최종 우승자 : ${winners.join(", ")}`);
    } catch (error) {
      Console.print(error.message); // 최종 우숭자 메시지 출력
    }
}

export default App;
