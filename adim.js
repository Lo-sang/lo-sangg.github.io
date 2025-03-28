const API_URL = "https://67c6b7b1351c081993fe69f6.mockapi.io/trongsang/api/v1"; // Thay YOUR_MOCKAPI_URL bằng URL MockAPI của bạn

$(document).ready(function () {
    updateCartCount(); // Cập nhật số lượng giỏ hàng ban đầu
    loadCartItems(); // Tải danh sách giỏ hàng từ MockAPI

    // Sự kiện thêm vào giỏ hàng
    $(".btn-add-to-cart").click(function () {
        let productCard = $(this).closest(".product");
        let productName = productCard.find(".card-title").text();
        let productPrice = productCard.find(".fw-bold").text().trim();
        let productImage = productCard.find("img").attr("src");

        let product = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        // Gửi dữ liệu lên MockAPI
        $.post(API_URL, product, function () {
            updateCartCount();
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
            loadCartItems(); // Cập nhật giỏ hàng
        });
    });

    // Xóa sản phẩm khỏi giỏ hàng
    $(document).on("click", ".btn-remove", function () {
        let productId = $(this).data("id");

        $.ajax({
            url: `${API_URL}/${productId}`,
            type: "DELETE",
            success: function () {
                alert("Đã xóa sản phẩm khỏi giỏ hàng!");
                updateCartCount();
                loadCartItems();
            }
        });
    });
});

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
    $.get(API_URL, function (data) {
        $("#cart-count").text(data.length);
    });
}

// Hiển thị danh sách giỏ hàng
function loadCartItems() {
    $.get(API_URL, function (data) {
        let cartHTML = "";
        data.forEach(item => {
            cartHTML += `
                <div class="d-flex justify-content-between align-items-center border-bottom p-2">
                    <img src="${item.image}" width="50">
                    <span>${item.name}</span>
                    <span class="text-danger fw-bold">${item.price}</span>
                    <button class="btn btn-danger btn-remove" data-id="${item.id}">Xóa</button>
                </div>
            `;
        });

        $("#cart-items").html(cartHTML);
    });
}

