const https = require('https');
const FormData = require('form-data');
require('dotenv').config();

const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const IMGBB_URL = 'https://api.imgbb.com/1/upload';

// Función para subir la imagen a ImgBB
const uploadImage = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    // Crear instancia de FormData
    const form = new FormData();
    form.append('image', imageBuffer, { filename: 'image.jpg' });

    // Configuración de la solicitud
    const requestOptions = {
      method: 'POST',
      headers: {
        ...form.getHeaders(),
      },
    };

    // Realizar la solicitud HTTPS
    const req = https.request(`${IMGBB_URL}?key=${IMGBB_API_KEY}`, requestOptions, (res) => {
      let data = '';

      // Manejo de los datos recibidos
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.status !== 200) {
            reject(new Error(`ImgBB API returned an error: ${response.status_txt}`));
          } else {
            resolve(response.data.url);
          }
        } catch (error) {
          reject(new Error('Error parsing response from ImgBB'));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request error: ${e.message}`));
    });

    // Enviar los datos del formulario
    form.pipe(req);
  });
};

module.exports = { uploadImage };
