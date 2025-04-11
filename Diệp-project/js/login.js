document.getElementById("loginButton").addEventListener("click", function() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const loginError = document.getElementById("loginError");

    // Reset thông báo 
    emailError.style.display = "none";
    passwordError.style.display = "none";
    loginError.style.display = "none";

    let isValid = true;

    if (email === "") {
        emailError.innerText = "Email đang bị bỏ trống";
        emailError.style.display = "block";
        isValid = false;
    }

    if (password === "") {
        passwordError.innerText = "Mật khẩu đang bị bỏ trống";
        passwordError.style.display = "block";
        isValid = false;
    }

    if (!isValid) return;

    // Lấy thông tin từ Local Storage
    const loginUser = localStorage.getItem("registeredUser");

    if (loginUser) {
        const InformUser = JSON.parse(loginUser);

        // Kiểm tra email và mật khẩu
        if (email === InformUser.email && password === InformUser.password) {
            Toastify({
                text: "Đăng nhập thành công!",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();

            setTimeout(() => {
                window.location.href = "/pages/index.html";
            }, 1000);
        } else {
            loginError.innerText = "Email hoặc Mật khẩu không đúng";
            loginError.style.display = "block";
        }
    } else {
        loginError.innerText = "Không có tài khoản này";
        loginError.style.display = "block";
    }
});