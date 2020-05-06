const express = require('express'); 
const app = express(); 

const helmet = require('helmet'); 
app.use(helmet()); 

app.use(express.json()); 
express.urlencoded({limit:'5mb', extended: true}); 

const cors = require('cors'); 
app.use(cors()); 


const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('biisit.db');

app.listen(8080, () => { 
        console.log('Node toimii localhost:8080'); 
});

// Reititys 

app.get('/', (req, res, next) => { // get-pyynnetään palvelimelta tietoa / req request res response
    return res.status(200).json({ error: false, message: "Toimii"})
});

app.get('/biisitoiveet/all', (req, res, next) => { 

    db.all("SELECT * FROM biisitoiveet", (error, results) => { 
        if (error) throw error; 

        return res.status(200).json(results); 
    });
}); 

app.get('/biisitoiveet/one/:id', (req, res, next) => {
    let id = req.params.id;  // :id ->  Parametrina palvelinohjelmalle 

    db.get('SELECT * FROM biisitoiveet where id=?', [id], (error, result) => {
                    // ?-merkin tilalle tulee arvo joka löytyy seuraavan-kentän sisältä -> [id]
        if (error) throw error; 

        if (typeof(result) == 'undefined') {
            return res.status(200).send({});  // mikäli haku onnistui mutta mitään ei palaudu
                                              // lähetetään tyhjä objekti -> ({})
        }
            // Muussa tapauksessa näytetään tietokantahaun tulokset 
        return res.status(200).json(result); 

    })
} )