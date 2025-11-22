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
  inventoryLuckBoost=1;
  tempInventoryLuckBoost=0;
  temp=0;
  // [name,rarity,color,amount]
  rarities=
    [["Common",1,[128,128,128],0],
    ["Uncommon",3,[64,192,64],0],
    ["Rare",9,[64,64,220],0],
    ["Epic",27,[100,40,200],0],
    ["Legendary",81,[255,150,0],0],
    ["Mythical",243,[230,20,20],0],
    ["Infinity",729,[255,200,0],0],
    ["Eternity",2187,[64,0,128],0],
    ["Reality",6561,[0,100,0],0],
    ["Absolute",19683,[255,0,128],0],

    ["Ruby",1000,[255,50,50],0],
    ["Sapphire",1000,[50,50,255],0],
    ["Emerald",1000,[50,255,0],0],
    ["Diamond",3000,[30,255,255],0],
    ["Gold",2500,[220,220,0],0],
    ["Platinum",10000,[150,150,150],0],
    ["Titanium",10000,[150,170,170],0],
    ["Topaz",600,[128,80,0],0],
    ["Quartz",500,[220,220,220],0],
    ["Opal",700,[0,255,150],0],
    ["Iron",150,[180,180,180],0],
    ["Cobalt",175,[0,135,200],0],
    ["Silver",200,[180,180,180],0],
    ["Tin",100,[180,180,150],0],
    ["Aluminum",125,[220,220,200],0],
    ["Corrupted",666,[120,0,0],0]];
  function sortRarityList(){
    for (var i=0;i<rarities.length;i++){
      for (var j=0;j<rarities.length-1;j++){
        if (rarities[j][1]>rarities[j+1][1]){
          temp=rarities[j]
          rarities[j]=rarities[j+1]
          rarities[j+1]=temp
        }
      }
    }
  }
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
    inventoryPos=50;
    for (var i=0;i<rarities.length;i++){
      if (rarities[i][3]!=0){
        fill(255,255,255);
        text(rarities[i][3]+"x",10,inventoryPos);
        fill(rarities[i][2][0],rarities[i][2][1],rarities[i][2][2]);
        text(rarities[i][0]+" (Rarity: "+String(rarities[i][1])+")",40+10*Math.floor(Math.log10(rarities[i][3])),inventoryPos);
        inventoryPos+=20
      };
    };
    fill(255,255,255)
    text("Your inventory is boosting luck by x"+String(Math.round(inventoryLuckBoost*10000)/10000),10,20);
  };  
  function updateInventoryLuck(){
    tempInventoryLuckBoost=0;
    for (var i=0;i<rarities.length;i++){
      tempInventoryLuckBoost+=Math.pow(rarities[i][3],0.5);
    };
    inventoryLuckBoost=1+(Math.pow(tempInventoryLuckBoost,0.5)/1000)
    return inventoryLuckBoost
  };
  draw = function() {
    createCanvas(window.innerWidth-20,window.innerHeight-20);
    scale(min(window.innerWidth/1350,window.innerHeight/800));
    background(0,0,0);
    fill(255,255,255);
    sortRarityList();
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
    updateInventoryLuck();
    luck=inventoryLuckBoost;
    displayInventory();
  };
};