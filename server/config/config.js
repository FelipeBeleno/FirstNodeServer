// =========================================
// Pueto 
// =========================================
process.env.PORT = process.env.PORT || 3001;


// =========================================
// Entorno 
// =========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


// =========================================
// Vencimineto de token  
// =========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = '48h'


// =========================================
// SEED Semilla de autenticacion del token 
// =========================================

process.env.SEED = 'semilla-de-token-de-desarrollo'

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

