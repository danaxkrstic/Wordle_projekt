let word="CHAIN";
let word2="BERRY";

let niz=word.split('');
let niz2=word2.split('');


let slovoPozicija=document.getElementsByClassName("slovo");
let tipkovnica=document.getElementById("tipkovnica");
let SlovaSTipkovnice=document.getElementsByClassName("slovoTipkovnica");
let button=document.getElementById("botun");
let rezultat=document.getElementById("rezultat");


function Slovo(simbol,pozicija,brojnost,boja){
        this.simbol=simbol;
        this.pozicija=pozicija;
        this.brojnost=brojnost;
        this.boja=boja;

        
}

zadanaRijec=[];
zadanaRijec1=[];

function Broji(nz){

    let temp=[];
    let br=0;
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            if(nz[i].simbol==nz[j].simbol)
            {
                
                br++;
            }
             
        }
        temp.push(br);
        br=0;
    }

    return temp;
}

function PridruziBrojnost(n1){
    for(let i=0;i<5;i++){

        let n=Broji(n1);
        n1[i].brojnost=n[i];
    }
}


for(let i=0;i<5;i++){
    zadanaRijec.push(new Slovo(niz[i],i+1,0,"grey"));
    zadanaRijec1.push(new Slovo(niz2[i],i+1,0,"grey"));
    
}

PridruziBrojnost(zadanaRijec);
PridruziBrojnost(zadanaRijec1);

//dodajemo rijeci

let naseRijeci=[];
naseRijeci.push(zadanaRijec);
naseRijeci.push(zadanaRijec1);


let slPoz=0; //koje slovo od 5
let upisano=[];
let kojiPokusaj=0;


let KojaRijec=0; 

tipkovnica.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.composedPath.length!=6){ //da ne upise cili redak
        let letter=e.target.innerText; //STA SMO KLIKLI - KOJE SLOVO
        if(letter=="Delete."){
            if(slPoz>0){
            
                slPoz--;
                upisano.pop();
                slovoPozicija[slPoz+5*kojiPokusaj].innerText="";
            }
        }
        else if (letter=="Enter."){

            
            if(slPoz==5){
                //SLJEDECI REDAK
                
                slPoz=0;
                

                PridruziBrojnost(upisano);
                

                Ispitaj(upisano,naseRijeci[KojaRijec],kojiPokusaj);
                BojanjeTipkovnice(upisano,kojiPokusaj);


                let zelSlova=0;

                //kada pogodili
                upisano.forEach(element => {
                    if(element.boja=="lightgreen")
                    zelSlova++;
                });


                kojiPokusaj++;
                upisano=[];

                if(zelSlova==5){ //pogodili

                    KojaRijec++;
                    botun.style.visibility="visible";
                    rezultat.style.visibility="visible";
                    rezultat.innerHTML="<p>Number of correctly guessed words: </p>";
                    rezultat.innerHTML+=`<p>${KojaRijec}</p>`;
                    
                    
                }
            
            
            }
        }
        else{
            if(slPoz!=5)
            {
                
                slovoPozicija[slPoz+5*kojiPokusaj].innerText=letter;
                upisano.push(new Slovo(letter,slPoz+1,0,"grey"));
                slPoz++;
            }
    }
    }
})

botun.addEventListener("click", (e)=>{

    e.preventDefault();

    OcistiBoje();
    kojiPokusaj=0;
    botun.style.visibility="hidden";
    rezultat.style.visibility="hidden";



})


async function Ispitaj(ric,GLric,kp)
{
    
    
    for(let i=0;i<5;i++){

        for(let j=0;j<5;j++){

            //console.log(ric[i].simbol+" "+GLric[j].simbol);
            if(ric[i].simbol==GLric[j].simbol){

                //console.log("ISTI");
                if(ric[i].pozicija==GLric[j].pozicija){
                    //ZELENO
                    //await new Promise(r=>setTimeout(r,500));
                    //console.log(ric[i].simbol+" "+ric[i].pozicija+ric[i].simbol+" "+ric[i].pozicija);
                    ric[i].boja="lightgreen";
                    //slovoPozicija[i+5*kp].style.backgroundColor="lightgreen";
                    //console.log(i+" "+ric[i].simbol+ric[i].boja);
                    
                    
                }
                else{

                    //else if - slovoPozicija[i+5*kp].style.backgroundColor!="lightgreen"
                    //NARANCASTO
                    //await new Promise(r=>setTimeout(r,500));
                   // slovoPozicija[i+5*kp].style.backgroundColor="orange";
                   //console.log("narancasto +"+ric[i].simbol+ i+ric[i].boja);
                   if (ric[i].boja!="lightgreen")
                    {
                        ric[i].boja="orange";
                    
                    }
                    
                    
                    
                }
            }

               
        }
        /*
        
        if(slovoPozicija[i+5*kp].style.backgroundColor!="lightgreen" && slovoPozicija[i+5*kp].style.backgroundColor!="orange"){

                //await new Promise(r=>setTimeout(r,500));
                slovoPozicija[i+5*kp].style.backgroundColor="grey";
                
        }
        */
        //Bojaj(ric,GLric,kp);
        //console.log(ric[i].boja);
        
    }
    
    //console.log(ric);
    Bojaj(ric,GLric,kp);
}



//PROVJERI MOZE LI SE VIDIT JE LI NESTO ELEMENT LISTE DA SKRATIS VELIKU NAREDBU
async function BojanjeTipkovnice(upis,kp){

    //await new Promise(r=>setTimeout(r,2600));
    
    for(let i=0;i<5;i++){


        let temp=0;

        while (temp<28) {
             
            if(upis[i].simbol==SlovaSTipkovnice[temp].innerText && SlovaSTipkovnice[temp].style.backgroundColor!="lightgreen"){

                if(slovoPozicija[i+5*kp].style.backgroundColor=="lightgreen"){

                    SlovaSTipkovnice[temp].style.backgroundColor="lightgreen";  
                    temp=100;
                    
                }
                else if(slovoPozicija[i+5*kp].style.backgroundColor=="orange"){
                    SlovaSTipkovnice[temp].style.backgroundColor="orange"; 
                    temp=100;
                    
                }
                else{
                    SlovaSTipkovnice[temp].style.backgroundColor="grey"; 
                    temp=100;
                    
                }

                
                
            }
            
            temp++;

        }

      
    }

    
}



function Bojaj(ric,GLric,kp){

    let br=0;
    //console.log(ric);
    for(let i=0;i<5;i++){

    

            GLric.forEach(element => {
                if(ric[i].simbol==element.simbol){
                    br=element.brojnost;
                    
                }
            });
            //console.log(ric[i].simbol);
            //console.log(ric[i].brojnost+"---"+br);

            if(br<ric[i].brojnost){ //jedini slucaj u kojem imamo problema s bojama

                
                let kolikoZeleno=0;
                ric.forEach(element => {

                    if(element.simbol==ric[i].simbol && element.boja=="lightgreen"){
                        kolikoZeleno++;
                    }
                });
                
                let kolikoNeZeleno=ric[i].brojnost-kolikoZeleno;

                //console.log("zel: ",kolikoZeleno," nezel: ",kolikoNeZeleno);

                
                let t=0;
                let t1=0;
                
                let visak=kolikoNeZeleno-br;
                //let narancasti=br-kolikoZeleno;
                //console.log("narancasti: "+narancasti);
                /*let noviNiz=[];
                for(let k=0;k<5;k++){
                    noviNiz.push(new Slovo(ric[k].simbol,ric[k].pozicija,ric[k].brojnost,ric[k].boja));
                }*/


               ric.forEach(element => {

                    //console.log(ric[i].simbol+"++"+element.simbol);
                    if(element.simbol==ric[i].simbol){

                        if(element.boja!="lightgreen" && kolikoZeleno!=0 && t!=kolikoNeZeleno){
                            //.log(element.simbol+" je siv.")
                            element.boja="grey";
                            t++;
    
                        }
                        if(kolikoZeleno==0 && t1<visak){
                            
                            //console.log("sivo: ", element.simbol);
                            element.boja="grey";
                            t1++;

                        }

                    }
                    
                });

                
            }
            
            
       
            slovoPozicija[i+5*kp].style.backgroundColor=ric[i].boja;

        
        
    }

    

    
}


async function OcistiBoje(){
    
   

    for(let i=0;i<SlovaSTipkovnice.length;i++){
        SlovaSTipkovnice[i].style.backgroundColor="lightpink";
    }

    for(let i=0;i<slovoPozicija.length;i++){
        slovoPozicija[i].style.backgroundColor="rgb(249, 198, 237)";
        slovoPozicija[i].innerText="";
    }
}
