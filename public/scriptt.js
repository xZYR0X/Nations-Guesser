let active;
let activee;

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