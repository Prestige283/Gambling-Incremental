function setup() {
  menu=0;
  menuMin=-2;
  menuMax=1;
  currentRoll=-1;
  currentName="Placeholder";
  currentRarity=0;
  currentRollLuck=0;
  currentSpecial=0;
  tempCurrentRollLuck=0;
  currentBulk=1;
  maxBulk=1;
  luck=1;
  raritySum=0;
  displaySize=0;
  inventoryPos=20;
  inventoryLuckBoost=1;
  powerLuckBoost=1;
  tempInventoryLuckBoost=0;
  temp=0;
  temp2=0;
  framesSinceRoll=0;
  rollCooldown=10;
  unlocks=0;
  unlockReq=[
    ["Rarity Downgrader",1.05],
    ["Automation",1.06],
    ["Empowered Rarities",1.075],
    ["N/A",100]]
  //statistics
  rolls=0;
  time=0;
  //[amount,description,effect,effect#,[[rarity/currency,cost],[rarity/currency,cost]]]
  upgrades=[
    [[0,"Improves inventory boost","^",1,[]],[0,"Improves max bulk","x",1,[]]],
    [],
    [],
    [[0,"Increase autoclicker speed","x",0,[]],[0,"Improve autoclicker luck","x",0.5,[]],[0,"Improve autoclicker bulk","x",1,[]]],
    [/*[0,"Decreases empowered exponent","^",2,[]]*/]
  ];
  currencies=[
    ["power",[255,192,0],0]
  ];
  upgradeScroll=0;
  projectedUpgradeScroll=0;
  inventoryScroll=0;
  projectedInventoryScroll=0;
  inventorySectionScroll=0;
  inventorySectionScrollMax=1;
  downgraderScroll=0;
  powerExtractorScroll=0;
  powerExtractorResult=[0,0];
  powerExtractorResultDisplaySize=0;
  ownedRarities=[];
  ownedEmpoweredRarities=[];
  framesSinceClick=0;
  framesSinceAutoRoll=0;
  newestUniqueRarity=0;
  newestUniqueRaritySize=0;
  // [name,rarity,color,amount,empowered amount]
  rarities=
    [["Common",1,[128,128,128],0,0],
    ["Uncommon",3,[64,192,64],0,0],
    ["Rare",9,[64,64,220],0,0],
    ["Epic",27,[100,40,200],0,0],
    ["Legendary",81,[255,150,0],0,0],
    ["Mythical",243,[230,20,20],0,0],
    ["Super",729,[0,255,255],0,0],
    ["Ascension",2187,[255,255,100],0,0],
    ["Universal",6561,[150,64,255],0,0],
    ["Absolute",19683,[255,0,128],0,0],

    ["Antimatter",12000,[192,255,0],0,0],
    ["Exotic Matter",14000,[50,200,50],0,0],
    ["Dark Matter",22000,[125,0,175],0,0],
    ["Anti-Exotic Matter",125000,[170,0,0],0,0],
    ["Anti-Dark Matter",135000,[0,100,200],0,0],
    ["Exotic Dark Matter",155000,[100,50,0],0,0],
    ["Anti-Exotic Dark Matter",450000,[200,255,255],0,0],
    ["Matter",1100000,[0,100,100],0,0],

    ["Amethyst",800,[192,64,255],0,0],
    ["Prismatic",3500,[0,255,128],0,0],
    ["Ruby",1000,[255,50,50],0,0],
    ["Sapphire",1000,[50,50,255],0,0],
    ["Emerald",1000,[50,255,0],0,0],
    ["Diamond",3000,[30,255,255],0,0],
    ["Gold",2500,[220,220,0],0,0],
    ["Platinum",10000,[150,150,150],0,0],
    ["Titanium",10000,[150,170,170],0,0],
    ["Lead",9000,[110,100,120],0,0],
    ["Topaz",600,[128,80,0],0,0],
    ["Quartz",500,[220,220,220],0,0],
    ["Crystal",900,[50,200,255],0,0],
    ["Opal",700,[0,255,150],0,0],
    ["Iron",150,[160,160,180],0,0],
    ["Cobalt",175,[0,135,200],0,0],
    ["Silver",200,[180,180,180],0,0],
    ["Tin",100,[180,180,150],0,0],
    ["Copper",75,[180,110,50],0,0],
    ["Aluminum",125,[220,220,200],0,0],
    ["Corrupted",666,[120,0,0],0,0],
  
    ["Solar",5000,[255,190,0],0,0],
    ["Lunar",5000,[150,50,255],0,0],
    ["Stardust",15000,[255,200,0],0,0],
    ["Eclipse",25000,[130,65,0],0,0],
    ["Celestial",50000,[100,255,255],0,0],
    ["Vortex",35000,[75,0,150],0,0],
  
    ["Air",4000,[130,200,230],0,0],
    ["Fire",4000,[255,100,0],0,0],
    ["Water",4000,[0,100,255],0,0],
    ["Earth",4000,[50,150,50],0,0],
    ["Light",16000,[255,255,100],0,0],
    ["Darkness",16000,[70,50,90],0,0],
    ["Steam",8000,[190,200,200],0,0],
    ["Sand",8000,[180,180,50],0,0],
    ["Magma",8000,[180,0,0],0,0],
    ["Mud",8000,[100,50,0],0,0],
    ["Ice",8000,[150,200,200],0,0],
    ["Void",100000,[80,80,80],0,0],
  
    ["Prestige",400,[0,180,255],0,0],
    ["Booster",1250,[150,100,220],0,0],
    ["Generator",1250,[160,255,160],0,0],
    ["Time",2000,[0,150,0],0,0],
    ["Enhance",2250,[220,0,250],0,0],
    ["Space",2000,[250,250,240],0,0],
    ["Super Booster",4500,[80,0,210],0,0],
    ["Super Generator",5500,[50,180,70],0,0],
    ["Quirks",12500,[250,0,200],0,0],
    ["Hinderance",17500,[160,80,0],0,0],
    ["Solarity",30000,[255,250,10],0,0],
    ["Subspace",30000,[230,240,240],0,0],
    ["Magic",75000,[250,80,220],0,0],
    ["Balance",75000,[250,250,150],0,0],
    ["Phantom Souls",110000,[200,160,240],0,0],
    ["Honor",175000,[240,220,0],0,0],
    ["Nebula",250000,[30,0,180],0,0],
    ["Hyperspace",250000,[230,230,250],0,0],
    ["Imperium",275000,[250,250,200],0,0],
    ["Mastery",1000000,[250,130,130],0,0],
    ["Gears",1250000,[160,150,140],0,0],
    ["Machine Parts",1500000,[150,120,90],0,0],
    ["Energy",1800000,[220,250,0],0,0],
    ["Neurons",1800000,[240,230,250],0,0],
    ["Robots",2300000,[100,180,200],0,0],
    ["Ideas",2200000,[250,230,40],0,0],
    ["AI",3000000,[160,200,140],0,0],
    ["Civilization",4500000,[220,200,250],0,0],

    ["Ducdat",20000,[50,50,200],0,0],
    ["Despacit",40000,[50,200,0],0,0],
    ["Demonin",60000,[200,180,0],0,0],

    ["Aarex",150000,[250,250,150],0,0],
    ["The Paper Pilot",350000,[0,250,120],0,0],
    ["Hevipelle",625000,[250,230,0],0,0],
    ["Acamaeda",1750000,[140,100,0],0,0],
    ["Jacorb",5000000,[128,0,255],0,0],

    ["Spaceon",12000000,[50,100,200],0,0],
    ["Solaris",13000000,[180,120,50],0,0],
    ["Infinity",15000000,[150,80,0],0,0],
    ["Eternity",14000000,[64,0,150],0,0],
    ["Reality",10000000,[30,150,30],0,0],
    ["Drigganiz",11000000,[110,0,110],0,0],

    ["Flamis",50000000,[255,128,0],0,0],
    ["Cranius",52000000,[255,0,255],0,0],
    ["Spectra",60000000,[192,128,255],0,0],
    ["Aqualon",58000000,[128,255,255],0,0],
    ["Nullum",56000000,[100,100,100],0,0],
    ["Quantron",54000000,[255,180,180],0,0]
    ];
  
  function updateOwnedRarities(){
    ownedRarities=[];
    ownedEmpoweredRarities=[];
    for (var i=0;i<rarities.length;i++){
      if(rarities[i][3]>0){
        ownedRarities.push(i);
      };
    };
    for (var i=0;i<rarities.length;i++){
      if(rarities[i][4]>0){
        ownedEmpoweredRarities.push(i);
      };
    };
  };
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
      roll(luck,maxBulk,1);
    };
  };

  function roll(rollLuck,rollBulk,manual){
    if (framesSinceRoll>=rollCooldown){
      if (manual==1){
        rolls+=1;
        framesSinceRoll=0;
      };
      displaySize=0;
      currentBulk=1+Math.round(Math.pow(Math.random(),5)*(rollBulk-1))
      raritySum=raritySumCalculations(rollLuck);
      currentRollLuck=Math.random()*raritySum;
      tempCurrentRollLuck=currentRollLuck;
      for (var i=0;i<rarities.length;i++){
        if (0<tempCurrentRollLuck && tempCurrentRollLuck<Math.pow(rarities[i][1],(-1/rollLuck))){
          currentRoll=i;
          if (Math.random()<1/(1+Math.pow(100*rarities[i][1],1/rollLuck))){
            currentSpecial=1;
          } else {
            currentSpecial=0;
          };
          if (rarities[i][3]+rarities[i][4]==0){
            newestUniqueRaritySize=39.999;
            newestUniqueRarity=currentRoll;
          };
          rarities[i][3+currentSpecial]+=currentBulk;
        };
        tempCurrentRollLuck-=Math.pow(rarities[i][1],(-1/rollLuck));
      };
    };
  };

  mouseReleased = function(){
    if(framesSinceClick>0){
      if (menu==0){
        //inventory scroll buttons
        if (mouseInRange(350,275,400,325)){
          projectedInventoryScroll-=1;
        };
        if (mouseInRange(350,375,400,425)){
          projectedInventoryScroll+=1;
        };
        //inventory section scroll buttons
        if (mouseInRange(300,325,350,375)&&inventorySectionScroll>=1){
          inventorySectionScroll-=1;
        };
        if (mouseInRange(400,325,450,375)&&inventorySectionScroll<inventorySectionScrollMax){
          inventorySectionScroll+=1;
        };
        //roll
        if (mouseInRange(600,325,700,425)){
          roll(luck,maxBulk,1);
        };
      } else if (menu==1) {
        //unlock
        if (mouseInRange(475,200,875,600)){
          if (luck>=unlockReq[unlocks][1]){
            unlocks+=1;
            menuMax+=1;
          };
        };
      } else if (menu==2) {
        //downgrader scroll buttons
        if (mouseInRange(25,325,75,375)&&downgraderScroll>0){
          downgraderScroll-=1;
        };
        if (mouseInRange(25,425,75,475)&&downgraderScroll<ownedRarities.length-2){
          downgraderScroll+=1;
        };
        //downgrade
        if (mouseInRange(100,250,400,550)){
          rarities[ownedRarities[downgraderScroll]][3]+=1;
          rarities[ownedRarities[downgraderScroll+1]][3]-=1;
        };
      } else if (menu==4) {
        //power extractor scroll buttons
        if (mouseInRange(25,325,75,375)&&powerExtractorScroll>0){
          powerExtractorScroll-=1;
        };
        if (mouseInRange(25,425,75,475)&&powerExtractorScroll<ownedEmpoweredRarities.length-1){
          powerExtractorScroll+=1;
        };
        //extract power
        if (mouseInRange(100,250,400,550)){
          powerExtractorResult=[round(1/Math.random()),round(1/Math.random())];
          powerExtractorResultDisplaySize=49.999;
          rarities[ownedEmpoweredRarities[powerExtractorScroll]][3]+=powerExtractorResult[1];
          rarities[ownedEmpoweredRarities[powerExtractorScroll]][4]-=1;
          currencies[0][2]+=powerExtractorResult[0];
        };
      };
      
      //menu scroll buttons
      if (mouseInRange(50,725,100,775)){
        if (menu>menuMin){
          menu-=1;
        };
      };
      if (mouseInRange(125,725,175,775)){
        if (menu<menuMax){
          menu+=1;
        };
      };
      //upgrades
      for (var i=0;i<3;i++){
        if (mouseInRange(1100,80+220*i,1300,280+220*i) && i+projectedUpgradeScroll<upgrades[menu].length && i+projectedUpgradeScroll>-1){
          attemptPurchase(i+projectedUpgradeScroll);
        };
      };
      //upgrade scroll buttons
      if (mouseInRange(1175,10,1225,60)){
        projectedUpgradeScroll-=1;
      };
      if (mouseInRange(1175,740,1225,790)){
        projectedUpgradeScroll+=1;
      };
      framesSinceClick=0;
    };
  };

  function attemptPurchase(upgradeNum){
    if (canPurchase(upgradeNum)){
      for (var i=0;i<upgrades[menu][upgradeNum][4].length;i++){
        rarities[upgrades[menu][upgradeNum][4][i][0]][3]-=upgrades[menu][upgradeNum][4][i][1];
      };
      upgrades[menu][upgradeNum][0]+=1;
    };
  };

  function canPurchase(upgradeNum){
    temp=true
    for (var i=0;i<upgrades[menu][upgradeNum][4].length;i++){
      if (rarities[upgrades[menu][upgradeNum][4][i][0]][3]<upgrades[menu][upgradeNum][4][i][1]){
        temp=false
      };
    };
    return temp
  };

  function displayRollButton(){
    fill(0,0,0);
    strokeWeight(5);
    stroke(180,180,180);
    textSize(12);
    textAlign("center");
    rect(600,325,100,100)
    noStroke();
    fill(180,180,180);
    text("Roll",650,350);
    text("(or press enter)",650,375)
  };

  function updateUpgrade(menu,upgradeNum,effect,effectRound,costBase,costAdd,costMult,typeAdd,typeMult,typeScale,prescaleLength,prescaleOffset){
    upgrades[menu][upgradeNum-1][3]=Math.round(effect*Math.pow(10,effectRound))/Math.pow(10,effectRound);
    upgrades[menu][upgradeNum-1][4]=[];
    temp=costBase;
    temp2=upgrades[menu][upgradeNum-1][0]*typeMult+typeAdd;
    if (prescaleLength>0){
      for (var i=0;i<prescaleLength;i++){
        upgrades[menu][upgradeNum-1][4].push([temp2+prescaleOffset,Math.floor(temp)]);
        temp+=costAdd;
        temp*=costMult;
        temp2-=1;
      };
    };
    while (temp2>0){
      temp2-=typeScale;
      if (Math.floor(temp2)>=0){
        upgrades[menu][upgradeNum-1][4].push([Math.floor(temp2),Math.floor(temp)]);
      };
      temp+=costAdd;
      temp*=costMult;
    };
  };

  function updateCostsAndEffects(){
    updateUpgrade(0,1,Math.pow(upgrades[0][0][0]+1,1/3),3,1,1,Math.pow(1.2,Math.pow(upgrades[0][0][0],0.5)),2,1,Math.pow(upgrades[0][0][0],0.5),3,0);
    updateUpgrade(0,2,Math.pow(upgrades[0][1][0]+1,1.2),0,Math.pow(upgrades[0][1][0]+1,0.5),1,Math.pow(1.4,Math.pow(upgrades[0][1][0],0.5)),-2,1,Math.pow(upgrades[0][1][0],0.5),1,5);
    updateUpgrade(3,1,Math.pow(upgrades[3][0][0],0.5)*0.5,3,Math.pow(upgrades[3][0][0]+1,2),0,2,Math.pow(upgrades[3][0][0],0.4)+1,0,1,0,0);
    updateUpgrade(3,2,Math.pow(upgrades[3][1][0],0.9)*0.01+0.5,3,1,1,1.1,1,2,Math.pow(upgrades[3][1][0],0.75),1,0);
    updateUpgrade(3,3,upgrades[3][2][0]*0.1+1,1,Math.pow(upgrades[3][2][0]+5,3),100,1.1+upgrades[3][2][0]*0.01,2,0,1,0,0);
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
    textSize(20);
    textAlign("left");
    inventoryPos=50;
    for (var i=0;i<rarities.length;i++){
      if (rarities[i][3+inventorySectionScroll]!=0){
        fill(255,255,255);
        noStroke();
        text(rarities[i][3+inventorySectionScroll]+"x",10,inventoryPos-200*inventoryScroll);
        fill(rarities[i][2][0],rarities[i][2][1],rarities[i][2][2]);
        if (inventorySectionScroll==1){
          strokeWeight(1.5);
          stroke(255,192,0);
          text(rarities[i][0]+" (Rarity: "+String(Math.pow(rarities[i][1],2)*100)+")",40+10*Math.floor(Math.log10(rarities[i][3+inventorySectionScroll])),inventoryPos-200*inventoryScroll);
        } else {
          text(rarities[i][0]+" (Rarity: "+String(rarities[i][1])+")",40+10*Math.floor(Math.log10(rarities[i][3+inventorySectionScroll])),inventoryPos-200*inventoryScroll);
        };
        inventoryPos+=20
      };
    };
    fill(0,0,0);
    noStroke();
    rect(0,0,800,30);
    fill(255,255,255)
    text("Your inventory is boosting luck by x"+String(Math.round(inventoryLuckBoost*10000)/10000),10,20);
  };  

  function updateInventoryLuck(){
    tempInventoryLuckBoost=0;
    for (var i=0;i<rarities.length;i++){
      tempInventoryLuckBoost+=Math.pow((rarities[i][4]+1)*(rarities[i][3]+rarities[i][4]),0.5);
    };
    inventoryLuckBoost=Math.pow(1+(Math.log10(tempInventoryLuckBoost+1)/100),upgrades[0][0][3])
  };

  function updatePowerLuck(){
    powerLuckBoost=Math.pow(Math.log(Math.pow(currencies[0][2],0.8)/100+1)/100+1,10);
  };

  function displayUpgrades(){
    if(0<=menu&&menu<=3){
      for (var i=0;i<upgrades[menu].length;i++){
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
          text(upgrades[menu][i][1],1200,110+220*(i-upgradeScroll));
          text(upgrades[menu][i][2]+String(upgrades[menu][i][3]),1200,130+220*(i-upgradeScroll));
          textSize(10);
          textAlign("left");
          for (var j=0;j<upgrades[menu][i][4].length;j++){
            fill(255,255,255);
            text(upgrades[menu][i][4][j][1]+"x",1120,140+10*j+220*(i-upgradeScroll));
            fill(rarities[Number(upgrades[menu][i][4][j][0])][2][0],rarities[Number(upgrades[menu][i][4][j][0])][2][1],rarities[Number(upgrades[menu][i][4][j][0])][2][2])
            text(rarities[Number(upgrades[menu][i][4][j][0])][0],1140,140+10*j+220*(i-upgradeScroll));
          };
        };
      };
    };
    fill(0,0,0);
    rect(1095,-500,210,575);
    rect(1095,725,210,575);
  };

  function displayScrollButtons(){
    if (menu==0){
      //inventory scroll
      drawScrollButton(350,275,"up");
      drawScrollButton(350,375,"down");
      //inventory section scroll
      drawScrollButton(300,325,"left");
      drawScrollButton(400,325,"right");
    } else if (menu==2){
      //downgrader scroll
      drawScrollButton(25,325,"up");
      drawScrollButton(25,425,"down");
    } else if (menu==4){
      //power extractor scroll
      drawScrollButton(25,325,"up");
      drawScrollButton(25,425,"down");
    };
    //upgrade scroll
    drawScrollButton(1175,10,"up");
    drawScrollButton(1175,740,"down");
  };

  function displayMenuButtons(){
    drawScrollButton(50,725,"left");
    drawScrollButton(125,725,"right");
  };

  function drawScrollButton(x,y,direction){
    noStroke();
    fill(128,128,128);
    rect(x,y,50,50);
    strokeWeight(5);
    stroke(0,0,0);
    if(direction=="up"){
      line(x+25,y+10,x+25,y+40);
      line(x+35,y+20,x+25,y+10);
      line(x+15,y+20,x+25,y+10);
    }else if (direction=="down"){
      line(x+25,y+10,x+25,y+40);
      line(x+35,y+30,x+25,y+40);
      line(x+15,y+30,x+25,y+40);
    }else if (direction=="left"){
      line(x+10,y+25,x+40,y+25);
      line(x+10,y+25,x+20,y+15);
      line(x+10,y+25,x+20,y+35);
    }else{
      line(x+10,y+25,x+40,y+25);
      line(x+40,y+25,x+30,y+15);
      line(x+40,y+25,x+30,y+35);
    };
  };

  function updateSmoothScrolling(){
    upgradeScroll=(9*upgradeScroll+projectedUpgradeScroll)/10;
    inventoryScroll=(9*inventoryScroll+projectedInventoryScroll)/10;
    newestUniqueRaritySize=40-(40-newestUniqueRaritySize)*1.03;
    if (newestUniqueRaritySize<0){
      newestUniqueRaritySize=0;
    };
    powerExtractorResultDisplaySize=50-(50-powerExtractorResultDisplaySize)*1.04;
    if (powerExtractorResultDisplaySize<0){
      powerExtractorResultDisplaySize=0;
    };
  };

  function displayCooldownBar(){
    strokeWeight(10);
    stroke(255,0,0);
    line(750,300,750,450);
    stroke(0,255,0);
    line(750,450,750,450-150*min(framesSinceRoll/rollCooldown,1));
    if (upgrades[3][0][0]>0){
      strokeWeight(10);
      stroke(255,0,0);
      line(550,300,550,450);
      stroke(0,64,255);
      line(550,450,550,450-150*min(framesSinceAutoRoll/(100/upgrades[3][0][3]),1));
    };
  };

  function displayCurrentLuck(){
    fill(255,255,255);
    textSize(40);
    noStroke();
    textAlign("center");
    text("Current Luck: x"+String(round(luck*1000)/1000),650,525);
  };

  function displayDowngrader(){
    fill(0,0,0);
    strokeWeight(5);
    stroke(0,255,0);
    rect(100,250,300,300);
    textSize(40);
    textAlign("center");
    fill(255,255,255);
    noStroke();
    text("Downgrade",250,400);
    textSize(40);
    textAlign("center");
    if (ownedRarities.length>=2){
      if(downgraderScroll>ownedRarities.length-2){
        downgraderScroll=ownedRarities.length-2;
      }
      if(downgraderScroll<0){
        downgraderScroll=0;
      }
      for (var i=0;i<2;i++){
        fill(rarities[ownedRarities[downgraderScroll+i]][2][0],rarities[ownedRarities[downgraderScroll+i]][2][1],rarities[ownedRarities[downgraderScroll+i]][2][2]);
        textSize(50);
        textAlign("left");
        text(rarities[ownedRarities[downgraderScroll+i]][0],550,300+200*i);
        fill(255,255,255);
        if (i==0){
          text("+1x",450,300);
        } else {
          text("-1x",450,500);
        };
        textSize(20);
        text("(You have "+rarities[ownedRarities[downgraderScroll+i]][3]+")",550,325+200*i);
      };
    };
  };

  function displayPowerExtractor(){
    fill(0,0,0);
    strokeWeight(5);
    stroke(0,255,0);
    rect(100,250,300,300);
    textSize(40);
    textAlign("center");
    fill(255,255,255);
    noStroke();
    text("Extract Power",250,400);
    textSize(40);
    textAlign("center");
    if (ownedEmpoweredRarities.length>=1){
      if(powerExtractorScroll>ownedEmpoweredRarities.length-1){
        powerExtractorScroll=ownedEmpoweredRarities.length-1;
      }
      if(powerExtractorScroll<0){
        powerExtractorScroll=0;
      }
      fill(rarities[ownedEmpoweredRarities[powerExtractorScroll]][2][0],rarities[ownedEmpoweredRarities[powerExtractorScroll]][2][1],rarities[ownedEmpoweredRarities[powerExtractorScroll]][2][2]);
      textSize(50);
      textAlign("left");
      strokeWeight(3);
      stroke(255,192,0);
      text(rarities[ownedEmpoweredRarities[powerExtractorScroll]][0],550,300);
      noStroke();
      fill(255,255,255);
      text("-1x",450,300);
      textSize(20);
      text("(You have "+rarities[ownedEmpoweredRarities[powerExtractorScroll]][4]+")",550,325);
      textSize(50);
      text("+\u03B6",450,400);
      text("+\u03B6",450,500);
      text("power",550,400);
      textSize(powerExtractorResultDisplaySize+0.001);
      text("+"+powerExtractorResult[0],1000,400);
      text("+"+powerExtractorResult[1],1000,500);
      fill(rarities[ownedEmpoweredRarities[powerExtractorScroll]][2][0],rarities[ownedEmpoweredRarities[powerExtractorScroll]][2][1],rarities[ownedEmpoweredRarities[powerExtractorScroll]][2][2]);
      textSize(50);
      text(rarities[ownedEmpoweredRarities[powerExtractorScroll]][0],550,500);
      textSize(20);
      fill(255,255,255);
      text("(You have "+rarities[ownedEmpoweredRarities[powerExtractorScroll]][3]+")",550,525);
      text("(\u03B6=1/uniform(0,1))",150,430);
    };
  };

  function autoRoll(){
    if (upgrades[3][0][0]>0&&framesSinceAutoRoll>=100/upgrades[3][0][3]){
      framesSinceAutoRoll=0;
      roll(upgrades[3][1][3]*luck,upgrades[3][2][3]*maxBulk,0);
    }
  }

  
  function displayNewestUniqueRarity(){
    fill(255,255,255);
    textSize(40);
    textAlign("center");
    text("Newest Unique Rarity:",650,625)
    fill(rarities[newestUniqueRarity][2][0],rarities[newestUniqueRarity][2][1],rarities[newestUniqueRarity][2][2]);
    textSize(newestUniqueRaritySize+0.01);
    text(rarities[newestUniqueRarity][0],650,675);
  }
  draw = function() {
    createCanvas(window.innerWidth-20,window.innerHeight-20);
    scale(min(window.innerWidth/1350,window.innerHeight/800));
    background(0,0,0);
    if(menu==0){
      fill(255,255,255);
      sortRarityList();
      textSize(50);
      textAlign("center");
      noStroke();
      text("You Rolled: ",650,100)
      if (currentRoll!=-1){
        getRollData(currentRoll);
      }else{
        fill(255,255,255);
      };
      textSize(displaySize);
      if (currentSpecial==1){
        strokeWeight(displaySize*0.1);
        stroke(255,192,0);
        text("Rarity: "+100*Math.pow(currentRarity,2),650,250);
      } else {
        noStroke();
        text("Rarity: "+currentRarity,650,250);
      };
      textSize(2*displaySize);
      text(currentName+"  x"+currentBulk,650,200);
      displaySize=35-(35-displaySize)*0.9
      fill(255,255,255);
      displayInventory();
      displayRollButton();
      displayCooldownBar();
      displayCurrentLuck();
      displayNewestUniqueRarity();
    }else if(menu==-1){
      fill(255,255,255);
      noStroke();
      textAlign("center");
      textSize(100);
      text("Statistics:",675,100);
      textSize(50);
      text("You have rolled "+String(rolls)+" times.",675,150);
      text("You have played for "+String(round(time))+" seconds.",675,200);
    }else if(menu==-2){
      fill(255,255,255);
      noStroke();
      textAlign("center");
      textSize(100);
      text("Records:",675,100);
      textSize(50);
      text("Rarest roll: 1.25M (The_Grinding_Master)",675,150);
      text("Highest luck: x1.095 (Prestige283)",675,225);
      text("Highest power: N/A",675,300);
    }else if(menu==1){
      strokeWeight(5);
      if (luck>=unlockReq[unlocks][1]){
        stroke(0,255,0);
      }else{
        stroke(255,0,0);
      }
      fill(0,0,0);
      rect(475,200,400,400);
      fill(255,255,255);
      noStroke();
      textAlign("center");
      textSize(50);
      text("Next feature:",675,250);
      textSize(25);
      text(unlockReq[unlocks][0],675,350);
      text("Requires "+unlockReq[unlocks][1]+"x luck",675,450);
    }else if(menu==2){
      fill(255,255,255);
      textAlign("center");
      textSize(50);
      text("Rarity Downgrader",675,50);
      displayDowngrader();
    }else if(menu==3){
      fill(255,255,255);
      textAlign("center");
      textSize(50);
      text("Automation",675,50);
      textAlign("left");
      textSize(40);
      text("Interval: "+Math.round(100/upgrades[3][0][3])+" frames",50,200);
      text("Luck: x"+Math.round(luck*upgrades[3][1][3]*1000)/1000,50,250);
      text("Max Bulk: x"+Math.round(maxBulk*upgrades[3][2][3]),50,300);
    }else if(menu==4){
      fill(255,255,255);
      textAlign("center");
      textSize(50);
      text("Empowered Rarities",675,50);
      textAlign("left");
      textSize(40);
      text("You have "+currencies[0][2]+" power.",50,175);
      textSize(20);
      text("Boosting luck by x"+Math.round(powerLuckBoost*10000)/10000,50,200);
      displayPowerExtractor();
    };
    updateSmoothScrolling();
    displayUpgrades();
    displayScrollButtons();
    displayMenuButtons();
    updateOwnedRarities();
    updateCostsAndEffects();
    updateInventoryLuck();
    updatePowerLuck();
    autoRoll();
    luck=inventoryLuckBoost*powerLuckBoost;
    maxBulk=upgrades[0][1][3];
    framesSinceRoll+=1;
    framesSinceClick+=1;
    framesSinceAutoRoll+=1;
    time+=0.01;
  };
}