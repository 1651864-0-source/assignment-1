document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    // Constants and State
    // =================================================================================
    const R_CONSTANT = 8.314;
    const elementDivs = {};
    let formulaChart = null;
    const elementsData = [
        {"number": 1, "symbol": "H", "name": "氫", "row": 1, "col": 1, "category": "nonmetal", "mass": 1.008, "encyclopedia": "氫是宇宙中最輕、最豐富的元素，佔宇宙質量的75%。它通常以雙原子氣體（H₂）形式存在，是恆星核聚變的主要燃料。1766年由卡文迪許首次確認為獨立元素，並由拉瓦錫命名，意為「水的生成者」。", "physical": {"state": "氣態", "melting_point": "13.83 K", "boiling_point": "20.27 K", "density": "0.08988 g/L"}, "atomic": {"atomic_radius": "53 pm", "covalent_radius": "37 pm", "electron_configuration": "1s¹"}, "electromagnetic": {"electronegativity": 2.20, "ionization_energy": "1312.0 kJ/mol"}, "abundance": "1400 ppm"},
        {"number": 2, "symbol": "He", "name": "氦", "row": 1, "col": 18, "category": "noble", "mass": 4.0026, "encyclopedia": "氦是第二輕的元素，是一種無色、無味的惰性氣體。1868年在太陽光譜中被發現，因此得名（源自希臘語「太陽」）。主要用於低溫學、填充氣球和作為保護氣體。", "physical": {"state": "氣態", "melting_point": "0.95 K (在2.5 MPa下)", "boiling_point": "4.22 K", "density": "0.1786 g/L"}, "atomic": {"atomic_radius": "31 pm", "covalent_radius": "32 pm", "electron_configuration": "1s²"}, "electromagnetic": {"electronegativity": null, "ionization_energy": "2372.3 kJ/mol"}, "abundance": "0.008 ppm"},
        {"number": 3, "symbol": "Li", "name": "鋰", "row": 2, "col": 1, "category": "alkali", "mass": 6.94, "encyclopedia": "鋰是最輕的金屬，質地柔軟，呈銀白色。它非常活潑，必須保存在油中。1817年由阿韋德松發現。現代主要應用於可充電電池、合金和精神藥物。", "physical": {"state": "固態", "melting_point": "453.65 K", "boiling_point": "1615 K", "density": "0.534 g/cm³"}, "atomic": {"atomic_radius": "167 pm", "covalent_radius": "134 pm", "electron_configuration": "[He] 2s¹"}, "electromagnetic": {"electronegativity": 0.98, "ionization_energy": "520.2 kJ/mol"}, "abundance": "20 ppm"},
        {"number": 4, "symbol": "Be", "name": "鈹", "row": 2, "col": 2, "category": "alkaline", "mass": 9.0122, "encyclopedia": "鈹是一種相對稀有的輕質鹼土金屬，堅硬但易碎。它對X射線有高穿透性，因此用於製造X射線管的窗口。1798年由沃克蘭發現。", "physical": {"state": "固態", "melting_point": "1560 K", "boiling_point": "2742 K", "density": "1.85 g/cm³"}, "atomic": {"atomic_radius": "112 pm", "covalent_radius": "90 pm", "electron_configuration": "[He] 2s²"}, "electromagnetic": {"electronegativity": 1.57, "ionization_energy": "899.5 kJ/mol"}, "abundance": "2.8 ppm"},
        {"number": 5, "symbol": "B", "name": "硼", "row": 2, "col": 13, "category": "metalloid", "mass": 10.81, "encyclopedia": "硼是一種具有多種同素異形體的准金屬，其非晶態形式為棕色粉末。硼酸和硼砂是其重要化合物，廣泛用於玻璃工業和農業。1808年被分離出來。", "physical": {"state": "固態", "melting_point": "2349 K", "boiling_point": "4200 K", "density": "2.34 g/cm³"}, "atomic": {"atomic_radius": "87 pm", "covalent_radius": "82 pm", "electron_configuration": "[He] 2s² 2p¹"}, "electromagnetic": {"electronegativity": 2.04, "ionization_energy": "800.6 kJ/mol"}, "abundance": "10 ppm"},
        {"number": 6, "symbol": "C", "name": "碳", "row": 2, "col": 14, "category": "nonmetal", "mass": 12.011, "encyclopedia": "碳是構成所有已知生命的基礎元素。它以多種形式存在，包括鑽石、石墨和無定形碳。碳-14同位素被用於放射性碳定年法。自古以來就為人所知。", "physical": {"state": "固態", "melting_point": "3823 K (鑽石)", "boiling_point": "5100 K (升華)", "density": "2.267 g/cm³ (石墨)"}, "atomic": {"atomic_radius": "67 pm", "covalent_radius": "77 pm", "electron_configuration": "[He] 2s² 2p²"}, "electromagnetic": {"electronegativity": 2.55, "ionization_energy": "1086.5 kJ/mol"}, "abundance": "200 ppm"},
        {"number": 7, "symbol": "N", "name": "氮", "row": 2, "col": 15, "category": "nonmetal", "mass": 14.007, "encyclopedia": "氮是地球大氣中最豐富的氣體（約78%）。它在生物體中是氨基酸和核酸的必要成分。液氮是一種重要的低溫劑。1772年由丹尼爾·盧瑟福發現。", "physical": {"state": "氣態", "melting_point": "63.15 K", "boiling_point": "77.36 K", "density": "1.251 g/L"}, "atomic": {"atomic_radius": "56 pm", "covalent_radius": "75 pm", "electron_configuration": "[He] 2s² 2p³"}, "electromagnetic": {"electronegativity": 3.04, "ionization_energy": "1402.3 kJ/mol"}, "abundance": "19 ppm"},
        {"number": 8, "symbol": "O", "name": "氧", "row": 2, "col": 16, "category": "nonmetal", "mass": 15.999, "encyclopedia": "氧是一種高度活潑的非金屬，是地殼中含量最豐富的元素，也是大多數生物呼吸所必需的。臭氧（O₃）層保護地球免受紫外線輻射。1774年被獨立發現。", "physical": {"state": "氣態", "melting_point": "54.36 K", "boiling_point": "90.20 K", "density": "1.429 g/L"}, "atomic": {"atomic_radius": "48 pm", "covalent_radius": "73 pm", "electron_configuration": "[He] 2s² 2p⁴"}, "electromagnetic": {"electronegativity": 3.44, "ionization_energy": "1313.9 kJ/mol"}, "abundance": "461000 ppm"},
        {"number": 9, "symbol": "F", "name": "氟", "row": 2, "col": 17, "category": "halogen", "mass": 18.998, "encyclopedia": "氟是電負性最強、化學性質最活潑的元素。由於其極端反應性，直到1886年才被亨利·莫瓦桑成功分離。其化合物如氟化物被用於牙膏和飲水處理。", "physical": {"state": "氣態", "melting_point": "53.53 K", "boiling_point": "85.03 K", "density": "1.696 g/L"}, "atomic": {"atomic_radius": "42 pm", "covalent_radius": "71 pm", "electron_configuration": "[He] 2s² 2p⁵"}, "electromagnetic": {"electronegativity": 3.98, "ionization_energy": "1681.0 kJ/mol"}, "abundance": "585 ppm"},
        {"number": 10, "symbol": "Ne", "name": "氖", "row": 2, "col": 18, "category": "noble", "mass": 20.180, "encyclopedia": "氖是一種無色、無味的稀有氣體，當通電時會發出明亮的紅橙色光，因此得名（源自希臘語「新的」）。常用於霓虹燈和廣告標牌。1898年被發現。", "physical": {"state": "氣態", "melting_point": "24.56 K", "boiling_point": "27.07 K", "density": "0.9002 g/L"}, "atomic": {"atomic_radius": "38 pm", "covalent_radius": "69 pm", "electron_configuration": "[He] 2s² 2p⁶"}, "electromagnetic": {"electronegativity": null, "ionization_energy": "2080.7 kJ/mol"}, "abundance": "0.005 ppm"},
        {"number": 11, "symbol": "Na", "name": "鈉", "row": 3, "col": 1, "category": "alkali", "mass": 22.990, "encyclopedia": "鈉是一種活潑的鹼金屬，常見於食鹽中。", "physical": {"state": "固態", "melting_point": "370.87 K", "boiling_point": "1156 K", "density": "0.971 g/cm³"}, "atomic": {"atomic_radius": "190 pm", "covalent_radius": "154 pm", "electron_configuration": "[Ne] 3s¹"}, "electromagnetic": {"electronegativity": 0.93, "ionization_energy": "495.8 kJ/mol"}, "abundance": "23600 ppm"},
        {"number": 12, "symbol": "Mg", "name": "鎂", "row": 3, "col": 2, "category": "alkaline", "mass": 24.305, "encyclopedia": "鎂是一種輕質金屬，常用於合金和煙火。", "physical": {"state": "固態", "melting_point": "923 K", "boiling_point": "1363 K", "density": "1.738 g/cm³"}, "atomic": {"atomic_radius": "145 pm", "covalent_radius": "130 pm", "electron_configuration": "[Ne] 3s²"}, "electromagnetic": {"electronegativity": 1.31, "ionization_energy": "737.7 kJ/mol"}, "abundance": "23300 ppm"},
        {"number": 13, "symbol": "Al", "name": "鋁", "row": 3, "col": 13, "category": "post-transition", "mass": 26.982, "encyclopedia": "鋁是地殼中含量最豐富的金屬元素，輕便且耐腐蝕。", "physical": {"state": "固態", "melting_point": "933.47 K", "boiling_point": "2792 K", "density": "2.70 g/cm³"}, "atomic": {"atomic_radius": "118 pm", "covalent_radius": "118 pm", "electron_configuration": "[Ne] 3s² 3p¹"}, "electromagnetic": {"electronegativity": 1.61, "ionization_energy": "577.5 kJ/mol"}, "abundance": "82300 ppm"},
        {"number": 14, "symbol": "Si", "name": "矽", "row": 3, "col": 14, "category": "metalloid", "mass": 28.085, "encyclopedia": "矽是半導體工業的基礎，是沙子的主要成分。", "physical": {"state": "固態", "melting_point": "1687 K", "boiling_point": "3538 K", "density": "2.3296 g/cm³"}, "atomic": {"atomic_radius": "111 pm", "covalent_radius": "111 pm", "electron_configuration": "[Ne] 3s² 3p²"}, "electromagnetic": {"electronegativity": 1.90, "ionization_energy": "786.5 kJ/mol"}, "abundance": "282000 ppm"},
        {"number": 15, "symbol": "P", "name": "磷", "row": 3, "col": 15, "category": "nonmetal", "mass": 30.974, "encyclopedia": "磷對生命至關重要，存在於DNA和骨骼中，有白磷、紅磷等同素異形體。", "physical": {"state": "固態", "melting_point": "317.3 K (白磷)", "boiling_point": "553.7 K (白磷)", "density": "1.823 g/cm³ (白磷)"}, "atomic": {"atomic_radius": "98 pm", "covalent_radius": "106 pm", "electron_configuration": "[Ne] 3s² 3p³"}, "electromagnetic": {"electronegativity": 2.19, "ionization_energy": "1011.8 kJ/mol"}, "abundance": "1050 ppm"},
        {"number": 16, "symbol": "S", "name": "硫", "row": 3, "col": 16, "category": "nonmetal", "mass": 32.06, "encyclopedia": "硫以其特有的黃色和臭味而聞名，用於製造火藥和硫酸。", "physical": {"state": "固態", "melting_point": "388.36 K", "boiling_point": "717.8 K", "density": "2.07 g/cm³"}, "atomic": {"atomic_radius": "88 pm", "covalent_radius": "102 pm", "electron_configuration": "[Ne] 3s² 3p⁴"}, "electromagnetic": {"electronegativity": 2.58, "ionization_energy": "999.6 kJ/mol"}, "abundance": "350 ppm"},
        {"number": 17, "symbol": "Cl", "name": "氯", "row": 3, "col": 17, "category": "halogen", "mass": 35.45, "encyclopedia": "氯是一種具刺激性氣味的氣體，廣泛用於消毒和漂白。", "physical": {"state": "氣態", "melting_point": "171.6 K", "boiling_point": "239.11 K", "density": "3.2 g/L"}, "atomic": {"atomic_radius": "79 pm", "covalent_radius": "99 pm", "electron_configuration": "[Ne] 3s² 3p⁵"}, "electromagnetic": {"electronegativity": 3.16, "ionization_energy": "1251.2 kJ/mol"}, "abundance": "145 ppm"},
        {"number": 18, "symbol": "Ar", "name": "氬", "row": 3, "col": 18, "category": "noble", "mass": 39.948, "encyclopedia": "氬是一種惰性氣體，常用於燈泡和焊接中以保護燈絲或金屬。", "physical": {"state": "氣態", "melting_point": "83.8 K", "boiling_point": "87.3 K", "density": "1.784 g/L"}, "atomic": {"atomic_radius": "71 pm", "covalent_radius": "97 pm", "electron_configuration": "[Ne] 3s² 3p⁶"}, "electromagnetic": {"electronegativity": null, "ionization_energy": "1520.6 kJ/mol"}, "abundance": "3.5 ppm"},
        {"number": 19, "symbol": "K", "name": "鉀", "row": 4, "col": 1, "category": "alkali", "mass": 39.098, "encyclopedia": "鉀是一種活潑的鹼金屬，對植物生長和動物神經功能至關重要。主要用作肥料。", "physical": {"state": "固態", "melting_point": "336.53 K", "boiling_point": "1032 K", "density": "0.86 g/cm³"}, "atomic": {"atomic_radius": "243 pm", "covalent_radius": "203 pm", "electron_configuration": "[Ar] 4s¹"}, "electromagnetic": {"electronegativity": 0.82, "ionization_energy": "418.8 kJ/mol"}, "abundance": "20900 ppm"},
        {"number": 20, "symbol": "Ca", "name": "鈣", "row": 4, "col": 2, "category": "alkaline", "mass": 40.078, "encyclopedia": "鈣是人體骨骼和牙齒的主要礦物成分。它在自然界中以石灰石、石膏和大理石等形式大量存在。用於製造水泥和石灰。", "physical": {"state": "固態", "melting_point": "1115 K", "boiling_point": "1757 K", "density": "1.55 g/cm³"}, "atomic": {"atomic_radius": "194 pm", "covalent_radius": "174 pm", "electron_configuration": "[Ar] 4s²"}, "electromagnetic": {"electronegativity": 1.00, "ionization_energy": "589.8 kJ/mol"}, "abundance": "41500 ppm"},
        {"number": 21, "symbol": "Sc", "name": "鈧", "row": 4, "col": 3, "category": "transition", "mass": 44.956, "encyclopedia": "鈧是一種質輕、柔軟的銀白色過渡金屬，通常與釔及鑭系元素合稱為稀土元素。主要用於製造高性能合金，例如用於航太工業的鋁鈧合金，以及高強度金屬鹵化物燈。", "physical": {"state": "固態", "melting_point": "1814 K", "boiling_point": "3109 K", "density": "2.985 g/cm³"}, "atomic": {"atomic_radius": "184 pm", "covalent_radius": "144 pm", "electron_configuration": "[Ar] 3d¹ 4s²"}, "electromagnetic": {"electronegativity": 1.36, "ionization_energy": "633.1 kJ/mol"}, "abundance": "22 ppm"},
        {"number": 22, "symbol": "Ti", "name": "鈦", "row": 4, "col": 4, "category": "transition", "mass": 47.867, "encyclopedia": "鈦是一種高強度、低密度的過渡金屬，具有優異的抗腐蝕性。其強度與鋼相當，但重量僅為其60%。廣泛應用於航太、醫療植入物及化工產業。", "physical": {"state": "固態", "melting_point": "1941 K", "boiling_point": "3560 K", "density": "4.506 g/cm³"}, "atomic": {"atomic_radius": "176 pm", "covalent_radius": "136 pm", "electron_configuration": "[Ar] 3d² 4s²"}, "electromagnetic": {"electronegativity": 1.54, "ionization_energy": "658.8 kJ/mol"}, "abundance": "5650 ppm"},
        {"number": 23, "symbol": "V", "name": "釩", "row": 4, "col": 5, "category": "transition", "mass": 50.942, "encyclopedia": "釩是一種中等硬度的銀灰色金屬，主要用於生產特種鋼合金，如高速工具鋼。釩鋼合金具有高強度、韌性和耐磨性。", "physical": {"state": "固態", "melting_point": "2183 K", "boiling_point": "3680 K", "density": "6.11 g/cm³"}, "atomic": {"atomic_radius": "171 pm", "covalent_radius": "125 pm", "electron_configuration": "[Ar] 3d³ 4s²"}, "electromagnetic": {"electronegativity": 1.63, "ionization_energy": "650.9 kJ/mol"}, "abundance": "120 ppm"},
        {"number": 24, "symbol": "Cr", "name": "鉻", "row": 4, "col": 6, "category": "transition", "mass": 51.996, "encyclopedia": "鉻是一種堅硬、有光澤的鋼灰色金屬，具有高熔點和優異的抗腐蝕性。主要用於不銹鋼製造和鉻電鍍，以提供堅硬、耐磨的保護層。", "physical": {"state": "固態", "melting_point": "2180 K", "boiling_point": "2944 K", "density": "7.19 g/cm³"}, "atomic": {"atomic_radius": "166 pm", "covalent_radius": "127 pm", "electron_configuration": "[Ar] 3d⁵ 4s¹"}, "electromagnetic": {"electronegativity": 1.66, "ionization_energy": "652.9 kJ/mol"}, "abundance": "102 ppm"},
        {"number": 25, "symbol": "Mn", "name": "錳", "row": 4, "col": 7, "category": "transition", "mass": 54.938, "encyclopedia": "錳是一種硬而脆的銀灰色金屬，是煉鋼過程中重要的脫氧劑和合金劑。它也是生物體必需的微量元素，參與多種酶的功能。", "physical": {"state": "固態", "melting_point": "1519 K", "boiling_point": "2334 K", "density": "7.21 g/cm³"}, "atomic": {"atomic_radius": "161 pm", "covalent_radius": "139 pm", "electron_configuration": "[Ar] 3d⁵ 4s²"}, "electromagnetic": {"electronegativity": 1.55, "ionization_energy": "717.3 kJ/mol"}, "abundance": "950 ppm"},
        {"number": 26, "symbol": "Fe", "name": "鐵", "row": 4, "col": 8, "category": "transition", "mass": 55.845, "encyclopedia": "鐵是地球上分佈最廣、最重要的金屬，是現代工業的支柱。它是製造鋼鐵的主要原料。在生物體中，鐵是血紅蛋白的關鍵成分，負責運輸氧氣。", "physical": {"state": "固態", "melting_point": "1811 K", "boiling_point": "3134 K", "density": "7.874 g/cm³"}, "atomic": {"atomic_radius": "156 pm", "covalent_radius": "125 pm", "electron_configuration": "[Ar] 3d⁶ 4s²"}, "electromagnetic": {"electronegativity": 1.83, "ionization_energy": "762.5 kJ/mol"}, "abundance": "56300 ppm"},
        {"number": 27, "symbol": "Co", "name": "鈷", "row": 4, "col": 9, "category": "transition", "mass": 58.933, "encyclopedia": "鈷是一種堅硬、有磁性的銀白色金屬。其合金具有優異的耐高溫和耐磨損性能，用於製造噴氣發動機和燃氣輪機。鈷的化合物常呈現鮮豔的藍色。", "physical": {"state": "固態", "melting_point": "1768 K", "boiling_point": "3200 K", "density": "8.90 g/cm³"}, "atomic": {"atomic_radius": "152 pm", "covalent_radius": "126 pm", "electron_configuration": "[Ar] 3d⁷ 4s²"}, "electromagnetic": {"electronegativity": 1.88, "ionization_energy": "760.4 kJ/mol"}, "abundance": "25 ppm"},
        {"number": 28, "symbol": "Ni", "name": "鎳", "row": 4, "col": 10, "category": "transition", "mass": 58.693, "encyclopedia": "鎳是一種銀白色的鐵磁性金屬，具有很強的抗腐蝕能力。主要用於製造不銹鋼和其他合金，也用作催化劑和電池材料。", "physical": {"state": "固態", "melting_point": "1728 K", "boiling_point": "3186 K", "density": "8.908 g/cm³"}, "atomic": {"atomic_radius": "149 pm", "covalent_radius": "121 pm", "electron_configuration": "[Ar] 3d⁸ 4s²"}, "electromagnetic": {"electronegativity": 1.91, "ionization_energy": "737.1 kJ/mol"}, "abundance": "84 ppm"},
        {"number": 29, "symbol": "Cu", "name": "銅", "row": 4, "col": 11, "category": "transition", "mass": 63.546, "encyclopedia": "銅是一種具有優良導電、導熱性的紅色金屬，延展性好。自古以來就是人類使用的重要金屬之一，廣泛用於電線、電子元件、管道和建築。", "physical": {"state": "固態", "melting_point": "1357.77 K", "boiling_point": "2835 K", "density": "8.96 g/cm³"}, "atomic": {"atomic_radius": "145 pm", "covalent_radius": "138 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s¹"}, "electromagnetic": {"electronegativity": 1.90, "ionization_energy": "745.5 kJ/mol"}, "abundance": "60 ppm"},
        {"number": 30, "symbol": "Zn", "name": "鋅", "row": 4, "col": 12, "category": "post-transition", "mass": 65.38, "encyclopedia": "鋅是一種藍白色金屬，主要用途是為鋼鐵鍍鋅以防腐蝕。它也是製造黃銅等合金的重要成分，並且是人體必需的微量元素。", "physical": {"state": "固態", "melting_point": "692.68 K", "boiling_point": "1180 K", "density": "7.14 g/cm³"}, "atomic": {"atomic_radius": "142 pm", "covalent_radius": "131 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s²"}, "electromagnetic": {"electronegativity": 1.65, "ionization_energy": "906.4 kJ/mol"}, "abundance": "70 ppm"},
        {"number": 31, "symbol": "Ga", "name": "鎵", "row": 4, "col": 13, "category": "post-transition", "mass": 69.723, "encyclopedia": "鎵是一種柔軟的銀色金屬，在室溫附近即為液態。其最重要用途是製造半導體材料，如砷化鎵（GaAs），用於製造微波電路和紅外線應用。", "physical": {"state": "固態", "melting_point": "302.91 K", "boiling_point": "2477 K", "density": "5.91 g/cm³"}, "atomic": {"atomic_radius": "136 pm", "covalent_radius": "126 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s² 4p¹"}, "electromagnetic": {"electronegativity": 1.81, "ionization_energy": "578.8 kJ/mol"}, "abundance": "19 ppm"},
        {"number": 32, "symbol": "Ge", "name": "鍺", "row": 4, "col": 14, "category": "metalloid", "mass": 72.630, "encyclopedia": "鍺是一種硬、脆、有光澤的灰白色准金屬，化學性質與矽相似。它是一種重要的半導體，用於電晶體和紅外光學，也用作催化劑。", "physical": {"state": "固態", "melting_point": "1211.4 K", "boiling_point": "3106 K", "density": "5.323 g/cm³"}, "atomic": {"atomic_radius": "125 pm", "covalent_radius": "122 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s² 4p²"}, "electromagnetic": {"electronegativity": 2.01, "ionization_energy": "762 kJ/mol"}, "abundance": "1.5 ppm"},
        {"number": 33, "symbol": "As", "name": "砷", "row": 4, "col": 15, "category": "metalloid", "mass": 74.922, "encyclopedia": "砷，俗稱砒，是一種著名的有毒准金屬。它有黃色、灰色和黑色三種同素異形體。砷化物半導體（如砷化鎵）在電子工業中有重要應用。", "physical": {"state": "固態", "melting_point": "1090 K (升華)", "boiling_point": "887 K (升華)", "density": "5.727 g/cm³ (灰砷)"}, "atomic": {"atomic_radius": "114 pm", "covalent_radius": "119 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s² 4p³"}, "electromagnetic": {"electronegativity": 2.18, "ionization_energy": "947.0 kJ/mol"}, "abundance": "1.8 ppm"},
        {"number": 34, "symbol": "Se", "name": "硒", "row": 4, "col": 16, "category": "nonmetal", "mass": 78.971, "encyclopedia": "硒是一種非金屬，具有光電效應，其導電性隨光照強度變化。因此被用於光電管和太陽能電池。它也是人體必需的微量營養素。", "physical": {"state": "固態", "melting_point": "494 K", "boiling_point": "958 K", "density": "4.81 g/cm³ (灰硒)"}, "atomic": {"atomic_radius": "103 pm", "covalent_radius": "116 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s² 4p⁴"}, "electromagnetic": {"electronegativity": 2.55, "ionization_energy": "941.0 kJ/mol"}, "abundance": "0.05 ppm"},
        {"number": 35, "symbol": "Br", "name": "溴", "row": 4, "col": 17, "category": "halogen", "mass": 79.904, "encyclopedia": "溴是在室溫下呈液態的唯一非金屬元素，呈紅棕色，具揮發性且有毒。其化合物被用作阻燃劑、淨水劑和藥物。", "physical": {"state": "液態", "melting_point": "265.8 K", "boiling_point": "332 K", "density": "3.1028 g/cm³"}, "atomic": {"atomic_radius": "94 pm", "covalent_radius": "114 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s² 4p⁵"}, "electromagnetic": {"electronegativity": 2.96, "ionization_energy": "1139.9 kJ/mol"}, "abundance": "2.4 ppm"},
        {"number": 36, "symbol": "Kr", "name": "氪", "row": 4, "col": 18, "category": "noble", "mass": 83.798, "encyclopedia": "氪是一種無色、無味的稀有氣體。它在空氣中的含量極低。氪被用於某些類型的高性能燈具和雷射器，其同位素也用於核磁共振成像（MRI）。", "physical": {"state": "氣態", "melting_point": "115.79 K", "boiling_point": "119.93 K", "density": "3.749 g/L"}, "atomic": {"atomic_radius": "88 pm", "covalent_radius": "110 pm", "electron_configuration": "[Ar] 3d¹⁰ 4s² 4p⁶"}, "electromagnetic": {"electronegativity": 3.00, "ionization_energy": "1350.8 kJ/mol"}, "abundance": "0.0001 ppm"},
        {"number": 37, "symbol": "Rb", "name": "銣", "row": 5, "col": 1, "category": "alkali", "mass": 85.468, "encyclopedia": "銣是一種非常柔軟、銀白色的鹼金屬，化學性質極其活潑，在空氣中會自燃。主要用於科學研究，例如製造原子鐘和用於雷射冷卻。", "physical": {"state": "固態", "melting_point": "312.46 K", "boiling_point": "961 K", "density": "1.532 g/cm³"}, "atomic": {"atomic_radius": "265 pm", "covalent_radius": "211 pm", "electron_configuration": "[Kr] 5s¹"}, "electromagnetic": {"electronegativity": 0.82, "ionization_energy": "403.0 kJ/mol"}, "abundance": "90 ppm"},
        {"number": 38, "symbol": "Sr", "name": "鍶", "row": 5, "col": 2, "category": "alkaline", "mass": 87.62, "encyclopedia": "鍶是一種質軟的銀白色鹼土金屬，在空氣中會迅速氧化。其鹽類燃燒時會產生明亮的緋紅色火焰，因此常用於製造煙火和信號彈。", "physical": {"state": "固態", "melting_point": "1050 K", "boiling_point": "1655 K", "density": "2.64 g/cm³"}, "atomic": {"atomic_radius": "219 pm", "covalent_radius": "192 pm", "electron_configuration": "[Kr] 5s²"}, "electromagnetic": {"electronegativity": 0.95, "ionization_energy": "549.5 kJ/mol"}, "abundance": "370 ppm"},
        {"number": 39, "symbol": "Y", "name": "釔", "row": 5, "col": 3, "category": "transition", "mass": 88.906, "encyclopedia": "釔是一種化學性質與鑭系元素相似的過渡金屬。它被用於製造多種合成材料，也是紅色磷光體的關鍵成分，用於彩色電視顯像管和LED。", "physical": {"state": "固態", "melting_point": "1799 K", "boiling_point": "3609 K", "density": "4.472 g/cm³"}, "atomic": {"atomic_radius": "212 pm", "covalent_radius": "162 pm", "electron_configuration": "[Kr] 4d¹ 5s²"}, "electromagnetic": {"electronegativity": 1.22, "ionization_energy": "600 kJ/mol"}, "abundance": "33 ppm"},
        {"number": 40, "symbol": "Zr", "name": "鋯", "row": 5, "col": 4, "category": "transition", "mass": 91.224, "encyclopedia": "鋯是一種抗腐蝕能力極強的過渡金屬。由於其中子吸收截面很小，鋯合金被廣泛用作核反應堆的燃料棒包殼材料。", "physical": {"state": "固態", "melting_point": "2128 K", "boiling_point": "4682 K", "density": "6.52 g/cm³"}, "atomic": {"atomic_radius": "206 pm", "covalent_radius": "148 pm", "electron_configuration": "[Kr] 4d² 5s²"}, "electromagnetic": {"electronegativity": 1.33, "ionization_energy": "640.1 kJ/mol"}, "abundance": "165 ppm"},
        {"number": 41, "symbol": "Nb", "name": "鈮", "row": 5, "col": 5, "category": "transition", "mass": 92.906, "encyclopedia": "鈮是一種質軟、帶光澤的灰色過渡金屬，具有超導特性。主要用於生產高強度低合金鋼，以及用於噴氣發動機和火箭的超合金。", "physical": {"state": "固態", "melting_point": "2750 K", "boiling_point": "5017 K", "density": "8.57 g/cm³"}, "atomic": {"atomic_radius": "198 pm", "covalent_radius": "137 pm", "electron_configuration": "[Kr] 4d⁴ 5s¹"}, "electromagnetic": {"electronegativity": 1.6, "ionization_energy": "652.1 kJ/mol"}, "abundance": "20 ppm"},
        {"number": 42, "symbol": "Mo", "name": "鉬", "row": 5, "col": 6, "category": "transition", "mass": 95.96, "encyclopedia": "鉬是一種銀灰色金屬，熔點非常高。它主要用於製造高強度鋼合金和高溫合金。同時，它也是植物必需的微量營養素。", "physical": {"state": "固態", "melting_point": "2896 K", "boiling_point": "4912 K", "density": "10.28 g/cm³"}, "atomic": {"atomic_radius": "190 pm", "covalent_radius": "145 pm", "electron_configuration": "[Kr] 4d⁵ 5s¹"}, "electromagnetic": {"electronegativity": 2.16, "ionization_energy": "684.3 kJ/mol"}, "abundance": "1.2 ppm"},
        {"number": 43, "symbol": "Tc", "name": "鎝", "row": 5, "col": 7, "category": "transition", "mass": 98, "encyclopedia": "鎝是第一種人工合成的元素，是一種銀灰色的放射性金屬。其同位素鎝-99m是醫學診斷中應用最廣泛的放射性同位素。", "physical": {"state": "固態", "melting_point": "2430 K", "boiling_point": "4538 K", "density": "11.5 g/cm³"}, "atomic": {"atomic_radius": "183 pm", "covalent_radius": "156 pm", "electron_configuration": "[Kr] 4d⁵ 5s²"}, "electromagnetic": {"electronegativity": 1.9, "ionization_energy": "702 kJ/mol"}, "abundance": "人工合成"},
        {"number": 44, "symbol": "Ru", "name": "釕", "row": 5, "col": 8, "category": "transition", "mass": 101.07, "encyclopedia": "釕是一種稀有的過渡金屬，屬於鉑系金屬。它非常堅硬、耐磨損，用作電觸點和硬化鉑和鈀的合金劑。", "physical": {"state": "固態", "melting_point": "2607 K", "boiling_point": "4423 K", "density": "12.45 g/cm³"}, "atomic": {"atomic_radius": "178 pm", "covalent_radius": "126 pm", "electron_configuration": "[Kr] 4d⁷ 5s¹"}, "electromagnetic": {"electronegativity": 2.2, "ionization_energy": "710.2 kJ/mol"}, "abundance": "0.001 ppm"},
        {"number": 45, "symbol": "Rh", "name": "銠", "row": 5, "col": 9, "category": "transition", "mass": 102.91, "encyclopedia": "銠是一種稀有、銀白色的堅硬過渡金屬，是鉑系金屬的一員。它具有極高的抗腐蝕性和反射性，主要用作催化轉換器和珠寶的鍍層。", "physical": {"state": "固態", "melting_point": "2237 K", "boiling_point": "3968 K", "density": "12.41 g/cm³"}, "atomic": {"atomic_radius": "173 pm", "covalent_radius": "135 pm", "electron_configuration": "[Kr] 4d⁸ 5s¹"}, "electromagnetic": {"electronegativity": 2.28, "ionization_energy": "719.7 kJ/mol"}, "abundance": "0.001 ppm"},
        {"number": 46, "symbol": "Pd", "name": "鈀", "row": 5, "col": 10, "category": "transition", "mass": 106.42, "encyclopedia": "鈀是一種稀有的銀白色過渡金屬，能夠吸收大量的氫氣。它主要用作汽車催化轉換器、電子元件和珠寶。", "physical": {"state": "固態", "melting_point": "1828.05 K", "boiling_point": "3236 K", "density": "12.023 g/cm³"}, "atomic": {"atomic_radius": "169 pm", "covalent_radius": "131 pm", "electron_configuration": "[Kr] 4d¹⁰"}, "electromagnetic": {"electronegativity": 2.20, "ionization_energy": "804.4 kJ/mol"}, "abundance": "0.015 ppm"},
        {"number": 47, "symbol": "Ag", "name": "銀", "row": 5, "col": 11, "category": "transition", "mass": 107.87, "encyclopedia": "銀是一種貴重金屬，具有所有金屬中最高的導電性、導熱性和反射率。自古以來就用於貨幣、珠寶和餐具。現代應用包括攝影和電子產品。", "physical": {"state": "固態", "melting_point": "1234.93 K", "boiling_point": "2435 K", "density": "10.49 g/cm³"}, "atomic": {"atomic_radius": "165 pm", "covalent_radius": "153 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s¹"}, "electromagnetic": {"electronegativity": 1.93, "ionization_energy": "731.0 kJ/mol"}, "abundance": "0.075 ppm"},
        {"number": 48, "symbol": "Cd", "name": "鎘", "row": 5, "col": 12, "category": "post-transition", "mass": 112.41, "encyclopedia": "鎘是一種柔軟、藍白色的有毒過渡金屬。主要用途是製造鎳鎘電池和用作防腐蝕的電鍍層。由於其毒性，其使用受到嚴格限制。", "physical": {"state": "固態", "melting_point": "594.22 K", "boiling_point": "1040 K", "density": "8.65 g/cm³"}, "atomic": {"atomic_radius": "161 pm", "covalent_radius": "148 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s²"}, "electromagnetic": {"electronegativity": 1.69, "ionization_energy": "867.8 kJ/mol"}, "abundance": "0.15 ppm"},
        {"number": 49, "symbol": "In", "name": "銦", "row": 5, "col": 13, "category": "post-transition", "mass": 114.82, "encyclopedia": "銦是一種非常柔軟、銀白色的後過渡金屬。它的一個主要用途是製造氧化銦錫（ITO），用於製造液晶顯示器和觸控螢幕的透明導電薄膜。", "physical": {"state": "固態", "melting_point": "429.75 K", "boiling_point": "2345 K", "density": "7.31 g/cm³"}, "atomic": {"atomic_radius": "156 pm", "covalent_radius": "144 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s² 5p¹"}, "electromagnetic": {"electronegativity": 1.78, "ionization_energy": "558.3 kJ/mol"}, "abundance": "0.25 ppm"},
        {"number": 50, "symbol": "Sn", "name": "錫", "row": 5, "col": 14, "category": "post-transition", "mass": 118.71, "encyclopedia": "錫是一種銀白色、質軟的金屬，不易被氧化。自古以來就用於製造青銅（銅錫合金）。現代主要用於製造焊料和鍍錫鋼（馬口鐵）。", "physical": {"state": "固態", "melting_point": "505.08 K", "boiling_point": "2875 K", "density": "7.31 g/cm³"}, "atomic": {"atomic_radius": "145 pm", "covalent_radius": "141 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s² 5p²"}, "electromagnetic": {"electronegativity": 1.96, "ionization_energy": "708.6 kJ/mol"}, "abundance": "2.3 ppm"},
        {"number": 51, "symbol": "Sb", "name": "銻", "row": 5, "col": 15, "category": "metalloid", "mass": 121.76, "encyclopedia": "銻是一種有光澤的銀灰色准金屬，質硬而脆。主要用作阻燃劑，以及用於製造鉛酸電池和合金。", "physical": {"state": "固態", "melting_point": "903.78 K", "boiling_point": "1860 K", "density": "6.697 g/cm³"}, "atomic": {"atomic_radius": "133 pm", "covalent_radius": "138 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s² 5p³"}, "electromagnetic": {"electronegativity": 2.05, "ionization_energy": "834 kJ/mol"}, "abundance": "0.2 ppm"},
        {"number": 52, "symbol": "Te", "name": "碲", "row": 5, "col": 16, "category": "metalloid", "mass": 127.60, "encyclopedia": "碲是一種稀有的、銀白色的准金屬，性質介於金屬和非金屬之間。它主要用作鋼和銅的合金劑，也用於製造半導體和太陽能電池板。", "physical": {"state": "固態", "melting_point": "722.66 K", "boiling_point": "1261 K", "density": "6.24 g/cm³"}, "atomic": {"atomic_radius": "123 pm", "covalent_radius": "135 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s² 5p⁴"}, "electromagnetic": {"electronegativity": 2.1, "ionization_energy": "869.3 kJ/mol"}, "abundance": "0.001 ppm"},
        {"number": 53, "symbol": "I", "name": "碘", "row": 5, "col": 17, "category": "halogen", "mass": 126.90, "encyclopedia": "碘是一種紫黑色、有光澤的固體鹵素，加熱時會昇華為紫色氣體。它是人體甲狀腺激素的重要成分。碘酊被用作消毒劑。", "physical": {"state": "固態", "melting_point": "386.85 K", "boiling_point": "457.4 K", "density": "4.933 g/cm³"}, "atomic": {"atomic_radius": "115 pm", "covalent_radius": "133 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s² 5p⁵"}, "electromagnetic": {"electronegativity": 2.66, "ionization_energy": "1008.4 kJ/mol"}, "abundance": "0.45 ppm"},
        {"number": 54, "symbol": "Xe", "name": "氙", "row": 5, "col": 18, "category": "noble", "mass": 131.29, "encyclopedia": "氙是一種稠密、無色的稀有氣體。它是第一種被發現能形成化合物的稀有氣體。氙氣燈能發出強烈的白光，用於汽車頭燈和電影放映機。", "physical": {"state": "氣態", "melting_point": "161.4 K", "boiling_point": "165.05 K", "density": "5.894 g/L"}, "atomic": {"atomic_radius": "108 pm", "covalent_radius": "130 pm", "electron_configuration": "[Kr] 4d¹⁰ 5s² 5p⁶"}, "electromagnetic": {"electronegativity": 2.6, "ionization_energy": "1170.4 kJ/mol"}, "abundance": "0.00003 ppm"},
        {"number": 55, "symbol": "Cs", "name": "銫", "row": 6, "col": 1, "category": "alkali", "mass": 132.91, "encyclopedia": "銫是一種極其柔軟、銀金色的鹼金屬，熔點僅為28.5 °C。它是電負性最低的元素之一。銫-133同位素被用於製造極其精確的原子鐘。", "physical": {"state": "固態", "melting_point": "301.7 K", "boiling_point": "944 K", "density": "1.93 g/cm³"}, "atomic": {"atomic_radius": "298 pm", "covalent_radius": "225 pm", "electron_configuration": "[Xe] 6s¹"}, "electromagnetic": {"electronegativity": 0.79, "ionization_energy": "375.7 kJ/mol"}, "abundance": "3 ppm"},
        {"number": 56, "symbol": "Ba", "name": "鋇", "row": 6, "col": 2, "category": "alkaline", "mass": 137.33, "encyclopedia": "鋇是一種柔軟的銀白色鹼土金屬，化學性質活潑。由於其密度高，硫酸鋇被用作醫學成像中的X射線造影劑（鋇餐）。", "physical": {"state": "固態", "melting_point": "1000 K", "boiling_point": "2170 K", "density": "3.51 g/cm³"}, "atomic": {"atomic_radius": "253 pm", "covalent_radius": "198 pm", "electron_configuration": "[Xe] 6s²"}, "electromagnetic": {"electronegativity": 0.89, "ionization_energy": "502.9 kJ/mol"}, "abundance": "425 ppm"},
        {"number": 57, "symbol": "La", "name": "鑭", "row": 9, "col": 3, "category": "lanthanide", "mass": 138.91, "encyclopedia": "鑭是鑭系元素的第一個元素，是一種柔軟、可延展的銀白色金屬。它被用於製造相機鏡頭和混合動力汽車電池中的合金。", "physical": {"state": "固態", "melting_point": "1193 K", "boiling_point": "3737 K", "density": "6.162 g/cm³"}, "atomic": {"atomic_radius": "195 pm", "covalent_radius": "169 pm", "electron_configuration": "[Xe] 5d¹ 6s²"}, "electromagnetic": {"electronegativity": 1.10, "ionization_energy": "538.1 kJ/mol"}, "abundance": "39 ppm"},
        {"number": 58, "symbol": "Ce", "name": "鈰", "row": 9, "col": 4, "category": "lanthanide", "mass": 140.12, "encyclopedia": "鈰是地殼中含量最豐富的稀土元素。它是一種柔軟、銀白色的金屬，用於製造打火石、自清潔烤箱和作為催化劑。", "physical": {"state": "固態", "melting_point": "1068 K", "boiling_point": "3716 K", "density": "6.770 g/cm³"}, "atomic": {"atomic_radius": "185 pm", "covalent_radius": "165 pm", "electron_configuration": "[Xe] 4f¹ 5d¹ 6s²"}, "electromagnetic": {"electronegativity": 1.12, "ionization_energy": "534.4 kJ/mol"}, "abundance": "66.5 ppm"},
        {"number": 59, "symbol": "Pr", "name": "鐠", "row": 9, "col": 5, "category": "lanthanide", "mass": 140.91, "encyclopedia": "鐠是一種柔軟、可延展的銀白色鑭系金屬。它與鎂形成的合金強度高，用於飛機發動機。其玻璃呈黃綠色，用於護目鏡。", "physical": {"state": "固態", "melting_point": "1208 K", "boiling_point": "3793 K", "density": "6.77 g/cm³"}, "atomic": {"atomic_radius": "185 pm", "covalent_radius": "165 pm", "electron_configuration": "[Xe] 4f³ 6s²"}, "electromagnetic": {"electronegativity": 1.13, "ionization_energy": "527 kJ/mol"}, "abundance": "9.2 ppm"},
        {"number": 60, "symbol": "Nd", "name": "釹", "row": 9, "col": 6, "category": "lanthanide", "mass": 144.24, "encyclopedia": "釹是一種質軟的銀白色稀土金屬。它最重要的用途是製造釹磁鐵（NdFeB），這是目前最強的永久磁鐵，廣泛用於電子產品和電動機。", "physical": {"state": "固態", "melting_point": "1297 K", "boiling_point": "3347 K", "density": "7.01 g/cm³"}, "atomic": {"atomic_radius": "184 pm", "covalent_radius": "164 pm", "electron_configuration": "[Xe] 4f⁴ 6s²"}, "electromagnetic": {"electronegativity": 1.14, "ionization_energy": "533.1 kJ/mol"}, "abundance": "41.5 ppm"},
        {"number": 61, "symbol": "Pm", "name": "鉕", "row": 9, "col": 7, "category": "lanthanide", "mass": 145, "encyclopedia": "鉕是所有鑭系元素中唯一一個沒有穩定同位素的放射性元素。它在自然界中極其罕見。主要用於發光塗料和核電池。", "physical": {"state": "固態", "melting_point": "1315 K", "boiling_point": "3273 K", "density": "7.26 g/cm³"}, "atomic": {"atomic_radius": "183 pm", "covalent_radius": "163 pm", "electron_configuration": "[Xe] 4f⁵ 6s²"}, "electromagnetic": {"electronegativity": 1.13, "ionization_energy": "540 kJ/mol"}, "abundance": "人工合成"},
        {"number": 62, "symbol": "Sm", "name": "釤", "row": 9, "col": 8, "category": "lanthanide", "mass": 150.36, "encyclopedia": "釤是一種銀白色的稀土金屬，在空氣中相對穩定。其最重要的用途是與鈷製成釤鈷磁鐵，這是一種高溫性能優異的強力永久磁鐵。", "physical": {"state": "固態", "melting_point": "1345 K", "boiling_point": "2067 K", "density": "7.52 g/cm³"}, "atomic": {"atomic_radius": "180 pm", "covalent_radius": "162 pm", "electron_configuration": "[Xe] 4f⁶ 6s²"}, "electromagnetic": {"electronegativity": 1.17, "ionization_energy": "544.5 kJ/mol"}, "abundance": "7.05 ppm"},
        {"number": 63, "symbol": "Eu", "name": "銪", "row": 9, "col": 9, "category": "lanthanide", "mass": 151.96, "encyclopedia": "銪是所有鑭系元素中最活潑的一個。它主要用作紅色和藍色磷光體，應用於陰極射線管顯示器和螢光燈中。", "physical": {"state": "固態", "melting_point": "1099 K", "boiling_point": "1802 K", "density": "5.264 g/cm³"}, "atomic": {"atomic_radius": "180 pm", "covalent_radius": "199 pm", "electron_configuration": "[Xe] 4f⁷ 6s²"}, "electromagnetic": {"electronegativity": 1.2, "ionization_energy": "547.1 kJ/mol"}, "abundance": "2 ppm"},
        {"number": 64, "symbol": "Gd", "name": "釓", "row": 9, "col": 10, "category": "lanthanide", "mass": 157.25, "encyclopedia": "釓是一種銀白色稀土金屬，在室溫下具有鐵磁性。它的中子吸收截面非常高，因此被用作核反應堆的控制棒材料。也用作MRI造影劑。", "physical": {"state": "固態", "melting_point": "1585 K", "boiling_point": "3546 K", "density": "7.90 g/cm³"}, "atomic": {"atomic_radius": "180 pm", "covalent_radius": "161 pm", "electron_configuration": "[Xe] 4f⁷ 5d¹ 6s²"}, "electromagnetic": {"electronegativity": 1.2, "ionization_energy": "593.4 kJ/mol"}, "abundance": "6.2 ppm"},
        {"number": 65, "symbol": "Tb", "name": "鋱", "row": 9, "col": 11, "category": "lanthanide", "mass": 158.93, "encyclopedia": "鋱是一種柔軟、可延展的銀灰色稀土金屬。它被用於製造綠色磷光體、磁致伸縮材料（如Terfenol-D）和固態硬碟。", "physical": {"state": "固態", "melting_point": "1629 K", "boiling_point": "3503 K", "density": "8.23 g/cm³"}, "atomic": {"atomic_radius": "177 pm", "covalent_radius": "159 pm", "electron_configuration": "[Xe] 4f⁹ 6s²"}, "electromagnetic": {"electronegativity": 1.2, "ionization_energy": "565.8 kJ/mol"}, "abundance": "1.2 ppm"},
        {"number": 66, "symbol": "Dy", "name": "鏑", "row": 9, "col": 12, "category": "lanthanide", "mass": 162.50, "encyclopedia": "鏑是一種具有金屬光澤的稀土金屬。它與鋱一樣被用於製造磁致伸縮材料Terfenol-D。鏑也用於核反應堆控制棒和高強度磁鐵。", "physical": {"state": "固態", "melting_point": "1680 K", "boiling_point": "2840 K", "density": "8.551 g/cm³"}, "atomic": {"atomic_radius": "178 pm", "covalent_radius": "159 pm", "electron_configuration": "[Xe] 4f¹⁰ 6s²"}, "electromagnetic": {"electronegativity": 1.22, "ionization_energy": "573.0 kJ/mol"}, "abundance": "5.2 ppm"},
        {"number": 67, "symbol": "Ho", "name": "鈥", "row": 9, "col": 13, "category": "lanthanide", "mass": 164.93, "encyclopedia": "鈥是所有天然元素中磁矩最高的，因此被用於製造最強的靜磁場。它是一種柔軟、可延展的銀白色稀土金屬。", "physical": {"state": "固態", "melting_point": "1734 K", "boiling_point": "2993 K", "density": "8.79 g/cm³"}, "atomic": {"atomic_radius": "176 pm", "covalent_radius": "158 pm", "electron_configuration": "[Xe] 4f¹¹ 6s²"}, "electromagnetic": {"electronegativity": 1.23, "ionization_energy": "581.0 kJ/mol"}, "abundance": "1.3 ppm"},
        {"number": 68, "symbol": "Er", "name": "鉺", "row": 9, "col": 14, "category": "lanthanide", "mass": 167.26, "encyclopedia": "鉺是一種銀白色的稀土金屬。摻鉺的光纖被用於光纖放大器，是現代長途光纖通信的關鍵技術。鉺的氧化物呈粉紅色。", "physical": {"state": "固態", "melting_point": "1802 K", "boiling_point": "3141 K", "density": "9.066 g/cm³"}, "atomic": {"atomic_radius": "176 pm", "covalent_radius": "157 pm", "electron_configuration": "[Xe] 4f¹² 6s²"}, "electromagnetic": {"electronegativity": 1.24, "ionization_energy": "589.3 kJ/mol"}, "abundance": "3.5 ppm"},
        {"number": 69, "symbol": "Tm", "name": "銩", "row": 9, "col": 15, "category": "lanthanide", "mass": 168.93, "encyclopedia": "銩是天然稀土元素中最稀有的。它是一種柔軟、明亮的銀灰色金屬。經中子活化後，銩-170可用作可攜式X射線設備的輻射源。", "physical": {"state": "固態", "melting_point": "1818 K", "boiling_point": "2223 K", "density": "9.32 g/cm³"}, "atomic": {"atomic_radius": "175 pm", "covalent_radius": "156 pm", "electron_configuration": "[Xe] 4f¹³ 6s²"}, "electromagnetic": {"electronegativity": 1.25, "ionization_energy": "596.7 kJ/mol"}, "abundance": "0.52 ppm"},
        {"number": 70, "symbol": "Yb", "name": "鐿", "row": 9, "col": 16, "category": "lanthanide", "mass": 173.05, "encyclopedia": "鐿是一種柔軟、有光澤的銀白色稀土金屬。它被用於製造某些類型的鋼合金、可攜式X射線源以及高精度原子鐘。", "physical": {"state": "固態", "melting_point": "1097 K", "boiling_point": "1469 K", "density": "6.90 g/cm³"}, "atomic": {"atomic_radius": "174 pm", "covalent_radius": "170 pm", "electron_configuration": "[Xe] 4f¹⁴ 6s²"}, "electromagnetic": {"electronegativity": 1.1, "ionization_energy": "603.4 kJ/mol"}, "abundance": "3.2 ppm"},
        {"number": 71, "symbol": "Lu", "name": "鎦", "row": 6, "col": 3, "category": "lanthanide", "mass": 174.97, "encyclopedia": "鎦是鑭系元素的最後一個成員，是一種銀白色的耐腐蝕金屬。由於其稀有和昂貴，工業用途非常有限，主要用於科學研究。", "physical": {"state": "固態", "melting_point": "1925 K", "boiling_point": "3675 K", "density": "9.841 g/cm³"}, "atomic": {"atomic_radius": "174 pm", "covalent_radius": "156 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹ 6s²"}, "electromagnetic": {"electronegativity": 1.27, "ionization_energy": "523.5 kJ/mol"}, "abundance": "0.8 ppm"},
        {"number": 72, "symbol": "Hf", "name": "鉿", "row": 6, "col": 4, "category": "transition", "mass": 178.49, "encyclopedia": "鉿是一種有光澤的銀灰色過渡金屬，化學性質與鋯非常相似。它具有良好的中子吸收能力，因此被用作核潛艇反應堆的控制棒。", "physical": {"state": "固態", "melting_point": "2506 K", "boiling_point": "4876 K", "density": "13.31 g/cm³"}, "atomic": {"atomic_radius": "159 pm", "covalent_radius": "150 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d² 6s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "658.5 kJ/mol"}, "abundance": "5.8 ppm"},
        {"number": 73, "symbol": "Ta", "name": "鉭", "row": 6, "col": 5, "category": "transition", "mass": 180.95, "encyclopedia": "鉭是一種稀有、堅硬、藍灰色的過渡金屬，具有極高的抗腐蝕性。主要用於製造電子元件，特別是電容器，也用於製造外科植入物。", "physical": {"state": "固態", "melting_point": "3290 K", "boiling_point": "5731 K", "density": "16.65 g/cm³"}, "atomic": {"atomic_radius": "149 pm", "covalent_radius": "138 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d³ 6s²"}, "electromagnetic": {"electronegativity": 1.5, "ionization_energy": "761 kJ/mol"}, "abundance": "2 ppm"},
        {"number": 74, "symbol": "W", "name": "鎢", "row": 6, "col": 6, "category": "transition", "mass": 183.84, "encyclopedia": "鎢是所有純金屬中熔點最高的（3695 K），也是沸點最高的元素之一。它非常堅硬、稠密，主要用於製造白熾燈的燈絲和硬質合金。", "physical": {"state": "固態", "melting_point": "3695 K", "boiling_point": "5828 K", "density": "19.25 g/cm³"}, "atomic": {"atomic_radius": "141 pm", "covalent_radius": "146 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d⁴ 6s²"}, "electromagnetic": {"electronegativity": 2.36, "ionization_energy": "770 kJ/mol"}, "abundance": "1.3 ppm"},
        {"number": 75, "symbol": "Re", "name": "錸", "row": 6, "col": 7, "category": "transition", "mass": 186.21, "encyclopedia": "錸是地殼中最稀有的元素之一，熔點和沸點極高。它主要用作高溫超合金的添加劑，用於製造噴氣發動機的零件。", "physical": {"state": "固態", "melting_point": "3459 K", "boiling_point": "5869 K", "density": "21.02 g/cm³"}, "atomic": {"atomic_radius": "137 pm", "covalent_radius": "159 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d⁵ 6s²"}, "electromagnetic": {"electronegativity": 1.9, "ionization_energy": "760 kJ/mol"}, "abundance": "0.0007 ppm"},
        {"number": 76, "symbol": "Os", "name": "鋨", "row": 6, "col": 8, "category": "transition", "mass": 190.23, "encyclopedia": "鋨是密度最大的穩定元素，是一種堅硬、易碎、藍白色的過渡金屬。它主要與其他鉑系金屬形成合金，用於製造鋼筆筆尖和電觸點等耐磨損部件。", "physical": {"state": "固態", "melting_point": "3306 K", "boiling_point": "5285 K", "density": "22.59 g/cm³"}, "atomic": {"atomic_radius": "135 pm", "covalent_radius": "128 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d⁶ 6s²"}, "electromagnetic": {"electronegativity": 2.2, "ionization_energy": "840 kJ/mol"}, "abundance": "0.0015 ppm"},
        {"number": 77, "symbol": "Ir", "name": "銥", "row": 6, "col": 9, "category": "transition", "mass": 192.22, "encyclopedia": "銥是抗腐蝕性第二強的金屬，也是鉑系金屬的一員。它非常堅硬、易碎。國際單位制中的公斤原器就是由鉑銥合金製成。", "physical": {"state": "固態", "melting_point": "2719 K", "boiling_point": "4701 K", "density": "22.56 g/cm³"}, "atomic": {"atomic_radius": "136 pm", "covalent_radius": "137 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d⁷ 6s²"}, "electromagnetic": {"electronegativity": 2.20, "ionization_energy": "880 kJ/mol"}, "abundance": "0.001 ppm"},
        {"number": 78, "symbol": "Pt", "name": "鉑", "row": 6, "col": 10, "category": "transition", "mass": 195.08, "encyclopedia": "鉑，俗稱白金，是一種貴重、稀有的過渡金屬。它具有出色的抗腐蝕性，主要用作催化劑、珠寶和實驗室設備。", "physical": {"state": "固態", "melting_point": "2041.4 K", "boiling_point": "4098 K", "density": "21.45 g/cm³"}, "atomic": {"atomic_radius": "139 pm", "covalent_radius": "128 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d⁹ 6s¹"}, "electromagnetic": {"electronegativity": 2.28, "ionization_energy": "870 kJ/mol"}, "abundance": "0.005 ppm"},
        {"number": 79, "symbol": "Au", "name": "金", "row": 6, "col": 11, "category": "transition", "mass": 196.97, "encyclopedia": "金是一種廣受歡迎的貴重金屬，以其黃色光澤、高延展性和化學穩定性而聞名。自古以來一直被用作貨幣、珠寶和藝術品。", "physical": {"state": "固態", "melting_point": "1337.33 K", "boiling_point": "3129 K", "density": "19.3 g/cm³"}, "atomic": {"atomic_radius": "144 pm", "covalent_radius": "144 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s¹"}, "electromagnetic": {"electronegativity": 2.54, "ionization_energy": "890.1 kJ/mol"}, "abundance": "0.004 ppm"},
        {"number": 80, "symbol": "Hg", "name": "汞", "row": 6, "col": 12, "category": "post-transition", "mass": 200.59, "encyclopedia": "汞，俗稱水銀，是在常溫下呈液態的唯一金屬。它是一種有毒的重金屬，曾被廣泛用於溫度計、氣壓計和牙科填充物，但現在已受到嚴格限制。", "physical": {"state": "液態", "melting_point": "234.32 K", "boiling_point": "629.88 K", "density": "13.534 g/cm³"}, "atomic": {"atomic_radius": "151 pm", "covalent_radius": "149 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s²"}, "electromagnetic": {"electronegativity": 2.00, "ionization_energy": "1007.1 kJ/mol"}, "abundance": "0.085 ppm"},
        {"number": 81, "symbol": "Tl", "name": "鉈", "row": 6, "col": 13, "category": "post-transition", "mass": 204.38, "encyclopedia": "鉈是一種柔軟、可延展的貧金屬，外觀類似錫，但接觸空氣後會變色。鉈及其化合物毒性極高，曾被用作滅鼠藥和殺蟲劑，但現已在多國禁用。", "physical": {"state": "固態", "melting_point": "577 K", "boiling_point": "1746 K", "density": "11.85 g/cm³"}, "atomic": {"atomic_radius": "156 pm", "covalent_radius": "148 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹"}, "electromagnetic": {"electronegativity": 1.62, "ionization_energy": "589.4 kJ/mol"}, "abundance": "0.85 ppm"},
        {"number": 82, "symbol": "Pb", "name": "鉛", "row": 6, "col": 14, "category": "post-transition", "mass": 207.2, "encyclopedia": "鉛是一種柔軟、延展性強的重金屬，具有藍白色光澤。它具有良好的抗腐蝕性，曾廣泛用於建築、管道和含鉛汽油，但因其毒性，現已大多被取代。", "physical": {"state": "固態", "melting_point": "600.61 K", "boiling_point": "2022 K", "density": "11.34 g/cm³"}, "atomic": {"atomic_radius": "154 pm", "covalent_radius": "147 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²"}, "electromagnetic": {"electronegativity": 2.33, "ionization_energy": "715.6 kJ/mol"}, "abundance": "14 ppm"},
        {"number": 83, "symbol": "Bi", "name": "鉍", "row": 6, "col": 15, "category": "post-transition", "mass": 208.98, "encyclopedia": "鉍是一種脆性重金屬，具有帶微紅的銀白色光澤。它是天然元素中反磁性最強的，且熱導率極低。鉍的化合物用於化妝品和藥品。", "physical": {"state": "固態", "melting_point": "544.7 K", "boiling_point": "1837 K", "density": "9.78 g/cm³"}, "atomic": {"atomic_radius": "143 pm", "covalent_radius": "146 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³"}, "electromagnetic": {"electronegativity": 2.02, "ionization_energy": "703 kJ/mol"}, "abundance": "0.0085 ppm"},
        {"number": 84, "symbol": "Po", "name": "釙", "row": 6, "col": 16, "category": "post-transition", "mass": 209, "encyclopedia": "釙是一種極其稀有且高度放射性的准金屬。由瑪麗·居禮和皮埃爾·居禮於1898年發現。它被用作中子源和消除靜電的裝置。", "physical": {"state": "固態", "melting_point": "527 K", "boiling_point": "1235 K", "density": "9.196 g/cm³"}, "atomic": {"atomic_radius": "135 pm", "covalent_radius": "140 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴"}, "electromagnetic": {"electronegativity": 2.0, "ionization_energy": "812.1 kJ/mol"}, "abundance": "極其稀有"},
        {"number": 85, "symbol": "At", "name": "砈", "row": 6, "col": 17, "category": "halogen", "mass": 210, "encyclopedia": "砈是一種高度放射性的鹵素，是地球上最稀有的天然元素之一。其化學性質預計與其他鹵素相似，特別是碘。主要用於科學研究。", "physical": {"state": "固態", "melting_point": "575 K", "boiling_point": "610 K", "density": "約 7 g/cm³"}, "atomic": {"atomic_radius": "127 pm", "covalent_radius": "145 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵"}, "electromagnetic": {"electronegativity": 2.2, "ionization_energy": "899 kJ/mol"}, "abundance": "極其稀有"},
        {"number": 86, "symbol": "Rn", "name": "氡", "row": 6, "col": 18, "category": "noble", "mass": 222, "encyclopedia": "氡是一種由鐳衰變產生的放射性、無色、無味的稀有氣體。它是密度最高的氣體之一，其積累是導致肺癌的一個重要原因。", "physical": {"state": "氣態", "melting_point": "202 K", "boiling_point": "211.5 K", "density": "9.73 g/L"}, "atomic": {"atomic_radius": "120 pm", "covalent_radius": "142 pm", "electron_configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶"}, "electromagnetic": {"electronegativity": 2.2, "ionization_energy": "1037 kJ/mol"}, "abundance": "極其稀有"},
        {"number": 87, "symbol": "Fr", "name": "鈁", "row": 7, "col": 1, "category": "alkali", "mass": 223, "encyclopedia": "鈁是電負性最低的元素之一，是一種高度放射性的鹼金屬。它在自然界中極其罕見，由錒衰變產生。由於其不穩定性，商業應用極少。", "physical": {"state": "固態", "melting_point": "300 K", "boiling_point": "950 K", "density": "1.87 g/cm³"}, "atomic": {"atomic_radius": "260 pm", "covalent_radius": "223 pm", "electron_configuration": "[Rn] 7s¹"}, "electromagnetic": {"electronegativity": 0.7, "ionization_energy": "380 kJ/mol"}, "abundance": "極其稀有"},
        {"number": 88, "symbol": "Ra", "name": "鐳", "row": 7, "col": 2, "category": "alkaline", "mass": 226, "encyclopedia": "鐳是一種幾乎純白色的放射性鹼土金屬，由瑪麗·居禮和皮埃爾·居禮於1898年發現。它曾被用於夜光塗料，但因其放射性危害現已停止使用。", "physical": {"state": "固態", "melting_point": "973 K", "boiling_point": "2010 K", "density": "5.5 g/cm³"}, "atomic": {"atomic_radius": "215 pm", "covalent_radius": "201 pm", "electron_configuration": "[Rn] 7s²"}, "electromagnetic": {"electronegativity": 0.9, "ionization_energy": "509.3 kJ/mol"}, "abundance": "極其稀有"},
        {"number": 89, "symbol": "Ac", "name": "錒", "row": 10, "col": 3, "category": "actinide", "mass": 227, "encyclopedia": "錒是錒系元素的第一個成員，是一種柔軟、銀白色的放射性金屬。它在黑暗中會發出淡藍色的光。主要用作中子源。", "physical": {"state": "固態", "melting_point": "1323 K", "boiling_point": "3471 K", "density": "10 g/cm³"}, "atomic": {"atomic_radius": "195 pm", "covalent_radius": "186 pm", "electron_configuration": "[Rn] 6d¹ 7s²"}, "electromagnetic": {"electronegativity": 1.1, "ionization_energy": "499 kJ/mol"}, "abundance": "極其稀有"},
        {"number": 90, "symbol": "Th", "name": "釷", "row": 10, "col": 4, "category": "actinide", "mass": 232.04, "encyclopedia": "釷是一種微放射性的銀白色金屬，是核燃料的潛在替代品。其氧化物具有高熔點，用於燃氣燈紗罩。", "physical": {"state": "固態", "melting_point": "2115 K", "boiling_point": "5061 K", "density": "11.7 g/cm³"}, "atomic": {"atomic_radius": "180 pm", "covalent_radius": "165 pm", "electron_configuration": "[Rn] 6d² 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "587 kJ/mol"}, "abundance": "9.6 ppm"},
        {"number": 91, "symbol": "Pa", "name": "鏷", "row": 10, "col": 5, "category": "actinide", "mass": 231.04, "encyclopedia": "鏷是一種稠密、銀灰色的放射性錒系元素，非常稀有且有劇毒。目前除科學研究外沒有其他用途。", "physical": {"state": "固態", "melting_point": "1841 K", "boiling_point": "4300 K", "density": "15.37 g/cm³"}, "atomic": {"atomic_radius": "180 pm", "covalent_radius": "161 pm", "electron_configuration": "[Rn] 5f² 6d¹ 7s²"}, "electromagnetic": {"electronegativity": 1.5, "ionization_energy": "568 kJ/mol"}, "abundance": "極其稀有"},
        {"number": 92, "symbol": "U", "name": "鈾", "row": 10, "col": 6, "category": "actinide", "mass": 238.03, "encyclopedia": "鈾是一種銀白色的放射性重金屬，是核電站和核武器中最常用的燃料。其同位素鈾-235是可裂變物質。", "physical": {"state": "固態", "melting_point": "1405.3 K", "boiling_point": "4404 K", "density": "19.1 g/cm³"}, "atomic": {"atomic_radius": "175 pm", "covalent_radius": "170 pm", "electron_configuration": "[Rn] 5f³ 6d¹ 7s²"}, "electromagnetic": {"electronegativity": 1.38, "ionization_energy": "597.6 kJ/mol"}, "abundance": "2.7 ppm"},
        {"number": 93, "symbol": "Np", "name": "錼", "row": 10, "col": 7, "category": "actinide", "mass": 237, "encyclopedia": "錼是第一個人工合成的超鈾元素，是一種銀白色的放射性金屬。它被用於中子探測儀器。", "physical": {"state": "固態", "melting_point": "917 K", "boiling_point": "4273 K", "density": "20.45 g/cm³"}, "atomic": {"atomic_radius": "175 pm", "covalent_radius": "155 pm", "electron_configuration": "[Rn] 5f⁴ 6d¹ 7s²"}, "electromagnetic": {"electronegativity": 1.36, "ionization_energy": "604.5 kJ/mol"}, "abundance": "人工合成"},
        {"number": 94, "symbol": "Pu", "name": "鈽", "row": 10, "col": 8, "category": "actinide", "mass": 244, "encyclopedia": "鈽是一種銀白色的放射性錒系元素，是核武器和核反應堆的重要燃料。它也是放射性同位素熱電機的能量來源。", "physical": {"state": "固態", "melting_point": "912.5 K", "boiling_point": "3505 K", "density": "19.816 g/cm³"}, "atomic": {"atomic_radius": "175 pm", "covalent_radius": "153 pm", "electron_configuration": "[Rn] 5f⁶ 7s²"}, "electromagnetic": {"electronegativity": 1.28, "ionization_energy": "584.7 kJ/mol"}, "abundance": "人工合成"},
        {"number": 95, "symbol": "Am", "name": "鋂", "row": 10, "col": 9, "category": "actinide", "mass": 243, "encyclopedia": "鋂是一種銀白色的放射性金屬。其同位素鋂-241被廣泛用於家用離子式煙霧探測器。", "physical": {"state": "固態", "melting_point": "1449 K", "boiling_point": "2880 K", "density": "12 g/cm³"}, "atomic": {"atomic_radius": "175 pm", "covalent_radius": "166 pm", "electron_configuration": "[Rn] 5f⁷ 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "578 kJ/mol"}, "abundance": "人工合成"},
        {"number": 96, "symbol": "Cm", "name": "鋦", "row": 10, "col": 10, "category": "actinide", "mass": 247, "encyclopedia": "鋦是一種堅硬、稠密、銀白色的放射性金屬，以紀念瑪麗和皮埃爾·居禮而命名。用於航天任務中的α粒子X射線光譜儀。", "physical": {"state": "固態", "melting_point": "1613 K", "boiling_point": "3383 K", "density": "13.51 g/cm³"}, "atomic": {"atomic_radius": "174 pm", "covalent_radius": "166 pm", "electron_configuration": "[Rn] 5f⁷ 6d¹ 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "581 kJ/mol"}, "abundance": "人工合成"},
        {"number": 97, "symbol": "Bk", "name": "鉳", "row": 10, "col": 11, "category": "actinide", "mass": 247, "encyclopedia": "鉳是一種柔軟、銀白色的放射性金屬，以其發現地加州大學柏克萊分校命名。目前僅用於科學研究，以合成更重的元素。", "physical": {"state": "固態", "melting_point": "1259 K", "boiling_point": "2900 K", "density": "14.78 g/cm³"}, "atomic": {"atomic_radius": "170 pm", "covalent_radius": "168 pm", "electron_configuration": "[Rn] 5f⁹ 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "601 kJ/mol"}, "abundance": "人工合成"},
        {"number": 98, "symbol": "Cf", "name": "鉲", "row": 10, "col": 12, "category": "actinide", "mass": 251, "encyclopedia": "鉲是一種極強的放射性金屬，是已知最重的可被肉眼觀察的元素。其同位素鉲-252是一種非常強的中子發射體，用於啟動核反應堆和癌症治療。", "physical": {"state": "固態", "melting_point": "1173 K", "boiling_point": "1743 K", "density": "15.1 g/cm³"}, "atomic": {"atomic_radius": "186 pm", "covalent_radius": "168 pm", "electron_configuration": "[Rn] 5f¹⁰ 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "608 kJ/mol"}, "abundance": "人工合成"},
        {"number": 99, "symbol": "Es", "name": "鑀", "row": 10, "col": 13, "category": "actinide", "mass": 252, "encyclopedia": "鑀是一種人工合成的放射性元素，以紀念阿爾伯特·愛因斯坦命名。它在1952年第一次氫彈爆炸的殘骸中被發現。僅用於基礎科學研究。", "physical": {"state": "固態", "melting_point": "1133 K", "boiling_point": "1269 K", "density": "8.84 g/cm³"}, "atomic": {"atomic_radius": "186 pm", "covalent_radius": "165 pm", "electron_configuration": "[Rn] 5f¹¹ 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "619 kJ/mol"}, "abundance": "人工合成"},
        {"number": 100, "symbol": "Fm", "name": "鐨", "row": 10, "col": 14, "category": "actinide", "mass": 257, "encyclopedia": "鐨是一種高度放射性的人工合成元素，以紀念原子核物理學家恩里科·費米命名。它也是在1952年氫彈爆炸的殘骸中首次被發現。", "physical": {"state": "固態", "melting_point": "1800 K", "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": "167 pm", "electron_configuration": "[Rn] 5f¹² 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "627 kJ/mol"}, "abundance": "人工合成"},
        {"number": 101, "symbol": "Md", "name": "鍆", "row": 10, "col": 15, "category": "actinide", "mass": 258, "encyclopedia": "鍆是一種放射性人工合成元素，以紀念元素週期表的創始人德米特里·門得列夫命名。一次只能產生極少量的原子。", "physical": {"state": "固態", "melting_point": "1100 K", "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": "173 pm", "electron_configuration": "[Rn] 5f¹³ 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "635 kJ/mol"}, "abundance": "人工合成"},
        {"number": 102, "symbol": "No", "name": "鍩", "row": 10, "col": 16, "category": "actinide", "mass": 259, "encyclopedia": "鍩是一種人工合成的放射性元素，以阿爾弗雷德·諾貝爾命名。其化學性質的研究非常困難，因為它衰變得非常快。", "physical": {"state": "固態", "melting_point": "1100 K", "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": "176 pm", "electron_configuration": "[Rn] 5f¹⁴ 7s²"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "642 kJ/mol"}, "abundance": "人工合成"},
        {"number": 103, "symbol": "Lr", "name": "鐒", "row": 7, "col": 3, "category": "actinide", "mass": 262, "encyclopedia": "鐒是錒系元素的最後一個成員，是一種人工合成的放射性元素，以回旋加速器的發明者歐內斯特·勞倫斯命名。", "physical": {"state": "固態", "melting_point": "1900 K", "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": "161 pm", "electron_configuration": "[Rn] 5f¹⁴ 7s² 7p¹"}, "electromagnetic": {"electronegativity": 1.3, "ionization_energy": "470 kJ/mol"}, "abundance": "人工合成"},
        {"number": 104, "symbol": "Rf", "name": "鑪", "row": 7, "col": 4, "category": "transition", "mass": 267, "encyclopedia": "鑪是一種人工合成的超重元素，以紀念物理學家歐內斯特·盧瑟福命名。其化學性質預計與鉿相似。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d² 7s²"}, "electromagnetic": {"electronegativity": null, "ionization_energy": null}, "abundance": "人工合成"},
        {"number": 105, "symbol": "Db", "name": "𨧀", "row": 7, "col": 5, "category": "transition", "mass": 268, "encyclopedia": "𨧀是一種人工合成的超重元素，以其發現地之一的杜布納命名。其化學性質預計與鉭相似。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d³ 7s²"}, "electromagnetic": {"electronegativity": null, "ionization_energy": null}, "abundance": "人工合成"},
        {"number": 106, "symbol": "Sg", "name": "𨭎", "row": 7, "col": 6, "category": "transition", "mass": 271, "encyclopedia": "𨭎是一種人工合成的超重元素，以紀念化學家格倫·西奧多·西博格命名。其化學性質預計與鎢相似。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d⁴ 7s²"}, "electromagnetic": {"electronegativity": null, "ionization_energy": null}, "abundance": "人工合成"},
        {"number": 107, "symbol": "Bh", "name": "𨨏", "row": 7, "col": 7, "category": "transition", "mass": 270, "encyclopedia": "𨨏是一種人工合成的超重元素，以紀念物理學家尼爾斯·波耳命名。其化學性質預計與錸相似。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d⁵ 7s²"}, "electromagnetic": {"electronegativity": null, "ionization_energy": null}, "abundance": "人工合成"},
        {"number": 108, "symbol": "Hs", "name": "𨭆", "row": 7, "col": 8, "category": "transition", "mass": 277, "encyclopedia": "𨭆是一種人工合成的超重元素，以其發現地德國黑森邦命名。其化學性質預計與鋨相似。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d⁶ 7s²"}, "electromagnetic": {"electronegativity": null, "ionization_energy": null}, "abundance": "人工合成"},
        {"number": 109, "symbol": "Mt", "name": "䥑", "row": 7, "col": 9, "category": "unknown", "mass": 276, "encyclopedia": "䥑是一種人工合成的超重元素，以紀念核物理學家莉澤·邁特納命名。其化學性質預計與銥相似。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "covalent_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d⁷ 7s²"}, "electromagnetic": {"electronegativity": null, "ionization_energy": null}, "abundance": "人工合成"},
        {"number": 110, "symbol": "Ds", "name": "鐽", "row": 7, "col": 10, "category": "unknown", "mass": 281, "encyclopedia": "鐽是一種極不穩定的人工合成放射性元素，其化學性質知之甚少。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d⁹ 7s¹"}, "discovery": "重離子研究中心 (GSI), 1994", "abundance": "人工合成"},
        {"number": 111, "symbol": "Rg", "name": "錀", "row": 7, "col": 11, "category": "unknown", "mass": 282, "encyclopedia": "錀是一種極不穩定的人工合成放射性元素，預計其性質與金相似。", "physical": {"state": "固態", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d⁹ 7s²"}, "discovery": "重離子研究中心 (GSI), 1994", "abundance": "人工合成"},
        {"number": 112, "symbol": "Cn", "name": "鎶", "row": 7, "col": 12, "category": "post-transition", "mass": 285, "encyclopedia": "鎶是一種極不穩定的人工合成放射性元素，是化學性質已知的最重元素之一。", "physical": {"state": "氣態 (預測)", "melting_point": null, "boiling_point": "357 K (預測)", "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s²"}, "discovery": "重離子研究中心 (GSI), 1996", "abundance": "人工合成"},
        {"number": 113, "symbol": "Nh", "name": "鉨", "row": 7, "col": 13, "category": "unknown", "mass": 286, "encyclopedia": "鉨是一種極不穩定的人工合成放射性元素，以日本的國名命名。", "physical": {"state": "固態 (預測)", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹"}, "discovery": "理化學研究所 (RIKEN), 2003", "abundance": "人工合成"},
        {"number": 114, "symbol": "Fl", "name": "鈇", "row": 7, "col": 14, "category": "unknown", "mass": 289, "encyclopedia": "鈇是一種極不穩定的人工合成放射性元素，位於所謂的“穩定島”附近。", "physical": {"state": "固態 (預測)", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²"}, "discovery": "杜布納聯合原子核研究所, 1998", "abundance": "人工合成"},
        {"number": 115, "symbol": "Mc", "name": "鏌", "row": 7, "col": 15, "category": "unknown", "mass": 290, "encyclopedia": "鏌是一種極不穩定的人工合成放射性元素，以莫斯科州命名。", "physical": {"state": "固態 (預測)", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³"}, "discovery": "杜布納聯合原子核研究所, 2003", "abundance": "人工合成"},
        {"number": 116, "symbol": "Lv", "name": "鉝", "row": 7, "col": 16, "category": "unknown", "mass": 293, "encyclopedia": "鉝是一種極不穩定的人工合成放射性元素，以勞倫斯利佛摩國家實驗室命名。", "physical": {"state": "固態 (預測)", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴"}, "discovery": "杜布納聯合原子核研究所, 2000", "abundance": "人工合成"},
        {"number": 117, "symbol": "Ts", "name": "鿬", "row": 7, "col": 17, "category": "halogen", "mass": 294, "encyclopedia": "鿬是一種極不穩定的人工合成放射性元素，是已知的第二重元素。", "physical": {"state": "固態 (預測)", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵"}, "discovery": "杜布納聯合原子核研究所 & 橡樹嶺國家實驗室, 2010", "abundance": "人工合成"},
        {"number": 118, "symbol": "Og", "name": "鿫", "row": 7, "col": 18, "category": "noble", "mass": 294, "encyclopedia": "鿫是目前已知的最重元素，是一種人工合成的放射性稀有氣體。", "physical": {"state": "固態 (預測)", "melting_point": null, "boiling_point": null, "density": null}, "atomic": {"atomic_radius": null, "electron_configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶"}, "discovery": "杜布納聯合原子核研究所 & 勞倫斯利佛摩國家實驗室, 2002", "abundance": "人工合成"}
    ]
    const formulas = {
        newton: {
            display: "F = m * a",
            inputs: {
                m: { label: "質量 (m)", units: { kg: 1, g: 0.001 }, baseUnit: 'kg' },
                a: { label: "加速度 (a)", units: { 'm/s²': 1 }, baseUnit: 'm/s²' }
            },
            outputs: {
                F: { label: "力 (F)", unit: "N" }
            },
            calculate: (vals) => vals.m * vals.a
        },
        ohm: {
            display: "V = I * R",
            inputs: {
                I: { label: "電流 (I)", units: { A: 1, mA: 0.001 }, baseUnit: 'A' },
                R: { label: "電阻 (R)", units: { 'Ω': 1, 'kΩ': 1000 }, baseUnit: 'Ω' }
            },
            outputs: {
                V: { label: "電壓 (V)", unit: "V" }
            },
            calculate: (vals) => vals.I * vals.R
        },
        idealGas: {
            display: "P * V = n * R * T",
            inputs: {
                n: { label: "莫耳數 (n)", units: { mol: 1 }, baseUnit: 'mol' },
                T: { label: "溫度 (T)", units: { K: 1, '°C': (v) => v + 273.15 }, baseUnit: 'K' },
                V: { label: "體積 (V)", units: { 'm³': 1, 'L': 0.001 }, baseUnit: 'm³' }
            },
            outputs: {
                P: { label: "壓力 (P)", unit: "Pa" }
            },
            calculate: (vals) => (vals.n * R_CONSTANT * vals.T) / vals.V
        }
    };

    // DOM Element Selectors
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const periodicTableContainer = document.getElementById('periodic-table');

    const detailsPanel = document.getElementById('details-panel');
    const detailsTitle = document.getElementById('details-title');
    const detailsContent = document.getElementById('details-content');
    const formulaSelect = document.getElementById('formula-select');
    const formulaDisplay = document.getElementById('formula-display');
    const calculatorInputs = document.getElementById('calculator-inputs');
    const calculatorResult = document.getElementById('calculator-result');
    const formulaChartCanvas = document.getElementById('formula-chart');
    const chartContainer = document.getElementById('chart-container');
    const exportCalcBtn = document.getElementById('export-calc-btn');
    const categoryFilters = document.getElementById('category-filters');
    const heatmapSelect = document.getElementById('heatmap-select');

    // =================================================================================
    // Functions
    // =================================================================================

    /**
     * Displays the detailed properties of a given element in the sidebar panel.
     * @param {object} element The element object to display.
     */
    function displayElementDetails(element) {
        detailsTitle.textContent = `${element.number}. ${element.name} (${element.symbol})`;
        detailsContent.innerHTML = `
            <div class="detail-section">
                <h4>元素百科</h4>
                <p>${element.encyclopedia || '數據未提供'}</p>
            </div>
            <div class="detail-section">
                <h4>物理性質</h4>
                <p><strong>狀態:</strong> ${element.physical?.state || '未知'}</p>
                <p><strong>熔點:</strong> ${element.physical?.melting_point || '未知'}</p>
                <p><strong>沸點:</strong> ${element.physical?.boiling_point || '未知'}</p>
                <p><strong>密度:</strong> ${element.physical?.density || '未知'}</p>
            </div>
            <div class="detail-section">
                <h4>原子性質</h4>
                <p><strong>原子半徑:</strong> ${element.atomic?.atomic_radius || '未知'}</p>
                <p><strong>共價半徑:</strong> ${element.atomic?.covalent_radius || '未知'}</p>
                <p><strong>電子排布:</strong> ${element.atomic?.electron_configuration || '未知'}</p>
            </div>
            <div class="detail-section">
                <h4>電磁性質</h4>
                <p><strong>電負度:</strong> ${element.electromagnetic?.electronegativity === null ? '無' : element.electromagnetic?.electronegativity}</p>
                <p><strong>電離能:</strong> ${element.electromagnetic?.ionization_energy || '未知'}</p>
            </div>
            <div class="detail-section">
                <h4>含量</h4>
                <p>${element.abundance || '數據未提供'}</p>
            </div>
        `;
    }

    /**
     * Filters elements by category, applying visual styles.
     * @param {string} category The category to filter by. Use 'all' to show all.
     */
    function filterByCategory(category) {
        if (heatmapSelect.value !== 'off') return;
        elementsData.forEach(element => {
            const elementDiv = elementDivs[element.symbol];
            if (elementDiv) {
                const belongsToCategory = category === 'all' || element.category === category;
                elementDiv.classList.toggle('dimmed', !belongsToCategory);
                elementDiv.classList.toggle('highlight', belongsToCategory && category !== 'all');
            }
        });
    }

    /**
     * Renders the periodic table by dynamically creating element divs.
     */
    function renderPeriodicTable() {
        periodicTableContainer.innerHTML = ''; // Clear existing elements
        elementsData.forEach(element => {
            const elementDiv = document.createElement('div');
            elementDiv.classList.add('element', element.category);
            elementDiv.style.gridRow = element.row;
            elementDiv.style.gridColumn = element.col;
            elementDiv.dataset.symbol = element.symbol; // Store symbol for easy lookup

            elementDiv.innerHTML = `
                <div class="number">${element.number}</div>
                <div class="symbol">${element.symbol}</div>
                <div class="name">${element.name}</div>
                <div class="element-data">${element.mass.toFixed(3)}</div>
            `;

            // Store reference to the element div
            elementDivs[element.symbol] = elementDiv;

            // Add click listener for element details
            elementDiv.addEventListener('click', () => {
                displayElementDetails(element);
            });

            periodicTableContainer.appendChild(elementDiv);
        });
    }

    function switchTab(targetId) {
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.target === targetId) {
                button.classList.add('active');
            }
        });

        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    }

    // =================================================================================
    // Heatmap Visualization Functions
    // =================================================================================

    /**
     * Extracts and parses a numerical value for a given property from an element object.
     * @param {object} element The element data object.
     * @param {string} property The key for the desired property.
     * @returns {number|null} The numerical value or null if not available.
     */
    function getValue(element, property) {
        let value;
        const parseValue = (val) => {
            if (val === null || typeof val === 'undefined') return null;
            const cleanedString = String(val).replace(/[^0-9.-]/g, '');
            const num = parseFloat(cleanedString);
            return isNaN(num) ? null : num;
        };

        switch (property) {
            case 'mass':
                value = element.mass;
                break;
            case 'electronegativity':
                value = element.electromagnetic?.electronegativity;
                break;
            case 'atomic_radius':
                value = parseValue(element.atomic?.atomic_radius);
                break;
            case 'melting_point':
                value = parseValue(element.physical?.melting_point);
                break;
            case 'boiling_point':
                value = parseValue(element.physical?.boiling_point);
                break;
            default:
                value = null;
        }
        if (value === null || isNaN(value)) {
            return null;
        }
        return value;
    }

    /**
     * Reverts the periodic table from heatmap view to the default category-based view.
     */
    function revertToDefaultView() {
        elementsData.forEach(element => {
            const elementDiv = elementDivs[element.symbol];
            elementDiv.style.borderColor = '';
            elementDiv.style.backgroundColor = '';

            const dataDiv = elementDiv.querySelector('.element-data');
            if (dataDiv) {
                dataDiv.textContent = element.mass.toFixed(3);
            }
        });

        const activeCategory = categoryFilters.querySelector('button.active').dataset.category;
        filterByCategory(activeCategory);

    }

    /**
     * Applies a heatmap visualization to the periodic table based on a selected property.
     * @param {string} property The property to visualize.
     */
    function applyHeatmap(property) {
        if (property === 'off') {
            revertToDefaultView();
            return;
        }

        const values = elementsData.map(el => getValue(el, property)).filter(v => v !== null);
        if (values.length === 0) { // Handle case where no data exists for this property
            elementsData.forEach(element => {
                 const elementDiv = elementDivs[element.symbol];
                 const dataDiv = elementDiv.querySelector('.element-data');
                 elementDiv.style.borderColor = '#333';
                 elementDiv.style.backgroundColor = 'rgba(51, 51, 51, 0.2)';
                 if (dataDiv) dataDiv.textContent = 'N/A';
            });
            return;
        };

        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
        const range = maxVal - minVal;

        elementsData.forEach(element => {
            const elementDiv = elementDivs[element.symbol];
            const value = getValue(element, property);
            const dataDiv = elementDiv.querySelector('.element-data');

            elementDiv.classList.remove('dimmed', 'highlight');
            elementDiv.classList.remove('state-solid', 'state-liquid', 'state-gas', 'state-unknown');

            if (value === null) {
                elementDiv.style.borderColor = '#333';
                elementDiv.style.backgroundColor = 'rgba(51, 51, 51, 0.2)';
                if (dataDiv) dataDiv.textContent = 'N/A';
            } else {
                const ratio = range === 0 ? 1 : (value - minVal) / range;
                const red = Math.round(ratio * 255);
                const bgColor = `rgba(${red}, 0, 0, 0.2)`;
                elementDiv.style.backgroundColor = bgColor;
                elementDiv.style.borderColor = bgColor.replace('0.2)', '1)');

                if (dataDiv) dataDiv.textContent = value.toLocaleString();
            }
        });
    }


    // =================================================================================
    // Initialization and Event Listeners
    // =================================================================================



    /**
     * Generates the UI for the selected physics calculator formula.
     */
    function generateCalculatorUI() {
        const formulaKey = formulaSelect.value;
        const formula = formulas[formulaKey];

        formulaDisplay.textContent = formula.display;
        calculatorInputs.innerHTML = '';
        calculatorResult.innerHTML = '';
        chartContainer.style.display = 'none';

        Object.keys(formula.inputs).forEach(inputId => {
            const inputDef = formula.inputs[inputId];
            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group');

            const label = document.createElement('label');
            label.textContent = inputDef.label;
            inputGroup.appendChild(label);

            const wrapper = document.createElement('div');
            wrapper.classList.add('input-wrapper');

            const valueInput = document.createElement('input');
            valueInput.type = 'number';
            valueInput.id = `calc-input-${inputId}`;
            valueInput.value = 1;
            valueInput.addEventListener('input', calculateFormula);
            wrapper.appendChild(valueInput);

            const unitSelect = document.createElement('select');
            unitSelect.id = `calc-unit-${inputId}`;
            Object.keys(inputDef.units).forEach(unit => {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unit;
                unitSelect.appendChild(option);
            });
            unitSelect.addEventListener('change', calculateFormula);
            wrapper.appendChild(unitSelect);

            inputGroup.appendChild(wrapper);
            calculatorInputs.appendChild(inputGroup);
        });

        calculateFormula(); // Initial calculation
    }

    /**
     * Calculates the result of the currently selected formula.
     */
    function calculateFormula() {
        const formulaKey = formulaSelect.value;
        const formula = formulas[formulaKey];
        const values = {};
        let allInputsValid = true;

        Object.keys(formula.inputs).forEach(inputId => {
            const inputDef = formula.inputs[inputId];
            const valueInput = document.getElementById(`calc-input-${inputId}`);
            const unitSelect = document.getElementById(`calc-unit-${inputId}`);
            const rawValue = parseFloat(valueInput.value);

            if (isNaN(rawValue)) {
                allInputsValid = false;
                return;
            }

            const unit = unitSelect.value;
            const conversion = inputDef.units[unit];

            if (typeof conversion === 'function') {
                // For special conversions like °C to K
                values[inputId] = conversion(rawValue);
            } else {
                // For simple multiplicative conversions
                values[inputId] = rawValue * conversion;
            }
        });

        if (allInputsValid) {
            const result = formula.calculate(values);
            const outputDef = Object.values(formula.outputs)[0];
            calculatorResult.textContent = `${outputDef.label} = ${result.toFixed(4)} ${outputDef.unit}`;
            
            if (formulaKey === 'idealGas') {
                plotIdealGasChart(values);
            } else {
                chartContainer.style.display = 'none';
                if(formulaChart) {
                    formulaChart.destroy();
                    formulaChart = null;
                }
            }

        } else {
            calculatorResult.textContent = '請輸入有效的數字';
        }
    }

    /**
     * Plots the P-V curve for the Ideal Gas Law.
     * @param {object} currentValues The current input values for the calculation.
     */
    function plotIdealGasChart(currentValues) {
        chartContainer.style.display = 'block';

        if (formulaChart) {
            formulaChart.destroy();
        }

        const { n, T } = currentValues;
        const data = [];
        const minVolume = 0.0001; // Start from a small volume to avoid division by zero
        const maxVolume = currentValues.V * 2; // Plot up to double the current volume

        for (let i = 0; i < 50; i++) {
            const v = minVolume + (maxVolume - minVolume) * (i / 49);
            const p = (n * R_CONSTANT * T) / v;
            data.push({ x: v, y: p });
        }

        const ctx = formulaChartCanvas.getContext('2d');
        formulaChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'P-V 曲線 (等溫過程)',
                    data: data,
                    borderColor: 'rgba(14, 165, 233, 1)',
                    backgroundColor: 'rgba(14, 165, 233, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: '體積 (V) in m³'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '壓力 (P) in Pa'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `壓力: ${context.parsed.y.toFixed(2)} Pa, 體積: ${context.parsed.x.toFixed(4)} m³`;
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Exports the current calculation to a .txt file.
     */
    function exportCalculation() {
        const formulaKey = formulaSelect.value;
        const formula = formulas[formulaKey];
        let content = `物理公式計算結果\n`;
        content += `===================\n\n`;
        content += `公式: ${formula.display}\n\n`;
        content += `輸入:\n`;

        Object.keys(formula.inputs).forEach(inputId => {
            const valueInput = document.getElementById(`calc-input-${inputId}`);
            const unitSelect = document.getElementById(`calc-unit-${inputId}`);
            content += `- ${formula.inputs[inputId].label}: ${valueInput.value} ${unitSelect.value}\n`;
        });

        content += `\n結果:\n`;
        content += `${calculatorResult.textContent}\n`;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `calculation-${formulaKey}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.target);
        });
    });

    // Initial render of the periodic table
    renderPeriodicTable();



    // Calculator setup
    formulaSelect.addEventListener('change', generateCalculatorUI);
    exportCalcBtn.addEventListener('click', exportCalculation);
    generateCalculatorUI(); // Initial setup for the default formula

    // Category filter event listener
    categoryFilters.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            // Update active state on buttons
            categoryFilters.querySelector('button.active').classList.remove('active');
            target.classList.add('active');

            const category = target.dataset.category;
            filterByCategory(category);
        }
    });

    // Heatmap select event listener
    heatmapSelect.addEventListener('change', () => {
        applyHeatmap(heatmapSelect.value);
    });


    const resizer = document.getElementById('resizer');
    
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });

    function handleMouseMove(e) {
        if (!isResizing) return;
        const newWidth = Math.min(600, Math.max(250, window.innerWidth - e.clientX));
        detailsPanel.style.width = `${newWidth}px`;
    }
});
