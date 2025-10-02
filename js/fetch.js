export async function fetch_json(word) {
    const response = await fetch("./data/shareholder_data.json");
    const companies = await response.json();
    const input_word = normalizeText(word);

    const candidates_list = get_company_list(companies, input_word);

    return candidates_list;
}



// 全角・半角、大文字、小文字をそろえる関数
function normalizeText(str) {
    if (str == null) return "";
    return str
        .normalize("NFKC")
        .toUpperCase()
        .trim();
}


function get_company_list(companies, company_name) {
    const candidates = new Map();

    companies.forEach(element => {
        element["大株主"].forEach(c => {
            const json_name = normalizeText(c["株主名"]);
            if (json_name.includes(company_name)) {
                if (!candidates.has(c["株主名"])) {
                    candidates.set(c["株主名"], []);
                }
                candidates.get(c["株主名"]).push({
                    証券コード: element["証券コード"],
                    企業名: element["企業名"],
                    持株比率: c["持株比率"]
                });
            }
        });
    });

    candidates.forEach((arr, key) => {
        arr.sort((a, b) => b["持株比率"] - a["持株比率"]);
    });
    return candidates;
}