// Định dạng email hợp lệ
let isValidEmail = function(val) {
    let emailPattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return emailPattern.test(val);
};

document.getElementById("registerButton").addEventListener("click", function() {
    let emailInput = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirmPassword");
    let passwordError = document.getElementById("passwordError");
    let passwordLengthError = document.getElementById("passwordLengthError");
    let isValid = true;

    // Kiểm tra email hợp lệ
    if (!isValidEmail(emailInput.value)) {
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Kiểm tra độ dài mật khẩu
    if (passwordInput.value.length < 6) {
        passwordLengthError.style.display = "block";
        isValid = false;
    } else {
        passwordLengthError.style.display = "none";
    }

    // Kiểm tra mật khẩu trùng khớp
    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.style.display = "block";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // Nếu không có lỗi
    if (isValid) {
        // Lưu thông tin vào Local Storage
        let user = {
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem("registeredUser", JSON.stringify(user));

        // Hiển thị thông báo Toastify
        Toastify({
            text: "Đăng ký thành công!",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();

        // Chuyển hướng đến trang đăng nhập sau 3 giây
        setTimeout(() => {
            window.location.href = "/pages/login.html";
        },);
    }
});