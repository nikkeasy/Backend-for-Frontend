const sqlite3 = require('sqlite3').verbose(); 
const db = new sqlite3.Database('biisit.db'); 
// Avaa db-yhteyden ja luo tietokannan jos sitä ei ole 

db.serialize( () => { // asynkroniset käskyt - nuolinotaatiofunktio

    let sql = 'CREATE TABLE Biisitoiveet (' +
    'id integer PRIMARY KEY NOT NULL, ' + 
    'biisin_nimi text NOT NULL, ' +
    'artistin_nimi text NOT NULL,' +
    'username text NOT NULL ) ';
                


/* JOS KANTAAN TALLETETAAN KUVA 
let sql = "CREATE TABLE Henkilo (" + 


*/ 


db.run(sql, (err) => { 
    if(err) {  // Jos virhe niin console log error 
        return console.log(err.message); 
    }
    console.log("Taulu tehtiin onnistuneesti!")
    }) 

sql = "INSERT INTO `biisitoiveet` (`id`, `biisin_nimi`, `artistin_nimi`, `username`) "+ 
" VALUES (1, 'Karma Chameleon', 'Culture Club', 'beachboi')"; 
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message); 
    }

    console.log("Rivi lisättiin"); 

    }); 


    sql = "INSERT INTO `biisitoiveet` (`id`, `biisin_nimi`, `artistin_nimi`, `username`)" + 
" VALUES (2, 'Seven Nation Army', 'The White Stripes', 'rockman')"; 
db.run(sql, (err) => {
    if (err) {
        return console.log(err.message); 
    }
    
    console.log("Rivi lisättiin"); 

    }); 
})

db.each("SELECT id, biisin_nimi, artistin_nimi FROM biisitoiveet", (err, row) => { // Listataan rivit 
    if (err) { 
        return console.log(err.message); 
    }
    console.log(row.id + ", " + row.biisin_nimi); 
});

db.close(); 