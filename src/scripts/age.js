const today = new Date();
const birthdate = new Date("2007-04-16");
const diff = today.getMonth() - birthdate.getMonth();
let age = today.getFullYear() - birthdate.getFullYear();

if (diff < 0 || (diff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
}

document.getElementById('age').textContent = `${age} year old `