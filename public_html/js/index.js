$(function() {
    function checkX(x) {
        x = x.replace(',', '.');
        x = parseFloat(x);
        if (isNaN(x) || x < -3 || x > 5) {
            return true;
        }
        return false;
    }

    function checkY(y) {
        y = y.replace(',', '.');
        y = parseFloat(y);
        if (isNaN(y) || y < -5 || y > 5) {
            return true;
        }
        return false;
    }

    function checkR(r) {
        var validValuesR = [1, 1.5, 2, 2.5, 3];
        r = parseFloat(r);
        if (isNaN(r) || r < 1 || r > 3 || !validValuesR.includes(r)) {
            return true;
        }
        return false;
    }

    // Добавляем стили CSS прямо в JavaScript
    var css = `
        .choose-input.active {
            background-color: #3498db;
            color: white;
        }
    `;

    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    $('.choose-input').click(function() {
        var x = $(this).val();
        $('#x').val(x);

        // Уберите класс 'active' у всех кнопок значений X
        $('.choose-input').removeClass('active');

        // Добавьте класс 'active' только для выбранной кнопки
        $(this).addClass('active');

        if (checkX(x)) {
            $('#notification').text('Введите x от -3 до 5');
        } else {
            $('#notification').text('');
        }
    });

    $('#sendButton').click(function(event) {
        event.preventDefault();

        var x = $('#x').val();
        var y = $('#y').val();
        var r = $('#r').val();

        if (checkX(x)) {
            $('#notification').text('Введите x от -3 до 5');
            return;
        }

        if (checkY(y)) {
            $('#notification').text('Выберите y от -5 до 5');
            return;
        }

        if (checkR(r)) {
            $('#notification').text('Выберите r');
            return;
        }

        $.ajax({
            url: 'php/index.php',
            method: 'GET',
            data: {
                x: x,
                y: y,
                r: r
            },
            success: function(response) {
                if (response.startsWith('Ошибка')) {
                    $('#notification').text(response);
                } else {
                    $('#notification').text('');

                    var savedData = localStorage.getItem('table');

                    // Если в localStorage уже есть данные, добавить новый результат к ним
                    if (savedData) {
                        savedData += response;
                    } else {
                        savedData = response;
                    }

                    // Сохранение данных в localStorage
                    localStorage.setItem('table', savedData);

                    window.location.href = 'results.html';
                }
            }
        });
    });
});