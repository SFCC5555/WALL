let peuno=document.getElementById("pesoespecificouno");
let pedos=document.getElementById("pesoespecificodos");

let afuno=document.getElementById("angulodefriccionuno");
let afdos=document.getElementById("angulodefricciondos");

let cuno=document.getElementById("cohesionuno");
let cdos=document.getElementById("cohesiondos");

let h=document.getElementById("H");
let htres=document.getElementById("Htres");
let b=document.getElementById("B");
let buno=document.getElementById("Buno");
let bdos=document.getElementById("Bdos");
let btres=document.getElementById("Btres");
let a=document.getElementById("a");
let d=document.getElementById("D");

let hp=document.getElementById("Hp");
let huno=document.getElementById("Huno");
let hdos=document.getElementById("Hdos");
let bcuatro=document.getElementById("Bcuatro");
let bcinco=document.getElementById("Bcinco");
let bseis=document.getElementById("Bseis");

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

let z=document.querySelectorAll(".cambio");

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

    volteocoulomb()
    cambio()
}

function volteocoulomb() {
    alfa=parseFloat(a.value)*Math.PI/180;
    teta=15*Math.PI/180;
    fi=parseFloat(afuno.value)*Math.PI/180;
    delta=(2/3)*fi;
    
    xka1=(Math.pow(Math.cos(fi-teta),2));
    xka2=(Math.pow(Math.cos(teta),2))*(Math.cos(delta+teta));
    xka3=(Math.pow(1+Math.sqrt((Math.sin(delta+fi)*Math.sin(fi-alfa))/(Math.cos(delta+teta)*Math.cos(teta-alfa))),2));
    xkat=xka1/(xka2*xka3);
    ka.innerHTML=xkat.toFixed(3);

    xpa=0.5*(parseFloat(peuno.value))*(Math.pow(xhp,2))*(xkat);
    pa.innerHTML=xpa.toFixed(2)+" KN/m";

    xpv=(xpa)*(Math.sin(teta+delta));
    pv.innerHTML=xpv.toFixed(2)+" KN/m";

    xph=(xpa)*(Math.cos(teta+delta));
    ph.innerHTML=xph.toFixed(2)+" KN/m";

    momentos()
    ok()
}

function momentos() {
    
    xauno=(buno.value)*(xhdos);
    auno.innerHTML=xauno.toFixed(2);

    xados=(btres.value)*(xhdos)/2;
    ados.innerHTML=xados.toFixed(2);

    xatres=(b.value)*(htres.value);
    atres.innerHTML=xatres.toFixed(2);

    xacuatro=(xbcuatro)*(xhdos)/2;
    acuatro.innerHTML=xacuatro.toFixed(2);

    xpuno=(xauno)*23.58;
    puno.innerHTML=xpuno.toFixed(2);

    xpdos=(xados)*23.58;
    pdos.innerHTML=xpdos.toFixed(2);

    xptres=(xatres)*23.58;
    ptres.innerHTML=xptres.toFixed(2);

    xpcuatro=(xacuatro)*23.58;
    pcuatro.innerHTML=xpcuatro.toFixed(2);

    pver.innerHTML=xpv.toFixed(2);

    xbxuno=parseFloat(bdos.value)+parseFloat(btres.value)+(parseFloat(buno.value)/2);
    bxuno.innerHTML=xbxuno.toFixed(2)

    xbxdos=parseFloat(bdos.value)+(parseFloat(btres.value)*2/3);
    bxdos.innerHTML=xbxdos.toFixed(2);

    xbxtres=parseFloat(b.value)/2
    bxtres.innerHTML=xbxtres.toFixed(2);

    xbxcuatro=parseFloat(bdos.value)+parseFloat(btres.value)+parseFloat(buno.value)+(parseFloat(xbcuatro)/3);
    bxcuatro.innerHTML=xbxcuatro.toFixed(2);

    xbxv=parseFloat(bdos.value)+parseFloat(btres.value)+parseFloat(buno.value)+((xhp)*(2/3)*(Math.tan(teta)));
    bxv.innerHTML=xbxv.toFixed(2);

    xmuno=(xbxuno)*(xpuno);
    muno.innerHTML=xmuno.toFixed(2);

    xmdos=(xbxdos)*(xpdos);
    mdos.innerHTML=xmdos.toFixed(2);

    xmtres=(xbxtres)*(xptres);
    mtres.innerHTML=xmtres.toFixed(2);

    xmcuatro=(xbxcuatro)*(xpcuatro);
    mcuatro.innerHTML=xmcuatro.toFixed(2);

    xmv=(xbxv)*(xpv);
    mv.innerHTML=xmv.toFixed(2);


    xsv=(xpuno)+(xpdos)+(xptres)+(xpcuatro)+(xpv);
    sv.innerHTML=xsv.toFixed(2);

    xsm=(xmuno)+(xmdos)+(xmtres)+(xmcuatro)+(xmv);
    sm.innerHTML=xsm.toFixed(2);

    xsmo=(xph)*((xhp)/3);
    smo.innerHTML=xsm.toFixed(2);

    xfsv=(xsm)/(xsmo);
    fsv.innerHTML=xfsv.toFixed(2)

}

function cambio() {
    for ( i=0; i<=z.length; i++){
        z[i].setAttribute("class","result");
    }
}

function ok() {
    if (xfsv>=3) {
        fsvok.innerHTML="OK"
        fsvok.setAttribute("class","result");
    }
    else {
        fsvok.innerHTML="Cambiar dimenciones"
        fsvok.setAttribute("class","error");
    }
}