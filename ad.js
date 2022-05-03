const data = {};
const CASILLA = 10;
let INTERVAL = 100;
const TAMANIO_CABEZAL = 10;
const templates = {
  casaSinProcedimientos: 'linea -125 130\nlinea -125 -130\nabajo 150\nrectangulo 250 150\nderecha 60\nrectangulo 130 100\nderecha 230\nrectangulo 40 100\narriba 105 izquierda 5\ncirculo 50\narriba 55 derecha 5\ncirculo 40\narriba 45 derecha 5\ncirculo 30',
  casaConProcedimientos: '[Dibujar Techo]\nabajo 150\n[Dibujar Frente]\nderecha 60\n[Dibujar Puerta]\nderecha 230\n[Dibujar Arbol]\n\n"Dibujar Techo"\n  linea -125 130\n  linea -125 -130\n\n"Dibujar Frente"\n  rectangulo 250 150\n\n"Dibujar Puerta"\n  rectangulo 130 100\n\n"Dibujar Arbol"\n  [Dibujar Tronco]\n  arriba 105 izquierda 5\n  circulo 50\n  arriba 55 derecha 5\n  circulo 40\n  arriba 45 derecha 5\n  circulo 30\n\n"Dibujar Tronco"\n  rectangulo 40 100',
  velero: '[Dibujar Casco]\narriba 60 izquierda 70\n[Dibujar Vela 1]\nderecha 10\n[Dibujar Vela 2]\narriba 190\n[Dibujar Bandera]\n\n"Dibujar Casco"\n  rectangulo 150 50\n  linea -50 50\n  linea 50 0\n  derecha 150\n  linea 50 0\n  linea -50 -50\n\n"Dibujar Vela 1"\n  linea 0 205\n  linea -150 -205\n  linea 150 0\n\n"Dibujar Vela 2"\n  linea 0 180\n  linea 130 -180\n  linea -130 0\n\n"Dibujar Bandera"\n  linea 0 30\n  linea 50 -15\n  linea -50 -15',
  cohete: '[Dibujar Base]\narriba 10 derecha 50\nlinea 150 150\n[Dibujar Punta]\narriba 25 izquierda 25\nlinea -150 -150\n\n"Dibujar Base"\n  [Dibujar Aleta Central]\n  arriba 30 derecha 30\n  [Dibujar Parte Izquierda de Base]\n  derecha 10 abajo 10\n  [Dibujar Parte Derecha de Base]\n\n"Dibujar Parte Izquierda de Base"\n  linea -30 30\n  linea 30 30\n  [Dibujar Aleta Izquierda]\n  arriba 30 derecha 30\n  linea 30 -30\n\n"Dibujar Parte Derecha de Base"\n  linea 30 -30\n  linea -30 -30\n  [Dibujar Aleta Derecha]\n  abajo 30 izquierda 30\n  linea -30 30\n\n"Dibujar Aleta Central"\n  linea 60 60\n  linea 10 -10\n  linea -60 -60\n  linea -10 10\n\n"Dibujar Aleta Izquierda"\n  linea -10 0\n  linea -30 -30\n  linea 10 0\n\n"Dibujar Aleta Derecha"\n  linea 0 -10\n  linea 30 30\n  linea 0 10\n\n"Dibujar Punta"\n  derecha 10 abajo 10\n  linea 20 90\n  linea -90 -20\n  linea 70 -70\n  arriba 35 izquierda 35\n  circulo 40',
  elefante: '[Dibujar Patas]\narriba 30 izquierda 100\n[Dibujar Cuerpo]\narriba 30 izquierda 70\n[Dibujar Cabeza]\n\n"Dibujar Patas"\n  rectangulo 20 30\n  derecha 20\n  rectangulo 20 30\n  derecha 60\n  rectangulo 20 30\n  derecha 20\n  rectangulo 20 30\n\n"Dibujar Cuerpo"\n  rectangulo 120 100\n  \n"Dibujar Cabeza"\n  circulo 70\n  arriba 20 derecha 15\n  circulo 10\n  derecha 35\n  [Dibujar Oreja]\n  izquierda 50 abajo 40\n  [Dibujar Trompa]\n\n"Dibujar Oreja"\n  linea 10 20\n  linea -10 20\n  linea -10 -20\n  linea 10 -20\n\n"Dibujar Trompa"\n  circulo 25\n  derecha 10 abajo 20\n  circulo 20\n  izquierda 6 abajo 12\n  circulo 15\n  abajo 5 izquierda 8\n  circulo 10\n  arriba 8 izquierda 5\n  circulo 8\n  arriba 5 izquierda 3\n  circulo 5',
  mickey: 'circulo\nderecha 150\ncirculo\nizquierda 100\nabajo 125\ncirculo 150',
};

const primitivas = {
  RECT:"rectangulo",
  CUAD:"cuadrado",
  CIRC:"circulo",
  LINE:"linea",
  DER:"derecha",
  IZQ:"izquierda",
  ARR:"arriba",
  ABA:"abajo"
};

window.addEventListener('load', function() {
  let selector = document.getElementById('templates');
  let opciones = '';
  for (let t in templates) {
    opciones += `<option value="${t}">${t}</option>`;
  }
  selector.innerHTML = opciones;
  document.getElementById('codigoFuente').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) + "  " + this.value.substring(end);

      // put caret at right position again
      this.selectionStart = this.selectionEnd = start + 2;
    }
  });
  cargarTemplate();
  let cursor = document.getElementById('cursor');
  cursor.style.width = `${TAMANIO_CABEZAL}px`;
  cursor.style.height = `${TAMANIO_CABEZAL}px`;
});

function cargarTemplate() {
  let selector = document.getElementById('templates');
  document.getElementById('codigoFuente').value = templates[selector.value];
}

function ejecutar() {
  data.cabezal = {x:0, y:0};
  data.limites = {x:0, y:0, w:10, h:10};
  data.codigo = {};
  data.dibujo = [];
  data.definiciones = {};
  let fuente = document.getElementById('codigoFuente').value.split('\n');
  let i=0;
  while (i < fuente.length) {
    let linea = fuente[i];
    if (linea.length > 0) {
      if (linea[0] == '"') {
        i = nuevaDefinicion(fuente, i, data.definiciones);
        if (i < 0) { return; }
      } else {
        data.codigo[i] = fuente[i];
      }
    }
    i++;
  }
  for (let i in data.codigo) {
    let error = procesarLinea(data.codigo[i], i, data.definiciones);
    if (error) { return; }
  }
  dibujar();
}

function dibujar() {
  let canvas = document.getElementById("canvas");
  data.limites.x -=20; data.limites.y-=20;
  let ancho = data.limites.w - data.limites.x;
  let alto = data.limites.h - data.limites.y;
  canvas.width = (Math.max(10, ancho) + 20);
  canvas.height = (Math.max(10, alto) + 20);
  data.ctx = canvas.getContext("2d");
  actualizarPosicionCabezal(0, 0);
  document.getElementById('cursor').hidden = false;
  if (data.exe) {
    clearTimeout(data.exe);
  }
  data.exe = setTimeout(seguirDibujando, INTERVAL*2);
}

function seguirDibujando() {
  delete data.exe;
  if (data.dibujo.length > 0) {
    let d = data.dibujo.shift();
    data.ctx.beginPath();
    if (d.q == "MOVE") {
      actualizarPosicionCabezal(d.x, d.y);
    } else if (d.q == primitivas.LINE) {
      let x = d.x - data.limites.x;
      let y = d.y - data.limites.y;
      data.ctx.moveTo(x, y);
      x += d.w;
      y += d.h;
      data.ctx.lineTo(x, y);
      actualizarPosicionCabezal(d.x + d.w, d.y + d.h);
    } else if (d.q == primitivas.RECT) {
      data.ctx.rect((d.x - data.limites.x), (d.y - data.limites.y), d.w, d.h);
    } else if (d.q == primitivas.CIRC) {
      let r = d.d/2;
      data.ctx.arc((d.x - data.limites.x) + r, (d.y - data.limites.y) + r, r, 0, 2 * Math.PI);
    } else if (d.q == primitivas.CUAD) {
      data.ctx.rect((d.x - data.limites.x), (d.y - data.limites.y), d.l, d.l);
    }
    data.ctx.stroke();
    data.exe = setTimeout(seguirDibujando, INTERVAL);
  }
}

function actualizarPosicionCabezal(x, y) {
  let cursor = document.getElementById('cursor');
  let canvas = document.getElementById("canvas");
  let r = canvas.getBoundingClientRect();
  let t = TAMANIO_CABEZAL/2;
  cursor.style.left = `${r.x + x - data.limites.x - t}px`;
  cursor.style.top = `${r.y + y - data.limites.y - t}px`;
}

function nuevaDefinicion(fuente, i, definiciones) {
  let linea = fuente[i];
  let fin = linea.indexOf('"',1);
  if (fin < 0) { alert("Error: falta cerrar comillas en la línea " + (i+1)); return -1; }
  if (linea.length > fin+1) { alert("Error: caracteres inesperados tras las comillas en la línea " + (i+1)); return -1; }
  let nombre = linea.substring(1, fin);
  definiciones[nombre] = {};
  while (i < fuente.length - 1 && comienzaConEspacio(fuente[i+1])) {
    i++;
    definiciones[nombre][i] = fuente[i];
  }
  return i;
}

function comienzaConEspacio(l) {
  return l.length == 0 || l[0] == ' ';
}

function invocarDefinicion(linea, j, i, definiciones) {
  let fin = linea.indexOf(']', j+1);
  if (fin < 0) { alert("Error: falta cerrar corchete en la línea " + (i+1)); return -1; }
  let nombre = linea.substring(j+1, fin);
  if (nombre in definiciones) {
    for (let linea in definiciones[nombre]) {
      let error = procesarLinea(definiciones[nombre][linea], linea, definiciones);
      if (error) { return -1; }
    }
  } else { alert("Error: " + nombre + " no está definido (se invoca en la línea " + (i+1) + ")"); return -1; }
  return fin;
}

function procesarLinea(linea, i, definiciones) {
  let j=0;
  while (j < linea.length) {
    if (linea[j] == '[') {
      j = invocarDefinicion(linea, j, i, definiciones)
      if (j < 0) { return true; }
    /*} else if (linea[j] == '(') {
      j = repeticion(linea, j, i, definiciones)
      if (j < 0) { return true; }*/
    } else {
      j = procesarPrimitiva(linea, i, j);
      if (j < 0) { return true; }
    }
    j++;
  }
}

/*function repeticion(linea, j, i, definiciones) {
  let fin = encontrarParentesis(linea, j+1);
  if (fin < 0) { alert("Error: falta cerrar el paréntesis que se abre en la línea " + (i+1) + ", columna " + j+1); return -1; }
  if (fin == linea.length -1 || !esUnNumero(linea[fin+1])) { alert("Error: falta la cantidad de repeticiones tras el paréntesis de la línea " + (i+1) + ", columna " + (fin+1)); return -1; }
  let cuerpo = linea.substring(j+1, fin);
  j = fin + 2;
  while(j < linea.length && esUnNumero(linea[j])) {
    j++;
  }
  let n = Number(linea.substring(fin+1, j))
  for (let z=0; z<n; z++) {
    let error = procesarLinea(cuerpo, i, definiciones);
    if (error) { return -1; }
  }
  return j-1;
}*/

/*function encontrarParentesis(linea, j) {
  let abiertos = 1;
  while (j < linea.length) {
    if (linea[j] == '(') {
      abiertos ++;
    } else if (linea[j] == ')') {
      abiertos --;
    }
    if (abiertos == 0) {
      return j;
    }
    j++;
  }
  return -1;
}*/

function esUnNumero(s) {
  if (s.startsWith('-')) {
    s = s.substring(1);
  }
  for (x of s) {
    if (!('0123456789'.includes(x))) {
      return false;
    }
  }
  return true;
}

function procesarPrimitiva(linea, i, j) {
  if (linea[j] == ' ') { return j+1; }
  let primitiva = linea.substring(j);
  if (primitiva.startsWith(primitivas.LINE)) {
    let ancho = 100;
    let alto = -100;
    let args = dameArgumentos(primitiva, primitivas.LINE, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para las dimensiones de una línea");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      ancho = args[0];
      if (args.length > 1) {
        alto = -args[1];
      }
    }
    data.dibujo.push({q:primitivas.LINE, w:ancho, h:alto, x:data.cabezal.x, y:data.cabezal.y});
    if (ancho > 0) {
      data.limites.w = Math.max(data.limites.w, data.cabezal.x + ancho);
    } else {
      data.limites.x = Math.min(data.limites.x, data.cabezal.x + ancho);
    }
    if (alto > 0) {
      data.limites.h = Math.max(data.limites.h, data.cabezal.y + alto);
    } else {
      data.limites.y = Math.min(data.limites.y, data.cabezal.y + alto);
    }
    data.cabezal.x += ancho;
    data.cabezal.y += alto;
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.RECT)) {
    let ancho = 100;
    let alto = 100;
    let args = dameArgumentos(primitiva, primitivas.RECT, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para las dimensiones de un rectángulo");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      ancho = args[0];
      if (args.length > 1) {
        alto = args[1];
      }
    }
    let y = data.cabezal.y - alto;
    data.dibujo.push({q:primitivas.RECT, w:ancho, h:alto, x:data.cabezal.x, y:y});
    data.limites.w = Math.max(data.limites.w, data.cabezal.x + ancho);
    data.limites.y = Math.min(data.limites.y, y);
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.CIRC)) {
    let diametro = 100;
    let args = dameArgumentos(primitiva, primitivas.CIRC, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para el diámetro de un círculo");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      diametro = args[0];
    }
    let y = data.cabezal.y - diametro;
    data.dibujo.push({q:primitivas.CIRC, d:diametro, x:data.cabezal.x, y:y});
    data.limites.w = Math.max(data.limites.w, data.cabezal.x + diametro);
    data.limites.y = Math.min(data.limites.y, y);
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.CUAD)) {
    let lado = 100;
    let args = dameArgumentos(primitiva, primitivas.CUAD, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para el lado de un cuadrado");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      lado = args[0];
    }
    let y = data.cabezal.y - lado;
    data.dibujo.push({q:primitivas.CUAD, l:lado, x:data.cabezal.x, y:y});
    data.limites.w = Math.max(data.limites.w, data.cabezal.x + lado);
    data.limites.y = Math.min(data.limites.y, y);
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.DER)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.DER, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para la cantidad de pasos de un movimiento");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      pasos = args[0];
    }
    data.cabezal.x += pasos;
    data.limites.w = Math.max(data.limites.w, data.cabezal.x);
    data.dibujo.push({q:"MOVE", x:data.cabezal.x, y:data.cabezal.y});
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.IZQ)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.IZQ, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para la cantidad de pasos de un movimiento");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      pasos = args[0];
    }
    data.cabezal.x -= pasos;
    data.limites.x = Math.min(data.limites.x, data.cabezal.x);
    data.dibujo.push({q:"MOVE", x:data.cabezal.x, y:data.cabezal.y});
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.ARR)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.ARR, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para la cantidad de pasos de un movimiento");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      pasos = args[0];
    }
    data.cabezal.y -= pasos;
    data.limites.y = Math.min(data.limites.y, data.cabezal.y);
    data.dibujo.push({q:"MOVE", x:data.cabezal.x, y:data.cabezal.y});
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.ABA)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.ABA, i, j);
    if (args.res == "ERR") {
      alert("Error: argumento inválido para la cantidad de pasos de un movimiento");
      return -1;
    }
    let f = args.f;
    args = args.args;
    if (args.length > 0) {
      pasos = args[0];
    }
    data.cabezal.y += pasos;
    data.limites.h = Math.max(data.limites.h, data.cabezal.y);
    data.dibujo.push({q:"MOVE", x:data.cabezal.x, y:data.cabezal.y});
    return j + f -1;
  }
  i++;
  alert("Error en la línea " + i + ": instrucción inválida");
  return -1;
}

function dameArgumentos(primitiva, k) {
  let args = [];
  let n = 1;
  let f = k.length;
  if (primitiva.length > f) {
    let ini = k.length;
    while (primitiva[f] == ' ') {
      f++; ini++;
      if (primitiva[f] == '-' || esUnNumero(primitiva[f])) {
        while(primitiva.length > f && primitiva[f] != ' ') {
          f++;
        }
        let arg = primitiva.substring(ini, f);
        if (!esUnNumero(arg)) {
          return {
            res: "ERR",
            arg: arg,
            n: n,
            i: k.length+1
          }
        }
        args.push(Number(arg));
        n++;
        ini = f;
      }
    }
  }
  return {
    res: "OK",
    args: args,
    f: f
  }
};
