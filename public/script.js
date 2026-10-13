let active;

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

    })
})