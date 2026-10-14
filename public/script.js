let active;
let data;
let clue1 = [];
let clue2 = [];
let clue3 = [];

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
            console.log(clue1)
            document.querySelector('.container').style.display= "none";
            document.querySelector('.containerr').style.display = "flex";
            box();
        }
    })
})
function box(){
const boxes = document.querySelectorAll('.box');
boxes.forEach((a)=>{
    a.addEventListener('click',()=>{
        // boxes.forEach((b)=>{
        //     b.classList.remove('active-box');
        // })
        a.classList.add('active-box');
        a.style.pointerEvents = "none";
        console.log(data);
    })
})
}