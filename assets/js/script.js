$(document).ready(function () {

    $('#btnSuperHero').on('click', function (event) {
        event.preventDefault();

        const regexValidacion = /^[0-9]+$/i;
        let idSuperHero = $('#superHero').val();

        if (regexValidacion.test(idSuperHero) && idSuperHero > 0 && idSuperHero < 733) {
            getSuperHero(idSuperHero);
            console.log(idSuperHero);
        } else {
            location.reload();
            return alert('¡El valor del ID no es válido!\nIngrese un número entre 1 y 732.');
        }
    });

    function getSuperHero(idSuperHero) {
        let urlBase = 'https://www.superheroapi.com/api.php/3525635500807579/' + idSuperHero;
        $.ajax({
            method: "GET",
            url: urlBase,
            dataType: "json",
        }).done(function (dataSuperHero) {

            // console.log(dataSuperHero);

            if (dataSuperHero != undefined || dataSuperHero != null) {
                renderData(dataSuperHero);
            } else if (dataSuperHero == null || dataSuperHero == undefined || dataSuperHero == "", "-", "0") {
                alert('Lo sentimos, no se encontraron datos de este SuperHero.');
                return;

                // El else if no me funcionó, lo probé con el SuperHero 47 que tiene varios valores en null, cero o vacíos, pero no logré que me mostrara el alert. Casi al final intenté crear un nuevo array con solo los datos que necesitaba pero me desconfiguraba todo y me estaba estresando xd. Alguna sugerencia?
            }
        });
    }

    const renderData = (dataSuperHero) => {
        console.log(dataSuperHero);

        $('#superHero').val('');
        graphSuperHero(dataSuperHero);

        $('#card-title').text(`Nombre: ${dataSuperHero.name}`);
        $('#card-img').attr('src', dataSuperHero.image.url);
        $('#card-info').text(`Conexiones: ${dataSuperHero.connections['group-affiliation']}`);
        $('#card-info-1').text(`Publicado por: ${dataSuperHero.biography.publisher}`);
        $('#card-info-2').text(`Ocupación: ${dataSuperHero.work.occupation}`);
        $('#card-info-3').text(`Primera aparición: ${dataSuperHero.biography['first-appearance']}`);
        $('#card-info-4').text(`Altura: ${dataSuperHero.appearance.height}`);
        $('#card-info-5').text(`Peso: ${dataSuperHero.appearance.weight}`);
        $('#card-info-6').text(`Alianzas: ${dataSuperHero.biography.aliases}`);
        $('#dataSection').removeClass('d-none');
        $('#myChart').removeClass('d-none');
    }

    const graphSuperHero = (dataSuperHero) => {

        const powerstats = dataSuperHero.powerstats;
        console.log(powerstats);

        const totalPowerStats = [];
        for (const key in powerstats) {
            totalPowerStats.push({ label: key, x: Number(powerstats[key]) })
        };

        console.log(totalPowerStats);

        // Tengo una duda con el/los graficos. Al ir cargando nuevos ID se muestran bien los datos y nuevos graficos, pero quedan "guardados" los graficos anteriores y al hacer click en algunas de las barras se muestran los otros graficos. Lo trate de arregar con un location.reload(), pero no supe donde agregarlo porque o me creaba un bucle de recarga infinito o despues de hacer click en el button del form me recargaba a cero el html. Espero haberme explicado, alguna sugerencia?
        const myChart = new Chart("myChart", {
            type: 'horizontalBar',
            data: {
                labels: ["intelligence", "strength", "speed", "durability", "power", "combat"],
                datasets: [{
                    axis: 'x',
                    label: `Estadisticas de Poder para ${dataSuperHero.name}`,
                    data: totalPowerStats,
                    fill: true,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(201, 203, 207, 0.5)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            stepSize: 10
                        }
                    }]
                }
            }                                  
        }); 
    }    
})