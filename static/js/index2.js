//let theme = document.querySelector(':root');
//
//styles.getPropertyValue('--gray1');
//styles.getPropertyValue('--gray2');
//styles.getPropertyValue('--gray3');
//styles.getPropertyValue('--gray4');
//styles.getPropertyValue('--gray5');
//styles.getPropertyValue('--gray6');
//styles.getPropertyValue('--gray7');
//
//styles.getPropertyValue('--brand1');
//styles.getPropertyValue('--brand2');
//styles.getPropertyValue('--brand3');
//styles.getPropertyValue('--brand4');
//styles.getPropertyValue('--brand5');
//styles.getPropertyValue('--brand6');
//
//document.getElementById("restriction").addEventListener("click", () => {
//    document.getElementById("restrictionInfo").style.visibility = "visible";
//    document.getElementById("restrictionInfo").style.opacity = "0.7";
//
//    document.getElementById("restrictionBackground").style.visibility = "visible";
//    document.getElementById("restrictionBackground").style.opacity = "1";
//});
//
//document.getElementById("restrictionInfo").addEventListener("click", () => {
//    document.getElementById("restrictionInfo").style.visibility = "hidden";
//    document.getElementById("restrictionInfo").style.opacity = "0.0";
//
//    document.getElementById("restrictionBackground").style.visibility = "hidden";
//    document.getElementById("restrictionBackground").style.opacity = "0.0";
//});
//
//document.getElementById("restClose").addEventListener("click", () => {
//    document.getElementById("restrictionInfo").style.visibility = "hidden";
//    document.getElementById("restrictionInfo").style.opacity = "0.0";
//
//    document.getElementById("restrictionBackground").style.visibility = "hidden";
//    document.getElementById("restrictionBackground").style.opacity = "0.0";
//});

if (document.getElementById("shortenResult")) {
    document.getElementById("shortenResult").addEventListener("click", () => {
        if (document.getElementById("resultLinkSuccess").innerText !== "") {
            const url = "https://"+document.getElementById("resultLinkSuccess").innerText;
            navigator.clipboard.writeText(`${url}`)
            .then(()=>{
                alert(`링크를 클립보드에 성공적으로 복사했어요!`);
            })
            .catch(()=> {
                alert(`복사에 실패했어요. 주소를 직접 입력해주세요.`);
            })
        }
    });
}

function changeResult(success,description) {
    if (success == 1) {
        document.getElementById("resultLinkSuccess").classList.remove("disable");
        document.getElementById("resultLinkFailed").classList.add("disable");
        document.getElementById("resultImageSucceed").classList.remove("disable");
        document.getElementById("resultImageFailed").classList.add("disable");
        document.getElementById("resultText").innerText = "링크를 성공적으로 줄였어요!";

        document.getElementById("shortenResult").style = "animation: resultSucceeded 5s ease-out;";
        setTimeout(() => {
            document.getElementById("shortenResult").style = "";
        }, 5000);
    }
    else {
        document.getElementById("resultLinkFailed").classList.remove("disable");
        document.getElementById("resultLinkSuccess").classList.add("disable");
        document.getElementById("resultImageSucceed").classList.add("disable");
        document.getElementById("resultImageFailed").classList.remove("disable");

        document.getElementById("resultLinkFailed").innerText = "링크를 줄이는 데 실패했어요.";
        document.getElementById("resultText").innerText = description;

        document.getElementById("shortenResult").style = "animation: resultSucceeded 5s ease-out;";
        setTimeout(() => {
            document.getElementById("shortenResult").style = "";
        }, 5000);
    }
}

function apiRequest() {
    var url = document.getElementById("input").value;
    var customCode = document.getElementById("custom").value;

    if (url === "") {
        changeResult(0, "URL이 입력되지 않았어요.");
        return;
    }

    // some symbols are not allowed in URL
    if (url.includes("\\") || url.includes("/*") || url.includes("*/") || url.includes("(") || url.includes(")") || url.includes("+") || url.includes("%0b") || url.includes("%0c") || url.includes("%a0") || url.includes("||") || url.includes("&&") || url.includes("<") || url.includes(">")) {
        changeResult(0, "허용되지 않는 문자가 포함되어 있어요.");
        return;
    }
    else {
        fetch(`https://api.ssib.al/link/create?url=${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((response) => response.json().then((data) => {
            if (data.response == 201) {
                document.getElementById("resultLinkSuccess").innerText = "ssib.al/"+data.info.link_code;
                changeResult(1);
            }
            if (data.response == 400) {
                changeResult(0,  "URL이 입력되지 않았어요.");
            }
            if (data.response == 405) {
                changeResult(0, "단축 금지 사이트로 지정되어 있는 사이트에요.");
            }
            if (data.response == 406) {
                changeResult(0, "URL이 존재하지 않거나 올바르지 않아요.");
            }
            if (data.response == 409) {
                changeResult(0, "이미 누군가가 사용 중인 링크에요.");
            }
            if (data.response == 500) {
                changeResult(0, "서버에서 오류가 발생했어요.");
            }
        }));
    }
}