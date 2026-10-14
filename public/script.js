let active;
let data;
let clue1 = [];
let clue2 = [];
let clue3 = [];
let qnnum;
let realans;


function hallowenstuff(){
    const ghost = document.querySelector('.spooky');
    console.log("ADDED")
    ghost.classList.add('hallowen-funitem');
    setTimeout(() => {
        ghost.classList.remove('hallowen-funitem');
        console.log("REMOVED")
    }, 1500);
}

const diffbtns = document.querySelectorAll('.diff-btn');
diffbtns.forEach((diffbtn)=>{
    diffbtn.addEventListener('click', ()=>{
        diffbtns.forEach((diffbtnn)=>{
            diffbtnn.classList.remove('active');
        })
        diffbtn.classList.add('active');
        active = diffbtn.dataset.diff;
        console.log(active);
    })
    })

const form = document.querySelector('form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const num = document.querySelector('input[type="number"]').value;
    console.log(active);
    console.log(num);

    fetch('/save', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            diff: active,
            number: num
        }),
    })
    .then(response=> response.json())
    .then(result=>{
        if(result.success){
            data = result.countries;
            console.log(data);
            for(let i=0; i<data.length; i++){
                clue1.push(data[i].clue1);
                clue2.push(data[i].clue2);
                clue3.push(data[i].clue3);
            }
            console.log(clue1);
            document.querySelector('.container').style.display= "none";
            document.querySelector('.containerr').style.display = "flex";
            const boxs =  document.querySelectorAll('.box');
            for(let i=0; i<data.length; i++){
                boxs[i].classList.remove('displaynone');
                console.log(i)
            }
            box();
        }
    })
})
function box(){
const boxes = document.querySelectorAll('.box');
boxes.forEach((a)=>{
    a.addEventListener('click',()=>{
        a.classList.add('active-box');
        a.style.pointerEvents = "none";
        console.log(data);
        qnum = a.dataset.number;
        console.log(qnum);
        realans = data[qnum-1].country;
        document.querySelector('.b').style.display = "flex";
        
    })
})
let i = 0;
    document.querySelector('#reveal-clue').addEventListener('click', ()=>{
        const cluess = document.querySelectorAll('.clue');
        let requiredclue;
        if(i == 0){
           requiredclue =  data[qnum-1].clue1;
        }else if(i==1){
            requiredclue = data[qnum-1].clue2;
        }else{
            requiredclue = data[qnum-1].clue3;
        }

            cluess[i].innerText = `
                ${i+1}. ${requiredclue}
            `;
           i++;
    })
}
document.querySelector('#go-back').addEventListener('click', ()=>{
    document.querySelector('.b').style.display = "none";
    i = 0;
    document.querySelectorAll('.clue').forEach((a)=>{
        a.innerText = "";
        box();
    })
})
function goback(){
    document.querySelector('.b').style.display = "none";
    i = 0;
    document.querySelectorAll('.clue').forEach((a)=>{
        a.innerText = "";
        box();
    })
}

document.querySelector('.guessed-ans').addEventListener('keydown', (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        console.log("ENTER PRESSED!!");
        const guessed = document.querySelector('.guessed-ans').value;
        console.log(realans.toLowerCase());
        console.log(guessed.toLowerCase());
        if(realans.toLowerCase() == guessed.toLowerCase() ){
            alert("YOU GUESSED IT RIGHT!!!!");
        }else{
            alert(`YOU GUESSED WRONG, lmao noob it was ${realans}`);
            goback();
        }
    }
})