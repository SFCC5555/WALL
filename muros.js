/*Parametros de Suelo 1 y 2*/

let peuno=document.getElementById("pesoespecificouno");
let pedos=document.getElementById("pesoespecificodos");

let afuno=document.getElementById("angulodefriccionuno");
let afdos=document.getElementById("angulodefricciondos");

let cuno=document.getElementById("cohesionuno");
let cdos=document.getElementById("cohesiondos");

/* Dimensiones propuestas del Muro */

let h=document.getElementById("H");
let htres=document.getElementById("Htres");
let b=document.getElementById("B");
let buno=document.getElementById("Buno");
let bdos=document.getElementById("Bdos");
let btres=document.getElementById("Btres");
let a=document.getElementById("a");
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

let auno=document.getElementById("areauno");
let ados=document.getElementById("areados");
let atres=document.getElementById("areatres");
let acuatro=document.getElementById("areacuatro");

let puno=document.getElementById("pesouno");
let pdos=document.getElementById("pesodos");
let ptres=document.getElementById("pesotres");
let pcuatro=document.getElementById("pesocuatro");
let pver=document.getElementById("pesov");

let sv=document.getElementById("sumatoriav");
let sm=document.getElementById("sumatoriam");

let bxuno=document.getElementById("brazouno");
let bxdos=document.getElementById("brazodos");
let bxtres=document.getElementById("brazotres");
let bxcuatro=document.getElementById("brazocuatro");
let bxv=document.getElementById("brazov");

let muno=document.getElementById("momentouno");
let mdos=document.getElementById("momentodos");
let mtres=document.getElementById("momentotres");
let mcuatro=document.getElementById("momentocuatro");
let mv=document.getElementById("momentov");

let smo=document.getElementById("sumatoriamo");
let fsv=document.getElementById("factorseguridadvolteo");
let fsvok=document.getElementById("fsvok");

/* Parametros calculados  para revision del deslizamiento*/

let kp=document.getElementById("valorkp");
let pp=document.getElementById("valorpp");
let fsd=document.getElementById("factorseguridaddeslizamiento");
let fsdok=document.getElementById("fsdok");

/* Funcion para ambio de estilo de los resultados*/

let z=document.querySelectorAll(".cambio");

function cambio() {
    for ( i=0; i<z.length; i++){
        z[i].setAttribute("class","result");
    }
}

/* Funcion para mostrar menu */

let menu=document.querySelector("#menuContainer");

function mostrarMenu() {
    menu.classList.toggle("menu")
}


/* Funciones para la revision del Volcamiento */

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
    deslizamientoCoulomp();
    cambio();
}

function volteoCoulomb() {
    alfa=parseFloat(a.value)*Math.PI/180;
    teta=15*Math.PI/180;
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
    }
    else {
        fsvok.innerText="Cambiar dimenciones";
        fsvok.setAttribute("class","error");
    }
}


/* Funciones para la revision del Deslizamiento */

function deslizamientoCoulomp() {

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
    }
    else {
        fsdok.innerText="Cambiar dimenciones";
        fsdok.setAttribute("class","error");
    }

}

