const Attack_Value=10;
const Monster_Attack_Value=13;
const Strong_Attack=30;
const Heal_Value=12;
const Log_Event_player_Attack="Player Attack";
const Log_Event_Strong_Player_Attack="Player Strong Attack";
const Log_Event_Monster_Attack="Monster Attack";
const Log_Event_Player_Heal="Player Heal";
const Log_Event_GameOver="Game_Over";

const entervalue=prompt("enter max value","100");
let chosenMaxLife=parseInt(entervalue);
if(isNaN(chosenMaxLife) || chosenMaxLife<=0){
    chosenMaxLife=100; 
}
let currentPlayerHealth=chosenMaxLife;
let currentMonsterHealth=chosenMaxLife;
let bonusHealth=true;
adjustHealthBars(chosenMaxLife);
let battlelog=[];


function writeToLog(event,value,monsterHealth,playerHealth){
    let logentry;
    if(event===Log_Event_player_Attack) {
     logentry={
         event:event,
         value:value,
         target:"Monster",
         finalMonsterHealth:monsterHealth,
         finalPlayerHealth:playerHealth
     };   
    }else if(event===Log_Event_Strong_Player_Attack){
        logentry={
         event:event,
         value:value,
         target:"Monster",
         finalMonsterHealth:monsterHealth,
         finalPlayerHealth:playerHealth
     }; 
    }else if(event===Log_Event_Monster_Attack){
        logentry={
         event:event,
         value:value,
         target:"PLayer",
         finalMonsterHealth:monsterHealth,
         finalPlayerHealth:playerHealth
     }; 
}else if(event===Log_Event_Player_Heal){
    logentry={
         event:event,
         value:value,
         target:"Monster",
         finalMonsterHealth:monsterHealth,
         finalPlayerHealth:playerHealth
     }; 
}else if(event===Log_Event_GameOver){
    logentry={
         event:event,
         value:value,
         finalMonsterHealth:monsterHealth,
         finalPlayerHealth:playerHealth
     }; 
}
battlelog.push(logentry);
}



    
function reset(){
    currentPlayerHealth=chosenMaxLife;
     currentMonsterHealth=chosenMaxLife;
    resetGame(chosenMaxLife);   
}




function endround(){ 
    const initialvalue=currentPlayerHealth
    const playerdamage=dealPlayerDamage(Monster_Attack_Value)
    currentPlayerHealth-=playerdamage;
    writeToLog(
    Log_Event_Monster_Attack,
        playerdamage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    if(currentPlayerHealth<=0 && bonusHealth){
     bonusHealth=false;
        removeBonusLife();
        currentPlayerHealth=initialvalue;
        setPlayerHealth(initialvalue);
        alert("bonus is used")
    }
    if(currentMonsterHealth<=0 && currentPlayerHealth>0){
        alert("you won");
         writeToLog(
    Log_Event_GameOver,
        "player Won!",
        currentMonsterHealth,
        currentPlayerHealth
    );
       reset();
    }
    else if(currentPlayerHealth<=0 && currentMonsterHealth>0){
        alert("you lost");
        writeToLog(
    Log_Event_GameOver,
        "Monster Won!",
        currentMonsterHealth,
        currentPlayerHealth
    );
        reset();
    }
    else if(currentMonsterHealth<=0 && currentPlayerHealth<=0){
     alert("draw match");  
        writeToLog(
    Log_Event_GameOver,
        "Draw Mtach!",
        currentMonsterHealth,
        currentPlayerHealth
    );
        reset();
    } 
}




function attack(mode){
    let maxdamage;
    let logevent;
    if(mode==="Attack"){
    maxdamage=Attack_Value;
    logevent=Log_Event_player_Attack;
    }
    else if(mode="Strong_Attack"){
     maxdamage=Strong_Attack;
    logevent=Log_Event_Strong_Player_Attack;
    }
     const damage=dealMonsterDamage(maxdamage)
    currentMonsterHealth-=damage;
    writeToLog(
    logevent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endround();
    
}



function attackhandler(){
attack("Attack");
}


function strongAttackHandler(){
    attack("Strong_Attack");  
}


function healPlayer(){
    let healvalue;
    if(currentPlayerHealth>=chosenMaxLife-Heal_Value){
    alert("you can not heal more than max value");
        healvalue=chosenMaxLife-currentPlayerHealth;
    }
    else{
         healvalue=Heal_Value;
    }
increasePlayerHealth(healvalue);
    currentPlayerHealth+=healvalue;
    writeToLog(
    Log_Event_Player_Heal,
       healvalue,
        currentMonsterHealth,
        currentPlayerHealth
    );
endround();
}


function printLogHandler(){
    console.log(battlelog);
    
}


attackBtn.addEventListener('click',attackhandler); 
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayer);
logBtn.addEventListener('click',printLogHandler);