var canvas = document.getElementById('signature-pad');
var saveJpeg = document.getElementById('save-jpeg');
var clearButton = document.getElementById('clear');
var drawButton = document.getElementById('draw');
var form = document.getElementById('form');
var image = canvas.toDataURL(); // data:image/png....


function resizeCanvas() {
  var ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
};

window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)'
});


// En el evento submit del formulario, crear una imágen base64 usando toDataURL
// y colocar ese valor en el textarea del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById('base64').value = image;
}, false);


// Enviando la imagen usando jQuery AJAX
$.ajax({
  url:"service/url/process.php", // no estoy segura de si esta linea esté correcta ?
  // Enviar un parámetro post con el nombre base64 y con la imagen en el
  data:{
      base64: image
  },
  // Método POST
  type:"POST",
  complete:function(){
      console.log("Todo en orden");
  }
});

clearButton.addEventListener('click', function () {
  signaturePad.clear();
});

drawButton.addEventListener('click', function () {
  var ctx = canvas.getContext('2d');
  console.log(ctx.globalCompositeOperation);
  ctx.globalCompositeOperation = 'source-over';
});

