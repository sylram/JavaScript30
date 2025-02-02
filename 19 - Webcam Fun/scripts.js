const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(error => console.error(error));
}


function paintToCanvas(){
  
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width,height);
    canvas.width = width;
    canvas.height = height;   

  
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        console.log(pixels);
        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.1;
        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    },50)

}

function redEffect(pixels){
    for(let i=0; i< pixels.data.length; i+=4){
        pixels.data[i] =   pixels.data[i] + 100; //RED
        pixels.data[i+1]=  pixels.data[i+1] -50; //GREEN
        pixels.data[i+2]=  pixels.data[i+2] * 0.5; // BLUE
    }
    return pixels;
}   

function rgbSplit(pixels){
    for(let i=0; i< pixels.data.length; i+=4){
        pixels.data[i - 150] =   pixels.data[i]; //RED
        pixels.data[i + 500]=  pixels.data[i+1]; //GREEN
        pixels.data[i - 550]=  pixels.data[i+2]; // BLUE
   
    }
    return pixels;
}

function greenScreen(pixels){
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });
    console.log(levels);
    for (let i = 0; i < pixels.data.length; i += 4) {
        red = pixels.data[i]; //RED
        green = pixels.data[i + 1]; //GREEN
        blue = pixels.data[i + 2]; // BLUE
        alpha = pixels.data[i + 3];


        if (red >= levels.rmin && red <= levels.rmax &&
            green >= levels.gmin && green <= levels.gmax &&
            blue >= levels.bmin && blue <= levels.bmax) {
                //take it out
            pixels.data[i + 3] = 0;
        }
    }
   
    return pixels;
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    console.log(data);
    const link = document.createElement('a' )
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.textContent = 'Download Image';
    link.innerHTML = `<img src=${data} alt="Handsome chick">`
    strip.insertBefore(link, strip.firstChild);
}
getVideo();

video.addEventListener('canplay', paintToCanvas);

setTimeout(() => {
    
    
}, 100);


