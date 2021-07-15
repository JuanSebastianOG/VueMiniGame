const app = Vue.createApp({
  data() {
    return { 
      playerHealt: 100,
      monsterHealt: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  methods:{
    startGame(){
      this.playerHealt = 100;
      this.monsterHealt = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = []
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealt -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = Math.floor(Math.random() * (12 - 8)) + 8;
      this.playerHealt -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);

    },
    specialAttack(){
      this.currentRound++;
      const attackValue = Math.floor(Math.random() * (25 - 10)) + 10;
      this.playerHealt -= attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);

    },
    healPlayer(){
      const healValue = Math.floor(Math.random() * (20 - 8)) + 8;
      if(this.playerHealt + healValue >100){
        this.playerHealt = 100
      } else{
        this.playerHealt += healValue
      }
      this.addLogMessage('player', 'heal', healValue);

      this.attackPlayer();
    },
    surrender(){
      this.winner = 'monster'
    },
    addLogMessage(who, what, value){
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  },
  computed:{
    playerHealtStyles(){
      if (this.playerHealt < 0){
        return {width: '0%'};

      }
      return {width: this.playerHealt + '%'};
    },
    monsterHealtStyles(){
      if (this.monsterHealt < 0){
        return {width: '0%'};
      }
      return {width: this.monsterHealt + '%'};
    },
    mayUseSpecialAttack(){
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playerHealt(value){
      if (value <=0 && this.monsterHealt <= 0){
        this.winner = 'draw'
      }else if (value <= 0){
        this.winner = 'monster'

      }
    },
    monsterHealt(value){
      if (value <=0 && this.playerHealt <= 0){
        this.winner = 'draw'

      }else if (value <= 0){
        this.winner = 'player'

      }
    }
  } 
});
app.mount('#game');