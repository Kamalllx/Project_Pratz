document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with custom settings
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
  // Bookings Per Month Chart
  const bookingsCtx = document.getElementById("bookingsChart").getContext("2d");
  const bookingsChart = new Chart(bookingsCtx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Bookings",
          data: [100, 200, 300, 400, 350, 500, 600, 650, 700, 800, 900, 1000],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  // User Demographics Chart
  const demographicsCtx = document
    .getElementById("demographicsChart")
    .getContext("2d");
  const demographicsChart = new Chart(demographicsCtx, {
    type: "bar",
    data: {
      labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
      datasets: [
        {
          label: "Users",
          data: [1000, 2500, 2000, 1500, 500],
          backgroundColor: "rgba(255, 159, 64, 0.6)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Enhanced Swiper configuration
  const swiper = new Swiper(".swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 700,
    allowTouchMove: true, // Disable dragging to change slides
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: false,
    on: {
      slideChange: function () {
        updateSidebar(swiper.activeIndex);
        refreshCharts(); // Refresh charts when sliding
      },
    },
  });

  function reinitializeHoverEffects() {
    // Example: Initialize or reapply hover effects
    const buttons = document.querySelectorAll(".button-class"); // Replace with your actual button class
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.classList.add("hovered"); // Apply hover effect
      });
      button.addEventListener("mouseleave", () => {
        button.classList.remove("hovered"); // Remove hover effect
      });
    });
  }
  function refreshSlideContent() {
    // Reattach event listeners or reinitialize hover effects here
    document.querySelectorAll(".button-class").forEach((button) => {
      button.addEventListener("click", handleButtonClick); // Attach click listener
    });
  
    // Similarly, refresh hover listeners
    document.querySelectorAll(".hover-element-class").forEach((hoverElement) => {
      hoverElement.addEventListener("mouseover", handleHoverEffect); // Attach hover listener
    });
  
    // Trigger a reflow or refresh Swiper instance to ensure interactivity
    swiper.update(); // Refresh the Swiper instance
  }
  
  // Navigation and sidebar functions
  function Navigate(index) {
    document
      .querySelectorAll(".Links li")
      .forEach((li) => li.classList.remove("activeLink"));
    document.querySelectorAll(".Links li")[index].classList.add("activeLink");
  
    swiper.slideTo(index, 1000, true); // Navigate to the slide
    refreshSlideContent(); // Refresh buttons and hover interactivity
  }
  

  function updateSidebar(activeIndex) {
    document
      .querySelectorAll(".Links li")
      .forEach((li) => li.classList.remove("activeLink"));
    document
      .querySelectorAll(".Links li")
      [activeIndex].classList.add("activeLink");
  }

  // Set navigation for side bar links
  document.querySelectorAll(".Links li").forEach((li, index) => {
    li.addEventListener("click", () => Navigate(index));
  });

  // Enhanced chart configurations

  // Function to create a bar chart
  function createBarChart() {
    const ctx = document.getElementById("revenueChart").getContext("2d");

    const revenueChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Paris", "Tokyo", "New York", "Bali", "Rome"], // Example data
        datasets: [
          {
            label: "Revenue ($)",
            data: [45000, 38000, 30000, 29000, 26000], // Example revenue data
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutBounce",
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  // Call this function when the page or slide loads
  createBarChart();
  // Sample feedback data
  const feedbackData = [
    {
      destination: "Paris",
      customer: "John Doe",
      feedback: "Loved the trip!",
      rating: 5,
    },
    {
      destination: "Tokyo",
      customer: "Jane Smith",
      feedback: "Amazing experience!",
      rating: 4.5,
    },
    {
      destination: "New York",
      customer: "Alex Johnson",
      feedback: "Great trip but crowded",
      rating: 4,
    },
    {
      destination: "Bali",
      customer: "Chris Lee",
      feedback: "Beautiful place!",
      rating: 4.7,
    },
    {
      destination: "Rome",
      customer: "Sophia White",
      feedback: "Very historical!",
      rating: 4.8,
    },
  ];

  // Populate feedback table
  function populateFeedbackTable(data) {
    const tableBody = document.getElementById("feedbackTableBody");
    tableBody.innerHTML = "";
    data.forEach((item) => {
      const row = `
      <tr>
        <td>${item.destination}</td>
        <td>${item.customer}</td>
        <td>${item.feedback}</td>
        <td>${item.rating}</td>
        <td><button onclick="deleteFeedback('${item.customer}')">Delete</button></td>
      </tr>
    `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Filter feedback by destination
  function filterFeedback() {
    const selectedDestination =
      document.getElementById("destination-filter").value;
    const filteredData =
      selectedDestination === "all"
        ? feedbackData
        : feedbackData.filter(
            (item) => item.destination === selectedDestination
          );
    populateFeedbackTable(filteredData);
  }

  // Delete feedback (for simplicity, just remove it from the table)
  function deleteFeedback(customer) {
    const updatedData = feedbackData.filter(
      (item) => item.customer !== customer
    );
    populateFeedbackTable(updatedData);
  }

  // Generate Average Ratings Chart
  // Generate Average Ratings Chart with enhanced design
  function generateRatingsChart() {
    const ctx = document.getElementById("ratingsChart").getContext("2d");
    const averageRatings = {
      Paris: 5,
      Tokyo: 4.5,
      "New York": 4,
      Bali: 4.7,
      Rome: 4.8,
    };

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(averageRatings),
        datasets: [
          {
            label: "Average Rating",
            data: Object.values(averageRatings),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 0.5,
            },
          },
        },
        animation: {
          duration: 1000,
          easing: "easeInOutCubic",
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  // Generate Customer Satisfaction Over Time Chart
  function generateSatisfactionChart() {
    const ctx = document.getElementById("satisfactionChart").getContext("2d");
    const satisfactionData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Satisfaction Score",
          data: [4.2, 4.3, 4.4, 4.1, 4.5, 4.6, 4.3, 4.4, 4.7, 4.6, 4.8, 4.5],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          fill: true,
          pointRadius: 3,
          tension: 0.4,
        },
      ],
    };

    new Chart(ctx, {
      type: "line",
      data: satisfactionData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
        animation: {
          duration: 1000,
          easing: "easeInOutQuad",
        },
      },
    });
  }

  // Call both chart functions on page load
  window.onload = function () {
    populateFeedbackTable(feedbackData); // For the feedback table
    generateRatingsChart(); // Average ratings chart
    generateSatisfactionChart(); // Customer satisfaction chart
  };

  // Function to refresh charts on slide change
  function refreshCharts() {
    bookingsChart.update();
    revenueChart.update();
    tripsChart.update();
    paymentsChart.update();
  }
  // Function to dynamically update content (e.g., Popular Destinations)
  function updateContent() {
    const destinationList = document.querySelector(".destination-list");
    const popularDestinations = [
      { name: "Paris", visits: 4532 },
      { name: "Tokyo", visits: 3621 },
      { name: "New York", visits: 2985 },
      { name: "Bali", visits: 2873 },
    ];

    destinationList.innerHTML = "";
    popularDestinations.forEach((dest) => {
      const listItem = document.createElement("div");
      listItem.classList.add("destination-item");
      listItem.innerHTML = `<strong>${dest.name}</strong> - ${dest.visits} visits`;
      destinationList.appendChild(listItem);
    });
  }

  // Call to update dynamic content on load
  updateContent();
});
