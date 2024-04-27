// Initialize DataTables on the table

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
  pagingType: "simple_numbers",
  scrollCollapse: true,
  scrollX: true,
  select: {
    style: "multi",
  },
  responsive: true,
  // scrollY: 300,
  // dom: 't<"clear">', // Remove the default toolbar
});

$(document).ready(function () {
  // Your jQuery code here (e.g., highlighting rows on hover)
  $("tbody tr").hover(function () {
    $(this).toggleClass("highlight");
  });

  // 1. Get table headers and store in an array
  let tableHeaders = [];
  $("table thead:first-child th").each(function () {
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
  $(".dropdown-toggle").on("click", function () {
    let dropdown = $(this).parent(".dropdown");
    $(".dropdown").not(dropdown).removeClass("active");
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

  // Attach a click event handler to any element you want to track
  $(document).on("click", ".tabel-action-toggle", function (event) {
    var clickedElement = $(this);

    // Get the left and top position of the clicked element relative to the document
    var leftPosition = clickedElement.offset().left;
    var topPosition = clickedElement.offset().top;

    // Optionally, log the positions to the console or use them for further actions
    console.log("Left position:", leftPosition + "px");
    console.log("Top position:", topPosition + "px");

    $(this)
      .parent(".table-action-dropdown")
      .find(".table-actions-menu")
      .css({
        left: leftPosition + "px",
        top: topPosition + 25 + "px",
      });

    // You can also use these positions for other purposes, like:
    // - Displaying a tooltip or popup at the clicked location
    // - Triggering an animation based on the clicked element's position
  });

  var table = $("#example").DataTable();

  // Attach click event handler to table rows (tbody)
  $("#example tbody tr").click(function () {
    // Get the ID of the clicked row
    var rowId = table.row(this).id();

    // Check if ID exists before using it
    if (rowId) {
      console.log("Clicked row ID:", rowId);
    } else {
      console.log("Clicked row doesn't have an ID");
    }
  });

  // Attach click event handler to the checkbox in thead
  $('table thead th:first-child input[type="checkbox"]').click(function () {
    // Get the checked state of the clicked checkbox
    var isChecked = $(this).is(":checked");

    // Apply the checked state to all checkboxes in the first column of tbody
    $('table tbody td:first-child input[type="checkbox"]').prop(
      "checked",
      isChecked
    );
  });
});

