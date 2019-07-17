const fs = require('fs');
const flow = require('xml-flow');

async function readXml(filename, selectors) {
    return new Promise((resolve, reject) => {
        const strStream = fs.createReadStream(filename, { encoding: 'utf8' });
        const xmlStream = flow(strStream, { strict: true });

        let isReading = true;

        Object.entries(selectors).forEach(([selector, callback]) => {
            xmlStream.on(selector, element => {
                isReading = isReading && (callback(element) !== false);
            });
        });

        strStream.on('open', () => {});
        strStream.on('end', resolve);
        strStream.on('error', resolve);
    });
}

(async () => {
    const persons = [];

    await readXml('persons.xml', {
        'tag:person': person => {
            persons.push(person);
        },
    });

    console.log(persons);
})();
