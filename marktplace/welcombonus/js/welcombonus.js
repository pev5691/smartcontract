
SetMobileMode();

var SaveIdArr = ["idUser"];
var TotalSumWas = 0;

ALL_ACCOUNTS = 1;
window.addEventListener('Init', function ()
{
    UpdateInfo();
    TotalSumWas = CaclTotalSum();
    setInterval(UpdateInfo, 1000);
    LoadValues();
})
window.addEventListener('UpdateInfo', UpdateInfo);
window.addEventListener('Event', function (e) {
    var Data = e.detail;
    if (Data.Error)
        SetError(Data.Description);
    UpdateInfo();
});

window.addEventListener('UpdateInfo', UpdateFillUser);

// Resize handler
window.addEventListener('resize', function (e) {
    var Item = document.querySelector('.item');
    var ItemWrapper = document.querySelector('.item__wrapper');
    var Scale = Item.clientWidth / 520;

    if (Scale > 1) {
        Scale = 1;
    }

    ItemWrapper.style.transform = 'translate(-50%, 0%) ' + 'scale(' + Scale + ')';
});

function UpdateInfo()
{
    var BlockReward = GetCurrentBlockNumByTime() % 1200;
    var BaseValue = FLOAT_FROM_COIN(BASE_ACCOUNT.Value);
    var bView=0;
    if (BaseValue < 1 || BlockReward >= 30)
    {
        var NextStart = 1200 - BlockReward;
        $("idNextStart").innerText = "" + Math.floor(NextStart / 60) + ":" + NextStart % 60;
        $("idEnd").innerText = "0:00";
        $("idEnd0").className="novisible";
    } else
    {
        bView=1;
        $("idNextStart").innerText = "0:00";
        $("idEnd").innerText = "0:" + (30 - BlockReward) % 60;
        $("idEnd0").className="";
    }
    $("idClicker").disabled = !bView;

    var TotalSum = CaclTotalSum();
    var Sum = TotalSum - TotalSumWas;
    if (Sum < 0)
        Sum = 0;
    $("idTotalWin").innerText = Sum;
    $("idTotalRest").innerText = Math.floor(BaseValue);


    SetVisibleClass(".choose-play", USER_ACCOUNT.length);
    SetVisibleClass(".create-acc", !USER_ACCOUNT.length);

}

function SendClick() {
    var AccFrom = $("idUser").value;
    SendCall(BASE_ACCOUNT.Num, "GetCoin", {
        From: AccFrom
    }, AccFrom);
}

function CaclTotalSum() {
    var Sum = 0;
    for (var i = 0; i < USER_ACCOUNT.length; i++) {
        var Item = USER_ACCOUNT[i];
        Sum += Item.Value.SumCOIN;
    }
    return Sum;

}

function SaveValues() {
    SaveToStorageByArr(SaveIdArr);
}

function LoadValues() {
    LoadFromStorageByArr(SaveIdArr, function () {
        UpdateFillUser();
    });
}

function UpdateFillUser() {
    var Arr = [];
    for (var i = 0; i < USER_ACCOUNT.length; i++) {
        var Item = USER_ACCOUNT[i];
        var Value = {
            value: Item.Num,
            text: Item.Num + "." + Item.Name + "  " + SUM_TO_STRING(Item.Value, Item.Currency, 1)
        };
        Arr.push(Value);
    }
    FillSelect("idUser", Arr);
}

function PressCreateAccount() {
    CreateNewAccount();
}