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
  $(".column-list").empty();

  // Populate dropdown menu items
  $.each(tableHeaders, function (index, value) {
    if (index !== 0) {
      $(".column-list").append(
        '<li><input data-index="' +
          index +
          '" type="checkbox" checked>' +
          value +
          "</li>"
      );
    }
  });

  // Toggle dropdown menu on click
  $(".columns-dropdown-toggle").on("click", function () {
    $(this).parent(".columns-dropdown").toggleClass("active");
  });

  // Close dropdown menu on click outside (event delegation)
  $(document).on("click", function (event) {
      if (
      !$(event.target).closest(".columns-dropdown").length &&
      $(".columns-dropdown").hasClass("active")
      ) {
      $(".columns-dropdown").removeClass("active");
      }
  });

  let hiddenColumns = []; // Array to store indexes of hidden columns
  $("table thead th").each(function () {
      let index = $(this).index();
      tableHeaders.push($(this).text());
      hiddenColumns.push(false); // Initially, all columns are visible
  });

  // Log item index on click
  $(".column-list li input").click(function () {
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

let table = new DataTable("#example", {
  layout: {
    bottomEnd: {
      paging: {
        boundaryNumbers: false,
      },
    },
  },
  columnDefs: [
    {
      sortable: false,
      targets: 0,
    },
  ],
  fixedColumns: true,
  order: [[1, "asc"]],
  paging: false,
  scrollCollapse: true,
  scrollX: true,
  scrollY: 300,
  dom: 't<"clear">', // Remove the default toolbar
});
