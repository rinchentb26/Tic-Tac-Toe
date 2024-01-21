const box = document.querySelectorAll('.box');
const againBtn = document.querySelector('.again');
let user1Turn = true;

const title_txt = document.querySelector('.title-txt');

for (let i = 0; i < box.length; i++) {

    box[i].addEventListener('click', function () {

        if (box[i].innerHTML === '') {
            if (user1Turn == true) {
                box[i].innerHTML = '<i class="fa-solid fa-x"></i>';
            }
            else {
                box[i].innerHTML = `<i class="fa-regular fa-circle"></i>`;
            }
            user1Turn = !user1Turn;
            title_txt.textContent = `Player ${user1Turn === true ? 1 : 2}'s turn`;
        }
    })
}
againBtn.addEventListener('click', function () {
    user1Turn = true;
    title_txt.textContent = `Tic Tac Toe`;
    for (let i = 0; i < box.length; i++) {
        box[i].innerHTML = '';
    }
});

