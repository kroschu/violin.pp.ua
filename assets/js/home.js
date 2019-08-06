const { $ } = window;
// once the document is ready hide korean and display only english
// also hide all other tour dates except 2018
$(function () {
  $('.english').hide();
  $('.korean').hide();
  for (let i = 10; i <= 20; i += 1) {
    $(`#itin-20${i}`).hide();
  }
  $('#itin-2019').show();
});

$('.itin-btn:nth-child(2)').addClass('active')

// fixed or unfixed header depending on where you are in the page
function fixedHeader() {
  $('.navbar-brand').css('font-size', '2rem');
  $('.nav-link').css('font-size', '1rem');
  $('.nav-link').css('margin', '0 2px');
}

function unfixedHeader() {
  $('.navbar-brand').css('font-size', '6rem');
  $('.nav-link').css('font-size', '1.2rem');
  $('.nav-link').css('margin', '0 12px');
}

// fixes glitch where on refresh if you are at the top of the page after the big header, the small header does not show up without scrolling
const myFunction = function () {
  if ($(window).width() > 992) {
    if ($(window).scrollTop() === 0) {
      unfixedHeader();
    } else if ($(window).scrollTop() > 188 && $(window).scrollTop() < 1644) {
      fixedHeader();
    }
  }
};

window.onload = myFunction;

// check for scrolling
$(window).scroll(function () {
  // if width greater than 992
  if ($(window).width() > 992) {
    // if scrolling greater than 188
    if ($(window).scrollTop() >= 188) {
      // change header to smaller font
      fixedHeader();
    } else {
      // change header to larger font
      unfixedHeader();
    }
  }
});

// check for window width resize
$(window).resize(function () {
  // if width is more than 992px
  if ($(window).width() > 992) {
    // change header to larger font
    unfixedHeader();
  } else {
    // change header to smaller font
    fixedHeader();
  }
});

// on button click, alternate between english and korean
$('.eng').click(function () {
  $('.korean').hide();
  $('.english').show();
});

$('.kor').click(function () {
  $('.korean').show();
  $('.english').hide();
});

// when clicking an itinerary button
$('.itin-btn').click(function () {
  // hide all tour dates
  for (let i = 10; i <= 20; i += 1) {
    $(`#itin-20${i}`).hide();
  }
  // show only the tour year clicked
  $(`#itin-${$(this).text()}`).show();
  $('#year').html($(this).text());

  //remove active class from all buttons
  $('.itin-btn').removeClass('active')
  //add active class to button
  $(this).toggleClass('active')
});

// smooth scrolling when clicking on a link
$('a').on('click', function (event) {
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== '') {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    const { hash } = this;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800,
      function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      }
    );
  } // End if
});

// activate lightbox
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox({
    wrapping: false,
    loadingMessage: true,
    alwaysShowClose: true,
  });
});

// gather all objects in an array
const itinAll = [itin2017, itin2018, itin2019, itin2020];

// loop over the itinAll
for (let j = 0; j < itinAll.length; j += 1) {
  // loop over each event in each year
  for (let i = 0; i < itinAll[j].length; i += 1) {
    // create a div tag with event and title
    const div = document.createElement('div');
    div.className = 'mb-5';
    let inner = `<p class="event">${itinAll[j][i].event}</p><p class="info">${
      itinAll[j][i].title
      }`;

    // append these details if not empty
    if (itinAll[j][i].conductor) {
      inner = `${inner}<br>Conductor: ${itinAll[j][i].conductor}`;
    }
    if (itinAll[j][i].presenter) {
      inner = `${inner}<br>Presenter: ${itinAll[j][i].presenter}`;
    }
    if (itinAll[j][i].venue) {
      inner = `${inner}<br>Venue: ${itinAll[j][i].venue}`;
    }
    if (itinAll[j][i].link) {
      inner = `${inner}<br><a href="${
        itinAll[j][i].link
        }" class="details">Details</a>`;
    }

    // append location, because location should not be empty
    inner = `${inner}</p><p>${itinAll[j][i].location}</p>`;

    // store the info for each event inside the div tag
    div.innerHTML = inner;
    // select the year in the HTML and append each new event to the year

    //if the 3rd year (meaning 2020, select 2020 div on page and append dates to it)
    if (j >= 3) {
      document.querySelector(`#itin-20${j + 17}`).appendChild(div);
      //otherwise if still in the 10's, select that div and append dates to it
    } else {
      document.querySelector(`#itin-201${j + 7}`).appendChild(div);
    }

  }
}
