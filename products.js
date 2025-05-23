   const products = [
      {
        title: "Premium Gift Sets",
        description: "Elegantly packaged gift sets customized with your corporate branding.",
        image: "https://via.placeholder.com/300x200?text=Gift+Sets"
      },
      {
        title: "Custom Stationery",
        description: "High-quality stationery items including notebooks, pens, and desk accessories.",
        image: "https://via.placeholder.com/300x200?text=Stationery"
      },
      {
        title: "Awards & Recognition",
        description: "Celebrate achievements with our custom-designed awards and recognition items.",
        image: "https://via.placeholder.com/300x200?text=Awards"
      },
      {
        title: "Tech Accessories",
        description: "Modern tech accessories with your branding for the digital workplace.",
        image: "https://via.placeholder.com/300x200?text=Tech+Accessories"
      }
    ];

    const productGrid = document.getElementById("productGrid");

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image" />
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.description}</p>
        </div>
      `;

      productGrid.appendChild(card);
    });