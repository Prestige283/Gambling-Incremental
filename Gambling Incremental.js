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
  temp2=0;
  //inventory luck boost
  //[amount,description,effect,effect#,[[rarity,cost],[rarity,cost]]]
  upgrades=[[0,"Improves inventory boost","^",1,[[2,1],[1,2],[0,3]]]];
  upgradeScroll=0;
  projectedUpgradeScroll=0;
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
    ["Corrupted",666,[120,0,0],0],
  
    ["Solar",5000,[255,190,0],0],
    ["Lunar",5000,[150,50,255],0],
    ["Eclipse",25000,[150,75,0],0],
    ["Celestial",50000,[100,255,255],0],
    ["Vortex",35000,[75,0,150],0],
  
    ["Air",4000,[130,200,230],0],
    ["Fire",4000,[255,100,0],0],
    ["Water",4000,[0,100,255],0],
    ["Earth",4000,[50,150,50],0],
    ["Light",16000,[255,255,100],0],
    ["Darkness",16000,[70,50,90],0],
    ["Steam",8000,[190,200,200],0],
    ["Sand",8000,[180,180,50],0],
    ["Magma",8000,[180,0,0],0],
    ["Mud",8000,[100,50,0],0],
    ["Ice",8000,[150,200,200],0],
    ["Void",100000,[80,80,80],0]];
  
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

  mouseReleased = function(){
    //upgrade scroll buttons
    if (mouseInRange(1175,10,1225,60)){
      projectedUpgradeScroll-=1;
    };
    if (mouseInRange(1175,740,1225,790)){
      projectedUpgradeScroll+=1;
    };
    //upgrades
    for (var i=0;i<3;i++){
      if (mouseInRange(1100,80+220*i,1300,280+220*i) && i+projectedUpgradeScroll<upgrades.length && i+projectedUpgradeScroll>-1){
        attemptPurchase(i+projectedUpgradeScroll);
      };
    };
  };

  function attemptPurchase(upgradeNum){
    if (canPurchase(upgradeNum)){
      for (var i=0;i<upgrades[upgradeNum][4].length;i++){
        rarities[upgrades[upgradeNum][4][i][0]][3]-=upgrades[upgradeNum][4][i][1];
      };
      upgrades[upgradeNum][0]+=1;
    };
  };

  function canPurchase(upgradeNum){
    temp=true
    for (var i=0;i<upgrades[upgradeNum][4].length;i++){
      if (rarities[upgrades[upgradeNum][4][i][0]][3]<upgrades[upgradeNum][4][i][1]){
        temp=false
      };
    };
    return temp
  }

  function updateCostsAndEffects(){
    //upgrade 1
    upgrades[0][3]=Math.round(Math.pow(upgrades[0][0]+1,0.5)*1000)/1000;
    upgrades[0][4]=[];
    temp=1;
    temp2=upgrades[0][0];
    for (var i=0;i<3;i++){
      upgrades[0][4].push([temp2+2-i,Math.floor(temp)]);
      temp+=1;
      temp*=Math.pow(1.2,Math.pow(upgrades[0][0],0.5));
    };
    while (temp2>0){
      temp2-=Math.pow(upgrades[0][0],0.5);
      if (Math.floor(temp2)>=0){
        upgrades[0][4].push([Math.floor(temp2),Math.floor(temp)]);
      };
      temp+=1;
      temp*=Math.pow(1.2,Math.pow(upgrades[0][0],0.5));
    };
  };

  function mouseInRange(x1,y1,x2,y2){
    return (mouseX/min(window.innerWidth/1350,window.innerHeight/800)<x2&&mouseX/min(window.innerWidth/1350,window.innerHeight/800)>x1&&mouseY/min(window.innerWidth/1350,window.innerHeight/800)<y2&&mouseY/min(window.innerWidth/1350,window.innerHeight/800)>y1)
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
    inventoryLuckBoost=Math.pow(1+(Math.log10(tempInventoryLuckBoost+1)/100),upgrades[0][3])
    return inventoryLuckBoost
  };

  function displayUpgrades(){
    //upgrades
    for (var i=0;i<upgrades.length;i++){
      if (220*(i-upgradeScroll)<660 && 220*(i-upgradeScroll)>-220){
        fill(0,0,0);
        if (canPurchase(i)){
          stroke(0,255,0);
        }else{
          stroke(255,0,0);
        }
        strokeWeight(5);
        rect(1100,80+220*(i-upgradeScroll),200,200);
        noStroke();
        fill(255,255,255);
        textAlign("center");
        textSize(15);
        text(upgrades[i][1],1200,110+220*(i-upgradeScroll));
        text(upgrades[i][2]+String(upgrades[i][3]),1200,130+220*(i-upgradeScroll));
        textSize(10);
        textAlign("left");
        for (var j=0;j<upgrades[i][4].length;j++){
          fill(255,255,255);
          text(upgrades[i][4][j][1]+"x",1120,140+10*j+220*(i-upgradeScroll));
          fill(rarities[Number(upgrades[i][4][j][0])][2][0],rarities[Number(upgrades[i][4][j][0])][2][1],rarities[Number(upgrades[i][4][j][0])][2][2])
          text(rarities[Number(upgrades[i][4][j][0])][0],1140,140+10*j+220*(i-upgradeScroll));
        };
      };
    };
    fill(0,0,0);
    rect(1095,-500,210,575);
    rect(1095,725,210,575);
    fill(128,128,128);
    rect(1175,10,50,50);
    rect(1175,740,50,50);
    upgradeScroll=(9*upgradeScroll+projectedUpgradeScroll)/10
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
    displayUpgrades();
    updateCostsAndEffects();
  };
};