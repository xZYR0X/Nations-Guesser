let active;
let activee;
let country = [];
let countryname;

const diffs = document.querySelectorAll('.diff-btn');
diffs.forEach((diff)=>{
    diff.addEventListener('click', ()=>{
        diffs.forEach((difff)=>{
            difff.classList.remove('active');
        })
        diff.classList.add('active');
        active = diff.dataset.diff;
        console.log(active);
    })
})

const continents = document.querySelectorAll('.con-btn');
continents.forEach((con)=>{
    con.addEventListener('click', ()=>{
        continents.forEach((conn)=>{
            conn.classList.remove('activee');
        })
        con.classList.add('activee');
        activee = con.dataset.con;
        console.log(activee);
    })
})

const formm = document.querySelector('#formm');
formm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(active);
    console.log(activee);

    if(!active || !activee){
        alert("Please enter both continent's and difficulty's value to continue!");
        return;
    }

    fetch('/savee', {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            difficulty: active,
            continent: activee
        })
    })
    .then(response => response.json())
    .then(result=>{
        if(result.success){
            country = result.country;
            countryname = country.name;
            let imglink = country.img;

            document.querySelector('.r').classList.add('displaynone');
            document.querySelector('.rr').classList.remove('displaynone');

            document.querySelector('.country-flag').innerHTML = `
                <img src="${imglink}" alt="Nexora">
            `;
        }
    })
})

document.querySelector('#guessed-ans').addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){
        e.preventDefault();
        console.log("PRESSED");
        const guessedans = document.querySelector('#guessed-ans').value;
        if(guessedans.toLowerCase()===countryname.toLowerCase()){
            alert("You guessed it right!");
            return;
        }else{
            alert(`WRONG! It was ${countryname}`);
            return;
        }
    }
})