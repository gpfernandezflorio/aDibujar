const data = {};
const CASILLA = 10;
let INTERVAL = 100;
const TAMANIO_CABEZAL = 6;
const templates = {
  casaSinProcedimientos: 'línea -125 130\nlínea -125 -130\nabajo 150\nrectángulo 250 150\nderecha 60\nrectángulo 130 100\nderecha 230\nrectángulo 40 100\narriba 105 izquierda 5\ncírculo 50\narriba 55 derecha 5\ncírculo 40\narriba 45 derecha 5\ncírculo 30',
  casaConProcedimientos: '[Dibujar Techo]\nabajo 150\n[Dibujar Frente]\nderecha 60\n[Dibujar Puerta]\nderecha 230\n[Dibujar Arbol]\n\n"Dibujar Techo"\n  línea -125 130\n  línea -125 -130\n\n"Dibujar Frente"\n  rectángulo 250 150\n\n"Dibujar Puerta"\n  rectángulo 130 100\n\n"Dibujar Arbol"\n  [Dibujar Tronco]\n  arriba 105 izquierda 5\n  círculo 50\n  arriba 55 derecha 5\n  círculo 40\n  arriba 45 derecha 5\n  círculo 30\n\n"Dibujar Tronco"\n  rectángulo 40 100',
  velero: '[Dibujar Casco]\narriba 60 izquierda 70\n[Dibujar Vela 1]\nderecha 10\n[Dibujar Vela 2]\narriba 190\n[Dibujar Bandera]\n\n"Dibujar Casco"\n  rectángulo 150 50\n  línea -50 50\n  línea 50 0\n  derecha 150\n  línea 50 0\n  línea -50 -50\n\n"Dibujar Vela 1"\n  línea 0 205\n  línea -150 -205\n  línea 150 0\n\n"Dibujar Vela 2"\n  línea 0 180\n  línea 130 -180\n  línea -130 0\n\n"Dibujar Bandera"\n  línea 0 30\n  línea 50 -15\n  línea -50 -15',
  cohete: '[Dibujar Base]\narriba 10 derecha 50\nlínea 150 150\n[Dibujar Punta]\narriba 25 izquierda 25\nlínea -150 -150\n\n"Dibujar Base"\n  [Dibujar Aleta Central]\n  arriba 30 derecha 30\n  [Dibujar Parte Izquierda de Base]\n  derecha 10 abajo 10\n  [Dibujar Parte Derecha de Base]\n\n"Dibujar Parte Izquierda de Base"\n  línea -30 30\n  línea 30 30\n  [Dibujar Aleta Izquierda]\n  arriba 30 derecha 30\n  línea 30 -30\n\n"Dibujar Parte Derecha de Base"\n  línea 30 -30\n  línea -30 -30\n  [Dibujar Aleta Derecha]\n  abajo 30 izquierda 30\n  línea -30 30\n\n"Dibujar Aleta Central"\n  línea 60 60\n  línea 10 -10\n  línea -60 -60\n  línea -10 10\n\n"Dibujar Aleta Izquierda"\n  línea -10 0\n  línea -30 -30\n  línea 10 0\n\n"Dibujar Aleta Derecha"\n  línea 0 -10\n  línea 30 30\n  línea 0 10\n\n"Dibujar Punta"\n  derecha 10 abajo 10\n  línea 20 90\n  línea -90 -20\n  línea 70 -70\n  arriba 35 izquierda 35\n  círculo 40',
  elefante: '[Dibujar Patas]\narriba 30 izquierda 100\n[Dibujar Cuerpo]\narriba 30 izquierda 70\n[Dibujar Cabeza]\n\n"Dibujar Patas"\n  rectángulo 20 30\n  derecha 20\n  rectángulo 20 30\n  derecha 60\n  rectángulo 20 30\n  derecha 20\n  rectángulo 20 30\n\n"Dibujar Cuerpo"\n  rectángulo 120 100\n  \n"Dibujar Cabeza"\n  círculo 70\n  arriba 20 derecha 15\n  círculo 10\n  derecha 35\n  [Dibujar Oreja]\n  izquierda 50 abajo 40\n  [Dibujar Trompa]\n\n"Dibujar Oreja"\n  línea 10 20\n  línea -10 20\n  línea -10 -20\n  línea 10 -20\n\n"Dibujar Trompa"\n  círculo 25\n  derecha 10 abajo 20\n  círculo 20\n  izquierda 6 abajo 12\n  círculo 15\n  abajo 5 izquierda 8\n  círculo 10\n  arriba 8 izquierda 5\n  círculo 8\n  arriba 5 izquierda 3\n  círculo 5',
  mickey: 'círculo\nderecha 150\ncírculo\nizquierda 100\nabajo 125\ncírculo 150',
};

const primitivas = {
  RECT:{texto:"rectángulo",argumentosDefault:[100,50]},
  CUAD:{texto:"cuadrado",argumentosDefault:[50]},
  CIRC:{texto:"círculo",argumentosDefault:[50]},
  LINE:{texto:"línea",argumentosDefault:[100,100]},
  DER:{texto:"derecha",argumentosDefault:[50]},
  IZQ:{texto:"izquierda",argumentosDefault:[50]},
  ARR:{texto:"arriba",argumentosDefault:[50]},
  ABA:{texto:"abajo",argumentosDefault:[50]}
};

const desafíos = {
  /* 3 campos (todos opcionales):
    - base (código a cargar al empezar)
    - enunciado (en formato html)
    - resultadoEsperado (lista de elementos que se espera se hayan dibujado para completar el desafío)
    - conToolbox (booleano que indica si mostrar el toolbox o no)
  */
  'zero':{}, // Desafío sin objetivo
  'casaSimple':{
    conToolbox:true,
    enunciado:"<b>Mi primer dibujo</b><br/>Objetivo: Dibujar una casa sin puertas ni ventanas usando únicamente un rectángulo para el frente y dos líneas para el techo."
  },
  'casaSinAyuda':{
    conToolbox:false,
    enunciado:"<b>Ahora sin ayuda</b><br/>Objetivo: Dibujar una casa como antes pero ahora con una puerta en el centro, una ventana cuadrada a cada lado y una ventana circular en el techo."
  }
};

window.addEventListener('load', function() {
  data.conToolbox = false;
  let toolboxArg = argumentoUrl('t');
  if (toolboxArg == "S") {
    data.conToolbox = true;
  }
  let desafío = argumentoUrl('d');
  if (desafío === null) {
    let selector = document.getElementById('templates');
    let opciones = '';
    for (let t in templates) {
      opciones += `<option value="${t}">${t}</option>`;
    }
    selector.innerHTML = opciones;
    document.getElementById('modoDesafío').style.display = 'none';
  } else {
    document.getElementById('modoLibre').style.display = 'none';
  }
  let códigoFuente = document.getElementById('codigoFuente');
  códigoFuente.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      agregarTexto("  ");
    }
  });
  if (desafío === null) {
    cargarTemplate();
  } else {
    cargarDesafío(desafío);
  }
  if (!data.conToolbox) {
    document.getElementById('toolbox').style.display = 'none';
  }
  let cursor = document.getElementById('cursor');
  cursor.style.width = `${TAMANIO_CABEZAL}px`;
  cursor.style.height = `${TAMANIO_CABEZAL}px`;
  focoAlCódigo();
});

function finalizóEjecución() {
  if ('desafío' in data) {
    let desafío = data.desafío;
    if ('resultadoEsperado' in desafío) {
      /* TODO: validar que lo que se dibujó (el contenido de data.resultado)
          es lo que había que dibujar (desafío.resultadoEsperado)
          y mostrar un mensaje indicando si se cumplió o no el desafío
      */
    }
  }
};

function cargarDesafío(d) {
  if (d in desafíos) {
    let desafío = desafíos[d];
    data.desafío = desafío;
    if ('base' in desafío) {
      document.getElementById('codigoFuente').value = desafío.base;
    }
    if ('enunciado' in desafío) {
      document.getElementById('enunciado').innerHTML = desafío.enunciado;
    }
    if ('conToolbox' in desafío) {
      data.conToolbox = desafío.conToolbox;
    }
  }
}

function cargarTemplate() {
  let selector = document.getElementById('templates');
  document.getElementById('codigoFuente').value = templates[selector.value];
}

function agregarAlCódigo(p) {
  if (p in primitivas) {
    let argumentos = primitivas[p].argumentosDefault;
    buscarFinDeLínea();
    agregarTexto(primitivas[p].texto + " " + argumentos.join(" "));
    focoAlCódigo();
  }
};

function buscarFinDeLínea() {
  let códigoFuente = document.getElementById('codigoFuente');
  if (códigoFuente.value.length == 0) { return; }
  if (códigoFuente.value[códigoFuente.selectionStart] == '\n') { return; }
  if (códigoFuente.selectionStart == códigoFuente.value.length) {
    agregarTexto("\n");
    return;
  }
  if (códigoFuente.selectionStart == 0 ||
    (códigoFuente.selectionStart > 0 && códigoFuente.value[códigoFuente.selectionStart-1] == '\n')
  ) {
    let start = códigoFuente.selectionStart;
    agregarTexto("\n");
    códigoFuente.selectionStart = códigoFuente.selectionEnd = start;
    return;
  }
  let próximoSalto = códigoFuente.value.substring(códigoFuente.selectionEnd).indexOf('\n');
  if (próximoSalto < 0) {
    códigoFuente.selectionStart = códigoFuente.selectionEnd = códigoFuente.value.length;
  } else {
    códigoFuente.selectionStart = códigoFuente.selectionEnd = códigoFuente.selectionEnd + próximoSalto;
  }
  agregarTexto("\n");
};

function focoAlCódigo() {
  document.getElementById('codigoFuente').focus();
}

function agregarTexto(texto) {
  let códigoFuente = document.getElementById('codigoFuente');

  let start = códigoFuente.selectionStart;
  let end = códigoFuente.selectionEnd;
  // console.log(start);
  // console.log(end);
  // console.log(texto.length);
  códigoFuente.value = códigoFuente.value.substring(0, start) + texto + códigoFuente.value.substring(end);
  let nuevoInicio = start + texto.length;
  // console.log(nuevoInicio);
  // console.log(códigoFuente.value.length);
  códigoFuente.selectionStart = códigoFuente.selectionEnd = nuevoInicio;
  // console.log(códigoFuente.selectionStart);
  // console.log(códigoFuente.selectionEnd);
}

function ejecutar() {
  data.cabezal = {x:0, y:0};
  data.limites = {x:0, y:0, w:10, h:10};
  data.codigo = {};
  data.dibujo = [];
  data.resultado = [];
  data.definiciones = {};
  let fuente = document.getElementById('codigoFuente').value.split('\n');
  let i=0;
  while (i < fuente.length) {
    let línea = fuente[i];
    if (línea.length > 0) {
      if (línea[0] == '"') {
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
    if (d.q != "MOVE") {
      data.resultado.push(d);
    }
    data.ctx.beginPath();
    if (d.q == "MOVE") {
      actualizarPosicionCabezal(d.x, d.y);
    } else if (d.q == primitivas.LINE.texto) {
      let x = d.x - data.limites.x;
      let y = d.y - data.limites.y;
      data.ctx.moveTo(x, y);
      x += d.w;
      y += d.h;
      data.ctx.lineTo(x, y);
      actualizarPosicionCabezal(d.x + d.w, d.y + d.h);
    } else if (d.q == primitivas.RECT.texto) {
      data.ctx.rect((d.x - data.limites.x), (d.y - data.limites.y), d.w, d.h);
    } else if (d.q == primitivas.CIRC.texto) {
      let r = d.d/2;
      data.ctx.arc((d.x - data.limites.x) + r, (d.y - data.limites.y) + r, r, 0, 2 * Math.PI);
    } else if (d.q == primitivas.CUAD.texto) {
      data.ctx.rect((d.x - data.limites.x), (d.y - data.limites.y), d.l, d.l);
    }
    data.ctx.stroke();
    data.exe = setTimeout(seguirDibujando, INTERVAL);
  } else {
    finalizóEjecución();
  }
}

function actualizarPosicionCabezal(x, y) {
  let cursor = document.getElementById('cursor');
  cursor.style.left = `${x - data.limites.x - TAMANIO_CABEZAL/2}px`;
  cursor.style.top = `${y - data.limites.y + TAMANIO_CABEZAL}px`;
}

function nuevaDefinicion(fuente, i, definiciones) {
  let línea = fuente[i];
  let fin = línea.indexOf('"',1);
  if (fin < 0) { alert("Error: falta cerrar comillas en la línea " + (i+1)); return -1; }
  if (línea.length > fin+1) { alert("Error: caracteres inesperados tras las comillas en la línea " + (i+1)); return -1; }
  let nombre = línea.substring(1, fin);
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

function invocarDefinicion(línea, j, i, definiciones) {
  let fin = línea.indexOf(']', j+1);
  if (fin < 0) { alert("Error: falta cerrar corchete en la línea " + (i+1)); return -1; }
  let nombre = línea.substring(j+1, fin);
  if (nombre in definiciones) {
    for (let línea in definiciones[nombre]) {
      let error = procesarLinea(definiciones[nombre][línea], línea, definiciones);
      if (error) { return -1; }
    }
  } else { alert("Error: " + nombre + " no está definido (se invoca en la línea " + (i+1) + ")"); return -1; }
  return fin;
}

function procesarLinea(línea, i, definiciones) {
  let j=0;
  while (j < línea.length) {
    if (línea[j] == '[') {
      j = invocarDefinicion(línea, j, i, definiciones)
      if (j < 0) { return true; }
    /*} else if (línea[j] == '(') {
      j = repeticion(línea, j, i, definiciones)
      if (j < 0) { return true; }*/
    } else {
      j = procesarPrimitiva(línea, i, j);
      if (j < 0) { return true; }
    }
    j++;
  }
}

/*function repeticion(línea, j, i, definiciones) {
  let fin = encontrarParentesis(línea, j+1);
  if (fin < 0) { alert("Error: falta cerrar el paréntesis que se abre en la línea " + (i+1) + ", columna " + j+1); return -1; }
  if (fin == línea.length -1 || !esUnNumero(línea[fin+1])) { alert("Error: falta la cantidad de repeticiones tras el paréntesis de la línea " + (i+1) + ", columna " + (fin+1)); return -1; }
  let cuerpo = línea.substring(j+1, fin);
  j = fin + 2;
  while(j < línea.length && esUnNumero(línea[j])) {
    j++;
  }
  let n = Number(línea.substring(fin+1, j))
  for (let z=0; z<n; z++) {
    let error = procesarLinea(cuerpo, i, definiciones);
    if (error) { return -1; }
  }
  return j-1;
}*/

/*function encontrarParentesis(línea, j) {
  let abiertos = 1;
  while (j < línea.length) {
    if (línea[j] == '(') {
      abiertos ++;
    } else if (línea[j] == ')') {
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

function procesarPrimitiva(línea, i, j) {
  if (línea[j] == ' ') { return j+1; }
  let primitiva = línea.substring(j);
  if (primitiva.startsWith(primitivas.LINE.texto)) {
    let ancho = 100;
    let alto = -100;
    let args = dameArgumentos(primitiva, primitivas.LINE.texto, i, j);
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
    data.dibujo.push({q:primitivas.LINE.texto, w:ancho, h:alto, x:data.cabezal.x, y:data.cabezal.y});
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
  if (primitiva.startsWith(primitivas.RECT.texto)) {
    let ancho = 100;
    let alto = 100;
    let args = dameArgumentos(primitiva, primitivas.RECT.texto, i, j);
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
    data.dibujo.push({q:primitivas.RECT.texto, w:ancho, h:alto, x:data.cabezal.x, y:y});
    data.limites.w = Math.max(data.limites.w, data.cabezal.x + ancho);
    data.limites.y = Math.min(data.limites.y, y);
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.CIRC.texto)) {
    let diametro = 100;
    let args = dameArgumentos(primitiva, primitivas.CIRC.texto, i, j);
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
    data.dibujo.push({q:primitivas.CIRC.texto, d:diametro, x:data.cabezal.x, y:y});
    data.limites.w = Math.max(data.limites.w, data.cabezal.x + diametro);
    data.limites.y = Math.min(data.limites.y, y);
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.CUAD.texto)) {
    let lado = 100;
    let args = dameArgumentos(primitiva, primitivas.CUAD.texto, i, j);
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
    data.dibujo.push({q:primitivas.CUAD.texto, l:lado, x:data.cabezal.x, y:y});
    data.limites.w = Math.max(data.limites.w, data.cabezal.x + lado);
    data.limites.y = Math.min(data.limites.y, y);
    return j + f -1;
  }
  if (primitiva.startsWith(primitivas.DER.texto)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.DER.texto, i, j);
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
  if (primitiva.startsWith(primitivas.IZQ.texto)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.IZQ.texto, i, j);
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
  if (primitiva.startsWith(primitivas.ARR.texto)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.ARR.texto, i, j);
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
  if (primitiva.startsWith(primitivas.ABA.texto)) {
    let pasos = 10;
    let args = dameArgumentos(primitiva, primitivas.ABA.texto, i, j);
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

function argumentoUrl(clave) {
  let resultado = (
    new RegExp(
      "[\\?&]" + (clave.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")) + "=([^&#]*)"
    )
  ).exec( location.href );
  if (resultado === null) {
    return resultado;
  }
  return decodeURIComponent(resultado[1]);
};