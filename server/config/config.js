// =========================================
// Pueto 
// =========================================
process.env.PORT = process.env.PORT || 3001;


// =========================================
// Entorno 
// =========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// =========================================
// Base de datos
// =========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://127.0.0.1:27017/cafe'

} else {
    urlDB = "mongodb+srv://Admin:ROziEJW4ox2SKy5b@cluster0.hxboc.mongodb.net/cafe?retryWrites=true&w=majority"

}

process.env.URLDB = urlDB;

