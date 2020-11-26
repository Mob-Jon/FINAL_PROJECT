$(document).ready(() => {
    $("ul li").on('click',function () {
          $(this).addClass('active').siblings().removeClass('active');
    });
    $('.fa-bars').on('click', function(){
        $('.sidenav').toggle(500);
    })
    $('#dashboard').show();
    $('#student').hide();
    $('#faculty').hide();
    $('#recognition').hide();
    $('ul').on('click', 'li', function (e) {
        var id = $(this).find('a').attr('href');
        $(id).show().siblings().hide();    
    });
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [2478,5267,734,784,433]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
    });
})