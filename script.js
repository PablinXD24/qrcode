const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const logoContainer = document.getElementById('logo-container');
const resultDiv = document.getElementById('result');

const canvasContext = canvas.getContext('2d');

// Função para iniciar a câmera
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error('Erro ao acessar a câmera: ', err);
        });
}

// Função de leitura do QR Code
function scanQRCode() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

    if (qrCode) {
        resultDiv.textContent = `QR Code Detectado: ${qrCode.data}`;
        logoContainer.style.display = 'block';  // Exibe a logo
    } else {
        logoContainer.style.display = 'none';  // Esconde a logo se não há QR
    }

    requestAnimationFrame(scanQRCode);
}

// Iniciar a câmera e a detecção
startCamera();
video.addEventListener('play', scanQRCode);
