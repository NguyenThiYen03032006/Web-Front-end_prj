// Toggle menu tài khoản khi click vào biểu tượng
document.addEventListener("click", function (e) {
    const menu = document.getElementById("accMenu");
    const drop = document.getElementById("accDrop");
    if (menu.contains(e.target)) {
      drop.classList.toggle("show");
    } else {
      drop.classList.remove("show");
    }
  });
  
  // Xử lý logic chính
  
  document.addEventListener("DOMContentLoaded", function () {
    // === Lấy các phần tử DOM cần dùng ===
    const monthInput = document.querySelector(".month-input");
    const budgetInput = document.querySelector(".budget-input");
    const saveBtn = document.querySelector(".save-btn");
    const categoryNameInput = document.querySelector(".category-name");
    const categoryLimitInput = document.querySelector(".category-limit");
    const addCategoryButton = document.querySelector(".add-category");
    const categoryList = document.querySelector(".category-list");
    const transactionAmountInput = document.querySelector(".transaction-amount");
    const transactionNoteInput = document.querySelector(".transaction-note");
    const transactionCategorySelect = document.querySelector(".transaction-category");
    const addTransactionBtn = document.querySelector(".add-transaction");
    const historyList = document.querySelector(".history-list");
    const searchInput = document.querySelector(".search-input");
    const sortSelect = document.querySelector(".sort-option");
    const pagination = document.querySelector(".pagination");
    const moneyValue = document.querySelector(".money-value");

    // === Khai báo biến trạng thái ===
    let currentMonth = "";
    let editingCategoryIndex = null;
    let currentPage = 1;
    const itemsPerPage = 5; // số giao dịch mỗi trang

    // === Dữ liệu trong localStorage ===
    let monthlyCategories = JSON.parse(localStorage.getItem("monthlyCategories")) || [];
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // === Lấy dữ liệu tháng, nếu chưa có thì tạo mới ===
    function getMonthData(month) {
        let data = monthlyCategories.find(m => m.month === month);
        if (!data) {
            data = { id: Date.now(), month: month, amount: 0, categories: [] };
            monthlyCategories.push(data);
        }
        return data;
    }

    // === Lưu dữ liệu tháng vào localStorage ===
    function saveMonthData(monthData) {
        const index = monthlyCategories.findIndex(m => m.month === monthData.month);
        monthlyCategories[index] = monthData;
        localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
    }

    // === Hiển thị dropdown danh mục cho giao dịch ===
    function renderCategoryDropdown(categories) {
        transactionCategorySelect.innerHTML = '<option value="">-- Chọn danh mục --</option>';
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            transactionCategorySelect.appendChild(option);
        });
    }

    // === Hiển thị danh sách danh mục ===
    function renderCategories(categories) {
        categoryList.innerHTML = "";
        categories.forEach((cat, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${cat.name} - Giới hạn: ${cat.budget.toLocaleString()} VND</span>
                <div class="actions">
                    <span class="edit" data-index="${index}">Sửa</span>
                    <span class="delete" data-index="${index}">Xóa</span>
                </div>
            `;
            categoryList.appendChild(li);
        });
        renderCategoryDropdown(categories);
    }

    // === Sửa hoặc xóa danh mục khi bấm nút tương ứng ===
    categoryList.addEventListener("click", function (e) {
        const index = e.target.dataset.index;
        const monthData = getMonthData(currentMonth);
        const categories = monthData.categories;

        if (e.target.classList.contains("edit")) {
            const cat = categories[index];
            categoryNameInput.value = cat.name;
            categoryLimitInput.value = cat.budget;
            editingCategoryIndex = index;
            addCategoryButton.textContent = "Sửa danh mục";
        }

        if (e.target.classList.contains("delete")) {
            categories.splice(index, 1);
            saveMonthData(monthData);
            renderCategories(categories);
            editingCategoryIndex = null;
            addCategoryButton.textContent = "Thêm danh mục";
        }
    });

    // === Thêm hoặc cập nhật danh mục ===
    addCategoryButton.addEventListener("click", function () {
        const name = categoryNameInput.value.trim();
        const limit = parseFloat(categoryLimitInput.value.trim());

        if (!name || isNaN(limit) || limit <= 0) {
            alert("Vui lòng nhập tên danh mục và số tiền hợp lệ!");
            return;
        }

        const monthData = getMonthData(currentMonth);

        if (editingCategoryIndex !== null) {
            // Cập nhật danh mục
            monthData.categories[editingCategoryIndex].name = name;
            monthData.categories[editingCategoryIndex].budget = limit;
            editingCategoryIndex = null;
            addCategoryButton.textContent = "Thêm danh mục";
        } else {
            // Thêm mới danh mục
            const newCategory = {
                id: Date.now(),
                name: name,
                budget: limit
            };
            monthData.categories.push(newCategory);
        }

        saveMonthData(monthData);
        renderCategories(monthData.categories);
        categoryNameInput.value = "";
        categoryLimitInput.value = "";
    });

    // === Hiển thị danh sách giao dịch có phân trang ===
    function renderTransactions(filteredTransactions) {
        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages) || 1;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = filteredTransactions.slice(start, end);
        historyList.innerHTML = "";

        pageItems.forEach(tx => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${tx.note} - ${tx.amount.toLocaleString()} VND (${tx.date})</span>
                <span class="delete" data-id="${tx.id}">Xóa</span>
            `;
            historyList.appendChild(li);
        });

        renderPagination(totalPages);
    }

    // === Tạo nút phân trang ===
    function renderPagination(totalPages) {
        pagination.innerHTML = "";

        if (totalPages <= 1) return;

        pagination.innerHTML += `<button class="prev">«</button>`;
        for (let i = 1; i <= totalPages; i++) {
            pagination.innerHTML += `<button class="page${i === currentPage ? " active" : ""}" data-page="${i}">${i}</button>`;
        }
        pagination.innerHTML += `<button class="next">»</button>`;
    }

    // === Lọc, tìm kiếm và sắp xếp giao dịch ===
    function applyFilters() {
        let filtered = transactions.filter(tx => tx.month === currentMonth);
        const keyword = searchInput.value.trim().toLowerCase();
        const sortType = sortSelect.value;

        if (keyword) {
            filtered = filtered.filter(tx => tx.note.toLowerCase().includes(keyword));
        }

        if (sortType === "asc") {
            filtered.sort((a, b) => a.amount - b.amount);
        } else if (sortType === "desc") {
            filtered.sort((a, b) => b.amount - a.amount);
        }

        renderTransactions(filtered);
    }

    // === Bắt sự kiện bấm nút phân trang ===
    pagination.addEventListener("click", function (e) {
        if (e.target.classList.contains("prev") && currentPage > 1) {
            currentPage--;
        } else if (e.target.classList.contains("next")) {
            const filtered = transactions.filter(tx => tx.month === currentMonth);
            const totalPages = Math.ceil(filtered.length / itemsPerPage);
            if (currentPage < totalPages) currentPage++;
        } else if (e.target.classList.contains("page")) {
            currentPage = parseInt(e.target.dataset.page);
        } else {
            return;
        }
        applyFilters();
    });

    // === Xóa giao dịch ===
    historyList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
            const id = parseInt(e.target.dataset.id);
            transactions = transactions.filter(tx => tx.id !== id);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            applyFilters();
        }
    });

    // === Lưu số tiền tháng ===
    saveBtn.addEventListener("click", function () {
        const selectedMonth = monthInput.value;
        const budgetAmount = parseFloat(budgetInput.value.trim());
        if (isNaN(budgetAmount) || budgetAmount <= 0) {
            alert("Vui lòng nhập số tiền hợp lệ!");
            return;
        }
        const monthData = getMonthData(selectedMonth);
        monthData.amount = budgetAmount;
        saveMonthData(monthData);
        moneyValue.textContent = monthData.amount.toLocaleString() + " VND";
    });

    // === Thêm giao dịch mới ===
    addTransactionBtn.addEventListener("click", function () {
        const amount = parseFloat(transactionAmountInput.value.trim());
        const note = transactionNoteInput.value.trim();
        const month = monthInput.value;
        const categoryId = transactionCategorySelect.value;

        if (isNaN(amount) || amount <= 0 || !note) {
            alert("Vui lòng nhập số tiền hợp lệ và ghi chú!");
            return;
        }

        const newTx = {
            id: Date.now(),
            amount,
            note,
            month,
            categoryId: categoryId || null,
            date: new Date().toLocaleDateString("vi-VN")
        };

        transactions.push(newTx);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        transactionAmountInput.value = "";
        transactionNoteInput.value = "";
        transactionCategorySelect.value = "";
        applyFilters();
    });

    // === Khi chọn sắp xếp hoặc tìm kiếm thì load lại trang đầu tiên ===
    sortSelect.addEventListener("change", () => {
        currentPage = 1;
        applyFilters();
    });

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        applyFilters();
    });

    // === Khi thay đổi tháng thì cập nhật dữ liệu ===
    monthInput.addEventListener("change", function () {
        currentMonth = this.value;
        const monthData = getMonthData(currentMonth);
        saveMonthData(monthData);
        moneyValue.textContent = monthData.amount.toLocaleString() + " VND";
        renderCategories(monthData.categories);
        currentPage = 1;
        applyFilters();
    });

    // === Khởi động: gọi sự kiện để load tháng hiện tại ===
    monthInput.dispatchEvent(new Event("change"));
});
