let active;
let data;
let clue1 = [];
let clue2 = [];
let clue3 = [];
let qnnum;
let realans;
let points = 0;
let i = 0;


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
    if(!active){
        alert("Please Select a difficulty!");
        return;
    }
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
document.querySelectorAll('.box').forEach(a => {
    a.addEventListener('click', () => {
        qnnum = Number(a.dataset.number);
        realans = data[qnnum - 1].country;
        a.classList.add('active-box')

        document.querySelector('.b').style.display = "flex";
    });
});

document.querySelector('#reveal-clue').addEventListener('click', () => {
    const clues = document.querySelectorAll('.clue');

    if (i >= 3) return;

    const clue = data[qnnum - 1][`clue${i + 1}`];

    clues[i].innerText = `${i + 1}. ${clue}`;
    i++;
});
document.querySelector('#go-back').addEventListener('click', ()=>{
    document.querySelector('.b').style.display = "none";
    i = 0;
    document.querySelectorAll('.clue').forEach((a)=>{
        a.innerText = "";
    })
})
function goback(){
    document.querySelector('.b').style.display = "none";
    i = 0;
    document.querySelectorAll('.clue').forEach((a)=>{
        a.innerText = "";
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

            if(i==0){
                alert("YOU GUESSED IT IN FIRST TRY!!!!!");
                points = points + 250;
                alert(`+250 points, you have ${points} points rn!`)
            }else if(i==1){
                alert("You guessed with 1 clue ONLYY!!");
                points += 150;
                alert(`+150 points, You have ${points} points rn!`)
            }else if(i==2){
                alert("You guessed it with 2 clues!");
                points += 100;
                alert(`+100 points, You have ${points} points rn!`)
            }else {
                alert("You guessed it with 3 clues!");
                points += 50;
                alert(`+50 points, You have ${points} points rn!`)
            }
            goback();

        }else{
            alert(`YOU GUESSED WRONG, lmao noob it was ${realans}`);
            goback();
        }
    }
})