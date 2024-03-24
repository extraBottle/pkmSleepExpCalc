let expPerLevel= [54, 71, 108, 128, 164, 202, 244, 274,
315, 345,  376, 407, 419, 429, 440, 454, 469, 483, 497, 515,
537, 558, 579, 600, 622, 643, 665, 686, 708, 729, 748, 766, 785,
803, 821, 839, 857, 875, 893, 910, 928, 945, 963, 980, 997, 1015,
1032, 1049, 1066, 1362, 1562, 1747, 1946, 2195];
//레벨 당 경험치량
let shardPerLevel= [14, 18, 22, 27, 30, 34, 39, 44, 48, 50, 52, 53,
56, 59, 62, 66, 68, 71, 74, 78, 81, 85, 88, 92, 95, 100, 105, 111,
117, 122, 126, 130, 136, 143, 151, 160, 167, 174, 184, 192, 201,
211, 221, 227, 236, 250, 264, 279, 295, 309, 323, 338, 356, 372, 391];
//특정 레벨에서 사탕 하나 당 필요한 꿈의 조각 개수
let gesangee= "v1.3.2<br>@두번째유리병";
//계산기 웹사이트 현재 버전

let maxLevel = 55;
// 현재 최고 레벨
let minLevel = 1;
// 최소 레벨
const pkmSpeciesObj = {
    "일반": 1.0,
    "600족(1.5배)": 1.5,
    "전설(1.8배)": 1.8
};
// 포켓몬 종류에 따른 exp 배율

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcVer").innerHTML= gesangee;
    document.getElementById("maxLevelGuide").innerHTML= `레벨 ${maxLevel}까지`;
    document.getElementById("maxInputCurrent").innerHTML= maxLevel - 1;
    document.getElementById("maxInputGoal").innerHTML= maxLevel;
    // 현재 레벨 설정 제한
    let limitCurrentLevel = document.getElementById("currentLevel");
    limitCurrentLevel.min = minLevel;
    limitCurrentLevel.max = maxLevel - 1;
    // 목표 레벨 설정 제한
    let limitTargetLevel = document.getElementById("targetLevel");
    limitTargetLevel.min = minLevel + 1;
    limitTargetLevel.max = maxLevel;
    limitTargetLevel.value = maxLevel;
    // 남은 경험치 최대치 제한
    let limitLeftExp = document.getElementById("leftExp");
    limitLeftExp.max = expPerLevel.slice(-1);
    for(let key in pkmSpeciesObj){
        // 포켓몬 종류 목록 불러오기
        document.getElementById("pkmSpecies").innerHTML += `<option>${key}</option>`;
    };
});

let boostOn= document.getElementById("candyBoost");
//사탕 부스트 선택했는지 확인
let proOn= document.getElementById("proVer");
//프로 버전 계산기 선택했는지 확인
let lightOn= document.getElementById("lightVer");
//라이트 버전 계산기 선택했는지 확인

boostOn.addEventListener("change", () => {
    if(boostOn.checked){
        document.getElementById("candycandy").style.display= "block";
    }else{
        document.getElementById("candycandy").style.display= "none";
    }
    document.getElementById("candyEff").disabled = !document.getElementById("candyEff").disabled;
    document.getElementById("dreamEff").disabled = !document.getElementById("dreamEff").disabled;
});
proOn.addEventListener("change", () => {
    if(proOn.checked){
        for(let ele of document.getElementsByClassName("proCalc")){
            ele.style.display= "flex";
        };
    };
});
lightOn.addEventListener("change", () => {
    if(lightOn.checked){
        for(let elle of document.getElementsByClassName("proCalc")){
            elle.style.display= "none";
        };
    };
});
//라이트, 프로 버전 계산기에 따라 입력란이 변함

function calculator() {
    let candy= 25;
    //사탕 하나의 경험치량
    let current= parseInt(document.getElementById('currentLevel').value);
    //포켓몬의 현재 레벨
    let goal= parseInt(document.getElementById('targetLevel').value);  
    //포켓몬의 목표 레벨
    let left= expPerLevel[current - 1];
    //포켓몬의 다음 레벨까지 남은 경험치량
    //라이트 계산기는 현재 남은 경험치량 고려 안함
    let candyEfficiency= document.getElementById("candyEff").value;
    //사탕 효율 선택
    let shardEfficieny= document.getElementById("dreamEff").value;
    //꿈의조각 소모량 선택
    let checkPkmSpecies;
    let checkIfExpNature;
    let errorMessage= "";
    //사용자가 정보 오기입시 띄울 알림창 메시지
    let noInputError = true;
    //사용자가 정보 오기입 했는지 확인

    if(current < minLevel || current > maxLevel){
        errorMessage += `-현재 레벨은 1부터 ${maxLevel - 1} 사이만 가능합니다.\n`;
        noInputError = false;
    };
    if(goal < minLevel + 1 || goal > maxLevel){
        errorMessage += `-목표 레벨은 2부터 ${maxLevel} 사이만 가능합니다.\n`;
        noInputError = false;
    };

    if(proOn.checked){
        left= parseInt(document.getElementById('leftExp').value);
        //포켓몬의 다음 레벨까지 남은 경험치량
        checkPkmSpecies= document.getElementById("pkmSpecies").value;
        //포켓몬 종류 확인
        checkIfExpNature= document.getElementById("expNature").value;
        //경험치 증감 성격 확인
        //포켓몬 남은 경험치량 제대로 기입했는지 확인
        if(checkPkmSpecies === "일반"){
            if(left > expPerLevel[current - 1]){
                errorMessage += "-남은 경험치량을 제대로 기입했는지 확인해주세요.\n";
                noInputError = false;
            };
        }else{
            if(left > Math.round(expPerLevel[current - 1] * pkmSpeciesObj[checkPkmSpecies])){
                errorMessage += "-남은 경험치량을 제대로 기입했는지 확인해주세요.\n";
                noInputError = false;
            };
        };
    };

    if(noInputError){
        if(checkIfExpNature === "exp 획득량 감소"){
            candy= 21;
        }else if(checkIfExpNature === "exp 획득량 증가"){
            candy = candy * 1.2;
        };
        if(boostOn.checked){
            candy *= Number(candyEfficiency.slice(0, -1));
        };
        let totalExpRequired= left;
        //현재 레벨에서 목표레벨까지 필요한 경험치량
        let leftoverCandyExp= candy - left % candy;
        //사탕으로 렙업할 때 렙업하고도 초과하는 경험치량
        if(left % candy === 0){
            leftoverCandyExp= 0;
        };
        let totalShardsRequired= Math.ceil(left / candy) * shardPerLevel[current - 1];
        //현재 레벨에서 목표레벨까지 필요한 꿈의 조각 개수

        if(checkPkmSpecies === "일반" || !proOn.checked){
            for(let z= 0; z < (goal - current - 1); z++){
                totalExpRequired += expPerLevel[z + current];
                totalShardsRequired += Math.ceil((expPerLevel[z + current] - leftoverCandyExp) / candy) * shardPerLevel[z + current];
                if((expPerLevel[z + current] - leftoverCandyExp) % candy === 0){
                    leftoverCandyExp= 0;
                }else{
                    leftoverCandyExp= candy - (expPerLevel[z + current] - leftoverCandyExp) % candy;
                };
            };
        }else{
            for(let z= 0; z < (goal - current - 1); z++){
                totalExpRequired += Math.round(expPerLevel[z + current] * pkmSpeciesObj[checkPkmSpecies]);
                totalShardsRequired += Math.ceil((Math.round(expPerLevel[z + current] * pkmSpeciesObj[checkPkmSpecies]) - leftoverCandyExp) / candy) * shardPerLevel[z + current];
                if((Math.round(expPerLevel[z + current] * pkmSpeciesObj[checkPkmSpecies]) - leftoverCandyExp) % candy === 0){
                    leftoverCandyExp= 0;
                }else{
                    leftoverCandyExp= candy - (Math.round(expPerLevel[z + current] * pkmSpeciesObj[checkPkmSpecies]) - leftoverCandyExp) % candy;
                };
            };
        };

        let totalCandyRequired= Math.ceil(totalExpRequired / candy);
        //현재 레벨에서 목표레벨까지 필요한 사탕 개수
        if(boostOn.checked){
            totalShardsRequired *= Number(shardEfficieny.slice(0, -1));
        };
        document.getElementById('resultExp').value= totalExpRequired;
        document.getElementById('resultCandy').value= totalCandyRequired;
        document.getElementById('resultShard').value= totalShardsRequired;
        document.getElementById('resultOutput').style.display = "block";
    }else{
        alert(errorMessage);
    };
};


//예를들어, 레벨3 부터 레벨8까지 경험치, 남은 경험치 30
