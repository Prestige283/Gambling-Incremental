function setup() {
  currentRoll=-1;
  currentName="Placeholder";
  currentRarity=0;
  currentRollLuck=0;
  tempCurrentRollLuck=0;
  luck=1;
  raritySum=0;
  displaySize=0;
  inventoryPos=20;
  createCanvas(1350, 700);
  // [name,rarity,color,amount]
  rarities=
    [["Common",1,[128,128,128],0],
    ["Uncommon",2,[64,192,64],0],
    ["Rare",4,[64,64,220],0],
    ["Epic",8,[100,40,200],0],
    ["Legendary",16,[255,150,0],0],
    ["Mythical",32,[230,20,20],0],
    ["Infinity",64,[255,200,0],0],
    ["Eternity",128,[64,0,128],0],
    ["Reality",256,[0,100,0],0],
    ["Absolute",512,[255,0,128],0]];
  function raritySumCalculations(luck){
    tempRaritySum=0;
    for (var i=0;i<rarities.length;i++){
      tempRaritySum+=Math.pow(rarities[i][1],(-1/luck));
    }
    return tempRaritySum
  };
  keyReleased = function(){
    // Check for rolls
    if (key === 'Enter') {
      displaySize=0;
      raritySum=raritySumCalculations(luck);
      currentRollLuck=Math.random()*raritySum;
      tempCurrentRollLuck=currentRollLuck;
      for (var i=0;i<rarities.length;i++){
        if (0<tempCurrentRollLuck && tempCurrentRollLuck<Math.pow(rarities[i][1],(-1/luck))){
          currentRoll=i;
          rarities[i][3]+=1;
        };
        tempCurrentRollLuck-=Math.pow(rarities[i][1],(-1/luck));
      };
    };
  };
  function getRollData(n){
    currentName=rarities[n][0];
    currentRarity=rarities[n][1];
    fill(rarities[n][2][0],rarities[n][2][1],rarities[n][2][2]);
  };
  function displayInventory(){
    textSize(20)
    textAlign("left");
    inventoryPos=20;
    for (var i=0;i<rarities.length;i++){
      if (rarities[i][3]!=0){
        fill(255,255,255);
        text(rarities[i][3]+"x",10,inventoryPos);
        fill(rarities[i][2][0],rarities[i][2][1],rarities[i][2][2]);
        text(rarities[i][0],40+10*Math.floor(Math.log10(rarities[i][3])),inventoryPos);
        inventoryPos+=20
      };
    };
  };
  draw = function() {
    background(0,0,0);
    fill(255,255,255);
    textSize(50);
    textAlign("center");
    text("You Rolled:",650,100)
    if (currentRoll!=-1){
      getRollData(currentRoll);
    }else{
      fill(255,255,255);
    };
    textSize(2*displaySize);
    text(currentName,650,200);
    textSize(displaySize);
    displaySize=40-(40-displaySize)*0.9
    text("Rarity: "+currentRarity,650,250);
    //text(String(currentRollLuck),650,300);
    displayInventory();
  };
};