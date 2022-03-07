// server/index.js
var express = require ("express");
var ReactDom = require ("react-dom/server");
var renderToString = ReactDom.renderToString
var Home = require ("./Home");

console.log(Home)

// const app = express();
// const content = renderToString(<Home />);
// app.get('/', function (req, res) {
//     res.send(
//         `
//     <html>
//       <head>
//         <title>ssr</title>
//       </head>
//       <body>
//         <div id="root">${content}</div>
//       </body>
//     </html>
//    `
//     );
// })
// app.listen(3001, () => {
//     console.log('listen:3001')
// })
