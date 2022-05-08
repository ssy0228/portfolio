// "use strict";

function isPassive() {
  var supportsPassiveOption = false;
  try {
    addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassiveOption = true;
        },
      })
    );
  } catch (e) {}
  return supportsPassiveOption;
}

//Scroll
document.addEventListener(
  "wheel",
  function scrollPage(e) {
    var nodesName = ["SECTION", "SECTION", "SECTION", "SECTION", "SECTION"];
    console.log(e.target.nodeName);
    if (nodesName.includes(e.target.nodeName)) {
      var next = e.target.nextElementSibling;
      var prev = e.target.previousElementSibling;
    } else {
      var next = e.target.closest(nodesName).nextElementSibling;
      var prev = e.target.closest(nodesName).previousElementSibling;
    }

    if (e.deltaY < 0) {
      e.preventDefault();
      if (nodesName.includes(prev.nodeName)) {
        verticalScroll(prev, 500, "easeInOutCubic");
      }
    } else if (e.deltaY > 0) {
      e.preventDefault();
      if (nodesName.includes(next.nodeName)) {
        verticalScroll(next, 500, "easeInOutQuad", runAfter);
      }
    } else {
      return false;
    }
  },
  isPassive()
    ? {
        // capture: false,
        passive: false,
      }
    : false
);

function runAfter() {
  console.log("after");
}

function verticalScroll(destination) {
  var duration = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  var easing = arguments.length <= 2 || arguments[2] === undefined ? "linear" : arguments[2];
  var callback = arguments[3];
  var easings = {
    easeInOutQuad: function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
  };

  console.log(easings.easeInOutQuad);

  var start = window.scrollY;
  var startTime = "now" in window.performance ? performance.now() : new Date().getTime();
  var documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("main")[0].clientHeight;
  var destinationOffset = typeof destination === "number" ? destination : destination.offsetTop;
  var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  console.log(`documentHeight ${documentHeight}`);
  console.log(`windowHeight ${windowHeight}`);
  console.log(`destinationOffset ${destinationOffset}`);
  console.log(`destinationOffsetToScroll ${destinationOffsetToScroll}`);

  if ("requestAnimationFrame" in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    var now = "now" in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, (now - startTime) / duration);
    var timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

    if (window.scrollY === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

// Mouse Custom Cursor
function pointer() {
  const cursor = document.querySelector(".cursor");
  const cursor2 = document.querySelector(".cursor2");
  const link = document.querySelectorAll("a");
  const btn = document.querySelectorAll("button");

  document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 30%), calc(${e.clientY}px - 30%), 0)`;
    cursor.style.zIndex = 999;
    cursor2.style.left = `${x}px`;
    cursor2.style.top = `${y}px`;
    cursor2.style.zIndex = 999;
  });

  // document.addEventListener("mousemove", (e) => {
  //   let x = e.clientX;
  //   let y = e.clientY;
  // });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("click");
    cursor2.classList.add("hover");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
    cursor2.classList.remove("hover");
  });

  link.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("click");
      cursor2.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("click");
      cursor2.classList.remove("hover");
    });
  });
  btn.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("click");
      cursor2.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("click");
      cursor2.classList.remove("hover");
    });
  });
}

window.addEventListener("load", pointer);



document.querySelector("button.top").addEventListener("click", () => {
  window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  return false;
});
