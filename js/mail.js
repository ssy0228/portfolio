window.addEventListener("load", () => {
  const addr = document.querySelector("#mailaddr");
  const subject = document.querySelector("#subject");
  const message = document.querySelector("#message");

  document.querySelector("input[type='submit']").addEventListener("click", (mail) => {
    const mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mail_format.test(addr.value)) {
      document.EmailForm.mailadd.focus();
      window.location.href = `mailto:alchemist0228@gmail.com?subject=${subject.value}&body=${message.value}`;
      return true;
    } else {
      alert("정확한 메일주소를 기재해주세요.");
      document.EmailForm.mailadd.focus();
      return false;
    }
  });
});
