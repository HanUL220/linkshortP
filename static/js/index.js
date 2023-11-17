function changeResult(success,description) {
    if (success == 1) {
        document.getElementById("resultLinkSuccess").classList.remove("disable");
        document.getElementById("resultText").innerText = "링크를 성공적으로 줄였어요!";

        document.getElementById("shorten_link").style = "animation: resultSucceeded 5s ease-out;";
        setTimeout(() => {
            document.getElementById("shorten_link").style = "";
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

    // 허용되지 않는 문자 포함
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
            }
        }));
    }
}