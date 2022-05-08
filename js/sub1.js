"use strict";

function pop() {
  const btnOpn = document.querySelectorAll("button.btn_link");
  const btnClose = document.querySelectorAll("button.btn_close");
  const popUp = document.querySelectorAll("section.pop");

  btnOpn[0].addEventListener("click", () => {
      popUp[0].classList.add("up");
      let btn1 = popUp[0].querySelectorAll("section.btn_set>button");
      let kid1 = popUp[0].querySelectorAll("section.pop>div");
      kid1[0].classList.add("on");

      btn1[0].addEventListener("click", () => {
        kid1[0].classList.add("on");
        kid1[1].classList.remove("on");
        kid1[2].classList.remove("on");
      });
      btn1[1].addEventListener("click", () => {
        kid1[0].classList.remove("on");
        kid1[1].classList.add("on");
        kid1[2].classList.remove("on");
      });
      btn1[2].addEventListener("click", () => {
        kid1[0].classList.remove("on");
        kid1[1].classList.remove("on");
        kid1[2].classList.add("on");
      });
    });

  btnClose[0].addEventListener("click", () => {
      popUp[0].classList.remove("up");
    });

  btnOpn[1].addEventListener("click", () => {
      popUp[1].classList.add("up");
      let btn2 = popUp[1].querySelectorAll("section.btn_set>button");
      let kid2 = popUp[1].querySelectorAll("section.pop>div");
      kid2[0].classList.add("on");

      kid2[0].classList.add("on");
      btn2[0].addEventListener("click", () => {
        kid2[0].classList.add("on");
        kid2[1].classList.remove("on");
        kid2[2].classList.remove("on");
      });
      btn2[1].addEventListener("click", () => {
        kid2[0].classList.remove("on");
        kid2[1].classList.add("on");
        kid2[2].classList.remove("on");
      });
      btn2[2].addEventListener("click", () => {
        kid2[0].classList.remove("on");
        kid2[1].classList.remove("on");
        kid2[2].classList.add("on");
      });
    });

  btnClose[1].addEventListener("click", () => {
      popUp[1].classList.remove("up");
    });
}

window.addEventListener("load", pop);
