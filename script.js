$(document).ready(function () {
  // Your jQuery code here (e.g., highlighting rows on hover)
  $("tbody tr").hover(function () {
    $(this).toggleClass("highlight");
  });

  // 1. Get table headers and store in an array
  let tableHeaders = [];
  $("table thead th").each(function () {
    tableHeaders.push($(this).text());
  });

  // Clear the dropdown menu before populating (optional)
  $(".dropdown-menu").empty();

  // Populate dropdown menu items
  $.each(tableHeaders, function (index, value) {
    if (index !== 0) {
      $(".dropdown-menu").append(
        '<li><input data-index="' +
          index +
          '" type="checkbox" checked>' +
          value +
          "</li>"
      );
    }
  });

    // Toggle dropdown menu on click
    $(".dropdown-toggle").on("click", function () {
        console.log('click')
      $(this).parent(".dropdown").toggleClass("active");
    });

    // Close dropdown menu on click outside (event delegation)
    $(document).on("click", function (event) {
        if (
        !$(event.target).closest(".dropdown").length &&
        $(".dropdown").hasClass("active")
        ) {
        $(".dropdown").removeClass("active");
        }
    });

    let hiddenColumns = []; // Array to store indexes of hidden columns
    $("table thead th").each(function () {
        let index = $(this).index();
        tableHeaders.push($(this).text());
        hiddenColumns.push(false); // Initially, all columns are visible
    });
    console.log(hiddenColumns);

    // Log item index on click
    $(".dropdown-menu li input").click(function () {
        let clickedIndex = $(this).data("index");
        hiddenColumns[clickedIndex] = !$(this).is(":checked"); // Toggle hidden state based on checkbox
        console.log(hiddenColumns);
        console.log("Clicked item index:", hiddenColumns[clickedIndex]);

        // Update table visibility
        $("table thead th:eq(" + clickedIndex + ")").toggle();
        $("table tbody tr").each(function () {
        $(this)
            .find("td:eq(" + clickedIndex + ")")
            .toggle();
        });
    });
});
    
new DataTable("#example", {
  layout: {
    bottomEnd: {
      paging: {
        boundaryNumbers: false,
      },
    },
  },
});
