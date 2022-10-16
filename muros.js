/*Parametros de Suelo 1 y 2*/

let peuno=document.getElementById("pesoEspecificoUno");
let pedos=document.getElementById("pesoEspecificoDos");

let afuno=document.getElementById("anguloDeFriccionUno");
let afdos=document.getElementById("anguloDeFriccionDos");

let cuno=document.getElementById("cohesionUno");
let cdos=document.getElementById("cohesionDos");

/* Dimensiones propuestas del Muro */

let h=document.getElementById("H");
let htres=document.getElementById("Htres");
let b=document.getElementById("B");
let buno=document.getElementById("Buno");
let bdos=document.getElementById("Bdos");
let btres=document.getElementById("Btres");
let a=document.getElementById("a");
let t=document.getElementById("valorTeta");
let d=document.getElementById("D");

/* Dimensiones calculadas del Muro */

let hp=document.getElementById("Hp");
let huno=document.getElementById("Huno");
let hdos=document.getElementById("Hdos");
let bcuatro=document.getElementById("Bcuatro");
let bcinco=document.getElementById("Bcinco");
let bseis=document.getElementById("Bseis");


/* Parametros calculados  para revision del volcamiento*/

let ka=document.getElementById("valorka");
let pa=document.getElementById("valorpa");
let pv=document.getElementById("valorpv");
let ph=document.getElementById("valorph");

let auno=document.getElementById("areaUno");
let ados=document.getElementById("areaDos");
let atres=document.getElementById("areaTres");
let acuatro=document.getElementById("areaCuatro");

let puno=document.getElementById("pesoUno");
let pdos=document.getElementById("pesoDos");
let ptres=document.getElementById("pesoTres");
let pcuatro=document.getElementById("pesoCuatro");
let pver=document.getElementById("pesoVertical");

let sv=document.getElementById("sumatoriaVertical");
let sm=document.getElementById("sumatoriaMomentosResistentes");

let bxuno=document.getElementById("brazoUno");
let bxdos=document.getElementById("brazoDos");
let bxtres=document.getElementById("brazoTres");
let bxcuatro=document.getElementById("brazoCuatro");
let bxv=document.getElementById("brazoVertical");

let muno=document.getElementById("momentoUno");
let mdos=document.getElementById("momentoDos");
let mtres=document.getElementById("momentoTres");
let mcuatro=document.getElementById("momentoCuatro");
let mv=document.getElementById("momentoVertical");

let smo=document.getElementById("sumatoriaMomentosOpuestos");
let fsv=document.getElementById("factorSeguridadVolteo");
let fsvok=document.getElementById("fsvOk");

/* Parametros calculados  para revision del deslizamiento*/

let kp=document.getElementById("valorkp");
let pp=document.getElementById("valorpp");
let fsd=document.getElementById("factorSeguridadDeslizamiento");
let fsdok=document.getElementById("fsdOk");

/* Parametros calculados  para revision de la capacidad de carga*/

let e=document.getElementById("valore");
let qmax=document.getElementById("valorqmax");
let qmin=document.getElementById("valorqmin");
let q=document.getElementById("valorq");
let bp=document.getElementById("valorbp");
let fcd=document.getElementById("valorFcd");
let fqd=document.getElementById("valorFqd");
let psi=document.getElementById("valorPsi");
let fci=document.getElementById("valorFci");
let fdi=document.getElementById("valorFdi");
let nq=document.getElementById("valorNq");
let nc=document.getElementById("valorNc");
let nd=document.getElementById("valorNd");
let qu=document.getElementById("valorQu");
let fscc=document.getElementById("factorSeguridadCapacidadCarga");
let fsccok=document.getElementById("fsccOk")

/* Resultados para Tabla Resumen */

let vr=document.getElementById("contenedorVolcamientoResultado");
let dr=document.getElementById("contenedorDeslizamientoResultado");
let cr=document.getElementById("contenedorCapacidadCargaResultado");
let r=document.getElementById("contenedorResultado");

/* Función para cambio de estilo de los resultados*/

let z=document.querySelectorAll(".cambio");

console.log(h.value)

function cambio() {
    for ( i=0; i<z.length; i++){
        z[i].setAttribute("class","result");
    }
}

/* Función para mostrar menú */

let menu=document.querySelector("#menuContainer");

function mostrarMenu() {
    menu.classList.toggle("menu")
}


/* Funciones para la revisión del Volcamiento */

function calculo() {

    xhdos=h.value-htres.value;
    hdos.innerHTML=xhdos.toFixed(2);

    xbcuatro=xhdos*Math.tan(15*Math.PI/180);
    bcuatro.innerHTML=xbcuatro.toFixed(2);

    xbcinco=parseFloat(b.value)-(parseFloat(buno.value)+parseFloat(bdos.value)+parseFloat(btres.value)+xbcuatro);
    bcinco.innerHTML=xbcinco.toFixed(2);

    xbseis=xbcuatro+xbcinco;
    bseis.innerHTML=xbseis.toFixed(2);
    
    xhuno=(xbseis)*(Math.tan(a.value*Math.PI/180));
    huno.innerHTML=xhuno.toFixed(2);

    xhp=parseFloat(h.value)+xhuno;
    hp.innerHTML=xhp.toFixed(2);

    volteoCoulomb();
    deslizamientoCoulomb();
    capacidadCargaCoulomb();
    cambio();
    resultado();
}

function volteoCoulomb() {
    alfa=parseFloat(a.value)*Math.PI/180;
    teta=parseFloat(t.value)*Math.PI/180;
    fi=parseFloat(afuno.value)*Math.PI/180;
    delta=(2/3)*fi;
    
    xka1=(Math.pow(Math.cos(fi-teta),2));
    xka2=(Math.pow(Math.cos(teta),2))*(Math.cos(delta+teta));
    xka3=(Math.pow(1+Math.sqrt((Math.sin(delta+fi)*Math.sin(fi-alfa))/(Math.cos(delta+teta)*Math.cos(teta-alfa))),2));
    xkat=xka1/(xka2*xka3);
    ka.innerText=xkat.toFixed(3);

    xpa=0.5*(parseFloat(peuno.value))*(Math.pow(xhp,2))*(xkat);
    pa.innerText=xpa.toFixed(2)+" KN/m";

    xpv=(xpa)*(Math.sin(teta+delta));
    pv.innerText=xpv.toFixed(2)+" KN/m";

    xph=(xpa)*(Math.cos(teta+delta));
    ph.innerText=xph.toFixed(2)+" KN/m";

    momentos()
    okVolcamiento()
}

function momentos() {
    
    xauno=(buno.value)*(xhdos);
    auno.innerText=xauno.toFixed(2);

    xados=(btres.value)*(xhdos)/2;
    ados.innerText=xados.toFixed(2);

    xatres=(b.value)*(htres.value);
    atres.innerText=xatres.toFixed(2);

    xacuatro=(xbcuatro)*(xhdos)/2;
    acuatro.innerText=xacuatro.toFixed(2);

    xpuno=(xauno)*23.58;
    puno.innerText=xpuno.toFixed(2);

    xpdos=(xados)*23.58;
    pdos.innerText=xpdos.toFixed(2);

    xptres=(xatres)*23.58;
    ptres.innerText=xptres.toFixed(2);

    xpcuatro=(xacuatro)*23.58;
    pcuatro.innerText=xpcuatro.toFixed(2);

    pver.innerText=xpv.toFixed(2);

    xbxuno=parseFloat(bdos.value)+parseFloat(btres.value)+(parseFloat(buno.value)/2);
    bxuno.innerText=xbxuno.toFixed(2)

    xbxdos=parseFloat(bdos.value)+(parseFloat(btres.value)*2/3);
    bxdos.innerText=xbxdos.toFixed(2);

    xbxtres=parseFloat(b.value)/2
    bxtres.innerText=xbxtres.toFixed(2);

    xbxcuatro=parseFloat(bdos.value)+parseFloat(btres.value)+parseFloat(buno.value)+(parseFloat(xbcuatro)/3);
    bxcuatro.innerText=xbxcuatro.toFixed(2);

    xbxv=parseFloat(bdos.value)+parseFloat(btres.value)+parseFloat(buno.value)+((xhp)*(2/3)*(Math.tan(teta)));
    bxv.innerText=xbxv.toFixed(2);

    xmuno=(xbxuno)*(xpuno);
    muno.innerText=xmuno.toFixed(2);

    xmdos=(xbxdos)*(xpdos);
    mdos.innerText=xmdos.toFixed(2);

    xmtres=(xbxtres)*(xptres);
    mtres.innerText=xmtres.toFixed(2);

    xmcuatro=(xbxcuatro)*(xpcuatro);
    mcuatro.innerText=xmcuatro.toFixed(2);

    xmv=(xbxv)*(xpv);
    mv.innerText=xmv.toFixed(2);


    xsv=(xpuno)+(xpdos)+(xptres)+(xpcuatro)+(xpv);
    sv.innerText=xsv.toFixed(2);

    xsm=(xmuno)+(xmdos)+(xmtres)+(xmcuatro)+(xmv);
    sm.innerText=xsm.toFixed(2);

    xsmo=(xph)*((xhp)/3);
    smo.innerText=xsm.toFixed(2);

    xfsv=(xsm)/(xsmo);
    fsv.innerText=xfsv.toFixed(2);

}



function okVolcamiento() {
    if (xfsv>=3) {
        fsvok.innerText="OK";
        fsvok.setAttribute("class","contenedorResultado");

        vr.innerText="OK";
        vr.classList.add("siCumple");
        vr.classList.remove("noCumple");
    }
    else {
        fsvok.innerText="Cambiar dimenciones";
        fsvok.setAttribute("class","error");

        vr.innerText="NO CUMPLE";
        vr.classList.remove("siCumple");
        vr.classList.add("noCumple");
    }
}


/* Funciones para la revisión del Deslizamiento */

function deslizamientoCoulomb() {

    fidos=parseFloat(afdos.value)*Math.PI/180;
    xkp=Math.pow(Math.tan((45*Math.PI/180) + (fidos/2)),2);
    kp.innerText=xkp.toFixed(3)

    xpp=((1/2)*(parseFloat(pedos.value))*(Math.pow(parseFloat(d.value),2))*(xkp))+(2*(parseFloat(cdos.value))*(parseFloat(d.value))*(Math.sqrt(xkp)));
    pp.innerText=xpp.toFixed(2)+" KN/m";

    k1=(2/3);
    k2=(2/3);
    k1rad=k1*Math.PI/180;

    xfsd=((xsv)*(Math.tan((k1)*(fidos)))+((parseFloat(b.value))*(k2)*(parseFloat(cdos.value)))+(xpp))/(xph);
    fsd.innerText=xfsd.toFixed(2);

    if (xfsd>=1.6) {
        fsdok.innerText="OK";
        fsdok.setAttribute("class","contenedorResultado");

        dr.innerText="OK";
        dr.classList.remove("noCumple");
        dr.classList.add("siCumple");
    }
    else {
        fsdok.innerText="Cambiar dimenciones";
        fsdok.setAttribute("class","error");

        dr.innerText="NO CUMPLE";
        dr.classList.remove("siCumple");
        dr.classList.add("noCumple");
    }



}

/* Funciones para la revisión de la Capacidad de carga*/

function capacidadCargaCoulomb() {

    /*Calculo de la excentricidad (e)*/

    xe=((parseFloat(b.value))/(2))-((xsm-xsmo)/(xsv));
    e.innerText=xe.toFixed(2)+" m";

    if (xe<=(parseFloat(b.value)/6)) 
    {
        eok.innerText="OK";
        eok.setAttribute("class","contenedorResultado");
    }
    else {
        eok.innerText="Cambiar dimenciones";
        eok.setAttribute("class","error");
    }

    /*Presion maxima (qmax)*/

    xqmax=((xsv)/(parseFloat(b.value)))*(1+((6*(xe))/(parseFloat(b.value))));
    qmax.innerText=xqmax.toFixed(2)+" KN/m²";

    /*Presion minima (qmin)*/

    xqmin=((xsv)/(parseFloat(b.value)))*(1-((6*(xe))/(parseFloat(b.value))));
    qmin.innerText=xqmin.toFixed(2)+" KN/m²";

    /*Calculo de los parametros necesarios para capacidad ultima de carga*/

    xq=(parseFloat(pedos.value))*(parseFloat(d.value))
    q.innerText=xq.toFixed(2)+" KN/m²";

    xbp=(parseFloat(b.value))-(2*xe);
    bp.innerText=xbp.toFixed(2)+" m";

    xfcd=1+0.4*((parseFloat(d.value))/(xbp));
    fcd.innerText=xfcd.toFixed(2);

    fidos=parseFloat(afdos.value)*Math.PI/180;
    xfqd=1+(2*Math.tan(fidos))*(Math.pow((1-Math.sin(fidos)),2))*((parseFloat(d.value))/(xbp));
    fqd.innerText=xfqd.toFixed(2);

    xpsi=Math.atan(((xpa)*(Math.cos(alfa)))/(xsv))*((180)/(Math.PI));
    psi.innerText=xpsi.toFixed(2)+"°";

    xfci=Math.pow((1-((xpsi)/(90))),2);
    fci.innerText=xfci.toFixed(3);

    xfdi=Math.pow((1-((xpsi)/(parseFloat(afdos.value)))),2);
    fdi.innerText=xfdi.toFixed(3);

    xnq=(Math.pow(Math.tan((45+(parseFloat(afdos.value)/2))*Math.PI/180),2))*(Math.pow((Math.E),((Math.PI)*(Math.tan(fidos)))));
    nq.innerText=xnq.toFixed(2);

    xnc=(xnq-1)*(1/(Math.tan(fidos)));
    nc.innerText=xnc.toFixed(2);

    xnd=2*(xnq+1)*((Math.tan(fidos)));
    nd.innerText=xnd.toFixed(2);

    xqu=((parseFloat(cdos.value))*(xnc)*(xfcd)*(xfci))+((xq)*(xnq)*(xfqd)*(xfci))+((1/2)*(parseFloat(pedos.value))*(xbp)*(xnd)*(1)*(xfdi));
    qu.innerText=xqu.toFixed(2);

    xfscc=(xqu)/(xqmax);
    fscc.innerText=xfscc.toFixed(2);

    if (xfscc>=3) {
        fsccok.innerText="OK";
        fsccok.setAttribute("class","contenedorResultado");

        cr.innerText="OK";
        cr.classList.remove("noCumple");
        cr.classList.add("siCumple");
    }
    else {
        fsccok.innerText="Cambiar dimenciones";
        fsccok.setAttribute("class","error");

        cr.innerText="NO CUMPLE";
        cr.classList.remove("siCumple");
        cr.classList.add("noCumple");
    }

}

/* Función para la tabla/resumen de los resultados */

function resultado() {
    if (xfsv>=3 && xfsd>=1.6 && xfscc>=3) {
        
        r.innerText="Las Dimensiones del Muro satisfacen las condiciones de Estabilidad"
        r.classList.remove("neutro");
        r.classList.remove("noCumple");
        r.classList.add("siCumple");
    }

    else {
        r.innerText="Cambiar dimensiones"
        r.classList.remove("neutro");
        r.classList.remove("siCumple");
        r.classList.add("noCumple");
    }
}
