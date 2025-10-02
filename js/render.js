export async function render_data(candidates, input_word) {
    const resultDiv = document.getElementById("result");

    if (candidates.size == 0) {
        resultDiv.innerHTML = `<p>株主名「${input_word}」は見つかりませんでした。`;
    }
    else {
        resultDiv.innerHTML = `<p>「${input_word}」に一致した取引先を選んでください。`;

        for (const [shareholder_name, list] of candidates) {
            console.log(list);
            const child_Div = document.createElement("div");
            child_Div.textContent = `${shareholder_name}`;
            child_Div.className = "match-item";
            resultDiv.appendChild(child_Div);

            const ul = document.createElement("ul");
            ul.style.display = "none"; // 最初は非表示
            list.forEach(element => {
                const li = document.createElement("li");
                li.innerHTML = `<a href=https://ueno2025.github.io/search_major_shareholders/?code=${element["証券コード"]} target="_blank" rel="noopener noreferrer">
                                ${element["証券コード"]}: ${element["企業名"]} - ${element["持株比率"]}%</a>`
                ul.appendChild(li);
            });

            resultDiv.append(ul);

            // clickされた時の処理
            child_Div.addEventListener("click", () => {
                ul.style.display = (ul.style.display === "none") ? "block" : "none";
            });
        }
    }
}