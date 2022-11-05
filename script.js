//This version tries to incorporate some of the bonus features.
//This section creates the hero and the enemies.
class Hero {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}

const hero1 = new Hero(10, 5, 0.9);
//Tweaked the properties to speed up game play (since there could be several more enemies to face.)

class Enemy {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}

const makeEnemy = () => {
  let hullValue = randomNumber(3, 7);
  let firepowerValue = randomNumber(2, 5);
  let accuracyValue = randomNumber(6, 9) / 10;
  newEnemy = new Enemy(hullValue, firepowerValue, accuracyValue);
};

let newEnemyFleet = [];

let numberOfEnemies = randomNumber(3, 10)

for (let i = 1; i < numberOfEnemies + 1; i++) {
  makeEnemy();
  newEnemyFleet.push(newEnemy);
}

let currentEnemy = newEnemyFleet[0];

let enemyCounter = 0;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

alert(
  "Earth is under attack by " + numberOfEnemies + " alien ships.  You must destroy the first one before you can face the others in turn. Use the Attack button to begin. Click the Retreat button at any time if this hero stuff ain't for you."
);

// //This section creates the attack-counterattack mechanism.
const attackButton = document.getElementById("attack");

const retreatButton = document.getElementById("retreat");

attackButton.addEventListener("click", (e) => {
  attack(hero1, currentEnemy);
});

retreatButton.addEventListener("click", (e) => {
  alert("Game over.  Say hello to your alien overlords.");
});

function attack(attacker, defender) {
  if (Math.random() < attacker.accuracy) {
    alert("Your shot missed. Enemy is counterattacking!");
    counterattack(defender, attacker);
  } else {
    defender.hull = defender.hull - attacker.firepower;
    if (defender.hull > 0) {
      alert(
        "You scored a hit, but the enemy ship survived. And it's counterattacking!"
      );
      counterattack(defender, attacker);
    } else {
      enemyCounter += 1;
      if (enemyCounter < numberOfEnemies) {
        currentEnemy = newEnemyFleet[enemyCounter];
        alert(
          "Enemy ship destroyed! Now you can attack the next one."
        );
      } else {
        alert("You destroyed the final ship!  Nice work!");
      }
    }
  }
}

function counterattack(defender, attacker) {
  if (Math.random() < defender.accuracy) {
    alert("The enemy's shot missed.  Your turn to attack!");
  } else {
    attacker.hull = attacker.hull - defender.firepower;
    if (attacker.hull > 0) {
      alert("You were hit, but the damage wasn't fatal.  Your turn to attack!");
    } else {
      alert("Your ship was destroyed.  Too bad, so sad.");
    }
  }
}
