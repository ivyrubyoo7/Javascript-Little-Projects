let CSV = document.getElementById('csv');
let button = document.getElementById('btn');

CSV.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const table = document.getElementById('table');
    table.innerHTML = '';

    const fileName = file.name.toLowerCase();

    // 🟢 HANDLE CSV
    if (fileName.endsWith('.csv')) {

        reader.onload = (e) => {
            const content = e.target.result;

            const rows = content.split('\n')
                .map(row => row.split(','));

            renderTable(rows);
        };

        reader.readAsText(file, 'UTF-8');
    }

    // 🔵 HANDLE EXCEL (.xlsx)
    else if (fileName.endsWith('.xlsx')) {

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);

            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            renderTable(rows);
        };

        reader.readAsArrayBuffer(file);
    }

    else {
        alert("Unsupported file type. Please upload CSV or XLSX.");
    }
});


// 🔥 Common Table Renderer
function renderTable(rows) {
    const table = document.getElementById('table');

    rows.forEach(row => {
        let tr = document.createElement('tr');

        row.forEach(cell => {
            let td = document.createElement('td');
            td.textContent = (cell || '').toString().trim();
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    CSV.style.display = 'none';
    button.style.display = 'block';
}


// 🔻 EXPORT (Same as before - CSV only)
button.addEventListener('click', () => {
    const rows = document.querySelectorAll('#table tr');
    let csvContent = '';

    rows.forEach(row => {
        let cols = row.querySelectorAll('td');
        let rowContent = [];

        cols.forEach(col => {
            let text = col.textContent;

            if (text.includes(',') || text.includes('"') || text.includes('\n')) {
                text = `"${text.replace(/"/g, '""')}"`;
            }

            rowContent.push(text);
        });

        csvContent += rowContent.join(',') + '\n';
    });

    const BOM = '\uFEFF';

    const blob = new Blob([BOM + csvContent], {
        type: 'text/csv;charset=utf-8;'
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.csv';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});