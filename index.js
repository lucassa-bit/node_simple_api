const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const database = JSON.parse(fs.readFileSync('./dev-data/data.json'));
const produto = fs.readFileSync('./templates/product.html', 'utf-8');
const paginaInicial = fs.readFileSync('./templates/overview.html', 'utf-8');
const card = fs.readFileSync('./templates/card.html', 'utf-8');

// READ AND WRITE TXT
// const input = 'Arthur vai trazer comida pra nós próxima semana';
// const texto = fs.readFileSync('./txt/input.txt', 'utf-8');

// fs.writeFileSync('./txt/output.txt', input, 'utf-8');
// console.log(texto);

// -------------------- Async ------------------------------------ // 

// fs.readFile('./txt/input.txt', 'utf-8', thenReadFile);

// function thenReadFile(err, data) {
//     if (err) throw err;
//     console.log(`\n\n${data}\n\n`);
// }

// ------------------- Server ------------------------------------- //
// const server = http.createServer((req, res) => {
//     // console.log(req);
//     res.end(
//         JSON.stringify(
//             {
//                 nameFilho: 'OI'
//             }
//         )
//     );
// });

// server.listen(8080, '127.0.0.1', () => {
//     console.log('Server on');
// });

// -------------------- DIREÇÕES DO SERVIDOR ---------------------- // 
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cards = database.map(data => replaceTemplate(card, data)).join('');
        const page = paginaInicial.replace('{%CARDS%}', cards);
        res.end(page);
    }
    else if (pathname === '/produto' && query.id !== undefined && query.id >= 0 && query.id <= 4) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(replaceTemplate(produto, database[query.id]));
    }
    else if (pathname === '/alimentos') {
        res.writeHead(200, {
            'Content-type': 'Application/json'
        });
        res.end(JSON.stringify(database));
    }
    else if (pathname === '/alimento') {
        res.writeHead(200, {
            'Content-type': 'Application/json'
        });
        res.end(JSON.stringify(database[query.id]))
    }
    else {
        res.writeHead(404, {
            helloWorld: 'helloWorld',
            'Content-type': 'text/html'
        });
        res.end('<h1>ERRO</h1>');
    }
});

server.listen(8080, '127.0.0.1', () => {
    console.log('Server on');
});
