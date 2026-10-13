function hallowenstuff(){
    const ghost = document.querySelector('.spooky');
    console.log("ADDED")
    ghost.classList.add('hallowen-funitem');
    setTimeout(() => {
        ghost.classList.remove('hallowen-funitem');
        console.log("REMOVED")
    }, 1500);
}