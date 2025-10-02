import {fetch_json} from "./fetch.js";
import {render_data} from "./render.js";

async function main() {
    const params = new URLSearchParams(window.location.search);
    const word = params.get("keyword");

    if (word) {
        
        const candidates_list = await fetch_json(word);
        console.log(candidates_list)
        render_data(candidates_list, word);
    }
    else {
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "<p>証券コード、もしくは企業名を入力してください。"
    }
}

window.addEventListener("DOMContentLoaded", () => {
    main();
});