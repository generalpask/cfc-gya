import Papa from 'papaparse';

export const readCSV = async (csvFile) => {
    const parseFile = rawFile => {
        return new Promise(resolve => {
            Papa.parse(rawFile, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: results => { resolve(results); }
            });
        });
    };
    let parsedData = await parseFile(csvFile);
    return parsedData;
}
