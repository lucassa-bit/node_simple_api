const fs = require('fs');
const http = require('http');
const url = require('url');

const database = JSON.parse(fs.readFileSync('./dev-data/data.json'));

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
    const {pathname, query} = url.parse(req.url, true);

    if(pathname === '/fazenda') {

    }
    else if(pathname === '/alimentos') {
        res.writeHead(200, {
            'Content-type': 'Application/json'
        });
        res.end(JSON.stringify(database));
    }
    else if(pathname === '/alimento') {
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
