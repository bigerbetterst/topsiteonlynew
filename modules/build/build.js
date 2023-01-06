//Подгрузка информации о городе
$(".build-obj").click(function () {
	$.post("/modules/build/open_city.php", { city: $(this).attr('id_city')})
	.done(function(data) {
		$('body').css('overflow', 'hidden');
		$('.open_city_frame').html(data);
		$(".mc-skin").minecraftSkin();
		$(".open_city-image").fancybox();
		$('.open_city_modal').fadeIn();
	});
});

//Редактирование пользователя
$('*').on('click','.edit_user', function() {
	if(!$(this).find('.edit_group_user').attr('edit')){
		$(this).css('width', 'auto');
		$(this).find('.edit_group_user').attr('edit', 'true')
		$(this).find('.edit_group_user').css('display', 'grid');
		$(this).find('.login_user').css('display', 'none');
	}else{
		$(this).css('width', '');
		$(this).find('.edit_group_user').attr('edit', '')
		$(this).find('.edit_group_user').css('display', 'none');
		$(this).find('.login_user').css('display', '');
	}
});

$(document).on("mouseover", ".head-open-city", function() {
	if(!$(this).find('.edit_group_user').attr('edit')){
		$(this).find('.login_user').css('display', '');
	}
}).children().mouseenter(function(e){e.stopPropagation();});

$(document).on("mouseleave", ".head-open-city", function() {
	$(this).find('.login_user').css('display', 'none');
});

$(".no-buy").click(function () {
	Lobibox.notify('warning', {
		delay: 5000,
		title: 'Недостаточно прав',
		msg: 'Купите проходку, чтобы эта функция стала доступна!'
	});
});

//Листание слайдов
$('*').on('click','.cube', function() {
	if(!$(this).hasClass('active')){
		$('.cube').removeClass('active');
		$(this).addClass('active');
		var translateX = (parseInt($(this).attr('number')) - 1) * 410;
		$(this).parent().parent().find('.open_city-image-group').css('transform', 'translateX(-'+translateX+'px)');
	}
});


//Изгнать человека
user = null;
id_city = null;
$('*').on('click','.edit_group_user_del', function() {
	user = $(this).attr('user');//Ник человека, которого редактируют
	id_city = $(this).attr('id_city');//Идентификатор города, который редактируют
	$.post("/modules/build/do_user.php", { id_city: id_city, do: 'del', user: user})
	.done(function(data) {
		var RQData = JSON.parse(data);
		console.log(RQData);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		if(RQData.action == "successful"){
			var data_content = RQData.swal_fire.type;
			if(data_content.length > 1){
				Swal.fire(
				  RQData.swal_fire.title,
				  RQData.swal_fire.msg,
				  RQData.swal_fire.type
				);
			}
			
			//Прибавляем кол-во людей в городе
			var int_user = parseInt($('.users_int').text());
			int_user = int_user-1;
			$('.users_int').text(int_user);
			
			//Убираем голову человека
			$('.head-open-city').each(function (index, element) {
				if($(this).find('span').attr('data-minecraft-username') == user){
					$(this).remove();
				}
			});
		}
	});
});

//Повысить человека
user = null;
id_city = null;
$('*').on('click','.edit_group_user_up', function() {
	user = $(this).attr('user');//Ник человека, которого редактируют
	id_city = $(this).attr('id_city');//Идентификатор города, который редактируют
	$.post("/modules/build/do_user.php", { id_city: id_city, do: 'up', user: user})
	.done(function(data) {
		var RQData = JSON.parse(data);
		console.log(RQData);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		if(RQData.action == "successful"){
			var data_content = RQData.swal_fire.type;
			if(data_content.length > 1){
				Swal.fire(
				  RQData.swal_fire.title,
				  RQData.swal_fire.msg,
				  RQData.swal_fire.type
				);
			}
			
			//Изменяем данные о человеке
			$('.head-open-city').each(function (index, element) {
				if($(this).find('span').attr('data-minecraft-username') == user){
					$(this).parent().find('.permission-user').text('Модератор');
					$(this).find('.group_keyboard').html("<div id_city='"+id_city+"' user='"+user+"' class='edit_group_user_down'>Понизить</div><div id_city='"+id_city+"'  user='"+user+"' class='edit_group_user_del'>Изгнать</div>");
				}
			});
		}
	});
});

//Понизить человека
user = null;
id_city = null;
$('*').on('click','.edit_group_user_down', function() {
	user = $(this).attr('user');//Ник человека, которого редактируют
	id_city = $(this).attr('id_city');//Идентификатор города, который редактируют
	$.post("/modules/build/do_user.php", { id_city: id_city, do: 'down', user: user})
	.done(function(data) {
		var RQData = JSON.parse(data);
		console.log(RQData);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		if(RQData.action == "successful"){
			var data_content = RQData.swal_fire.type;
			if(data_content.length > 1){
				Swal.fire(
				  RQData.swal_fire.title,
				  RQData.swal_fire.msg,
				  RQData.swal_fire.type
				);
			}
			
			//Изменяем данные о человеке
			$('.head-open-city').each(function (index, element) {
				if($(this).find('span').attr('data-minecraft-username') == user){
					$(this).parent().find('.permission-user').text('Житель');
					$(this).find('.group_keyboard').html("<div id_city='"+id_city+"' user='"+user+"' class='edit_group_user_up'>Повысить</div><div id_city='"+id_city+"'  user='"+user+"' class='edit_group_user_del'>Изгнать</div>");
				}
			});
		}
	});
});

//Войти / Выйти из города
$('*').on('click','.open_city-group_city-modal-right-button', function() {
	if(!login){
		Lobibox.notify('warning', {
			delay: 5000,
			title: 'Недостаточно прав',
			msg: 'Купите проходку, чтобы эта функция стала доступна!'
		});
	}else{
		//Авторизация
		if(!$(this).hasClass('exist')){
			$.post("/modules/build/go_city.php", { id_city: $(this).attr('id_city'), do: 'login'})
			.done(function(data) {
				var RQData = JSON.parse(data);
				console.log(RQData);
				var data_content = RQData.lobibox.type;
				if(data_content.length > 1){
					Lobibox.notify(RQData.lobibox.type, {
						delay: RQData.lobibox.delay,
						title: RQData.lobibox.title,
						msg: RQData.lobibox.msg
					});
				}
				if(RQData.action == "successful"){
					var data_content = RQData.swal_fire.type;
					if(data_content.length > 1){
						Swal.fire(
						  RQData.swal_fire.title,
						  RQData.swal_fire.msg,
						  RQData.swal_fire.type
						);
					}
					$('.open_city-group_city-modal-right-button').addClass('exist');
					$('.open_city-group_city-modal-right-button').html("<li class='exit_svg'></li> Выйти");
					//Проверяем тип игрока
					var permission = 'Житель';
					if($('.open-city-creator-group-right-login').text().replace(/\s+/g, '') == login){
						var permission = 'Администратор';
					}

					//Добавляем голову игрока
					$('.heads-open-city').append('<div class="head-open-city"><div style="display: none;" class="login_user"><div class="permission-user">'+permission+'</div><div class="login_user_info">'+login+'</div></div><div class="creator_build-head-open-city man"><span class="mc-skin" data-minecraft-action="1" data-minecraft-username="'+login+'" data-minecraft-scale="3"><div class="donut head_2"></div></span></div></div>');
					
					//Прибавляем кол-во людей в городе
					var int_user = parseInt($('.users_int').text());
					int_user = int_user+1;
					$('.users_int').text(int_user);
					
					$(".mc-skin").minecraftSkin();
					
				}
			});
		}else{
			$.post("/modules/build/go_city.php", { id_city: $(this).attr('id_city'), do: 'logout'})
			.done(function(data) {
				var RQData = JSON.parse(data);
				var data_content = RQData.lobibox.type;
				if(data_content.length > 1){
					Lobibox.notify(RQData.lobibox.type, {
						delay: RQData.lobibox.delay,
						title: RQData.lobibox.title,
						msg: RQData.lobibox.msg
					});
				}
				if(RQData.action == "successful"){
					var data_content = RQData.swal_fire.type;
					if(data_content.length > 1){
						Swal.fire(
						  RQData.swal_fire.title,
						  RQData.swal_fire.msg,
						  RQData.swal_fire.type
						);
					}
					$('.open_city-group_city-modal-right-button').removeClass('exist');
					$('.open_city-group_city-modal-right-button').html("<svg class='open_city-group_city-modal-right-button-svg' width='21' height='22' viewBox='0 0 21 22' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3.9375 7.83935C3.9375 9.6681 5.25437 11.0477 7 11.0477C8.74563 11.0477 10.0625 9.6681 10.0625 7.83935C10.0625 6.0106 8.74563 4.63101 7 4.63101C5.25437 4.63101 3.9375 6.0106 3.9375 7.83935ZM16.625 7.33335H14.875V10.0833H12.25V11.9167H14.875V14.6667H16.625V11.9167H19.25V10.0833H16.625V7.33335ZM3.5 17.4167H12.25V16.5C12.25 13.9728 10.2874 11.9167 7.875 11.9167H6.125C3.71263 11.9167 1.75 13.9728 1.75 16.5V17.4167H3.5Z' fill='white'/></svg> Вступить");
					//Удаляем голову со списка
					$('.head-open-city').each(function (index, element) {
						if($(this).find('span').attr('data-minecraft-username') == login){
							$(this).remove();
						}
					});
					
					//Уменьшаем кол-во людей в городе
					var int_user = parseInt($('.users_int').text());
					int_user = int_user-1;
					$('.users_int').text(int_user);
				}
			});
		}
	}
});
//Редактирование города
$('*').on('click','.admin_edit', function() {
	$.post("/modules/build/edit_city.php", { id_city: $(this).attr('id_city')})
	.done(function(data) {
		$('.edit_city').html(data);
		$('.open_city_modal').css('display', 'none');
		$('body').css('overflow', 'hidden');
	});
});


//Управление городом / удаление
id_city_del = null;
$('*').on('click','.del_city', function() {
	
	id_city_del = $(this).attr('id_city');
	
	Swal.fire({
	  title: 'Подтвердите действие',
	  text: 'Вы действительно хотите удалить город: '+$('.open_city-group_city-modal-right-title').text(),
	  showDenyButton: true,
	  showCancelButton: false,
	  confirmButtonText: 'Удалить',
	  denyButtonText: 'Нет',
	}).then((result) => {
	  /* Read more about isConfirmed, isDenied below */
	  if (result.isConfirmed) {
		//Удалить
		$.post("/modules/build/go_city.php", { id_city: $(this).attr('id_city'), do: 'remove'})
			.done(function(data) {
				var RQData = JSON.parse(data);
				console.log(RQData);
				var data_content = RQData.lobibox.type;
				if(data_content.length > 1){
					Lobibox.notify(RQData.lobibox.type, {
						delay: RQData.lobibox.delay,
						title: RQData.lobibox.title,
						msg: RQData.lobibox.msg
					});
				}
				if(RQData.action == "successful"){
					var data_content = RQData.swal_fire.type;
					if(data_content.length > 1){
						Swal.fire(
						  RQData.swal_fire.title,
						  RQData.swal_fire.msg,
						  RQData.swal_fire.type
						);
					}
					
					//Закрываем форму
					$('.open_city_modal').fadeOut();
					$('body').css('overflow', '');
					
					//Удаляем город из списка
					$('.build-obj').each(function (index, element) {
						if($(this).attr('id_city') == id_city_del){
							$(this).remove();
						}
					});
				}
			});
	  } else if (result.isDenied) {
	  //Ничего не делаем
	  }
	});
});

$('body').on('click', '.right_close', function() {
	$('.modal_create_city').fadeOut();
	$('.modal_edit_city').fadeOut();
	$('body').css('overflow', '');
});
$(".create-build").click(function () {
	$('.modal_create_city').fadeIn();
	open_create_city();
});

$(".serch_city").click(function () {
	if($(this).text() == 'Открытые'){
		$('.build-obj').each(function (index, element) {
			if($(this).find('.type_city').text() != 'Открыт'){
				$(this).css('display', 'none');
			}else{
				$(this).css('display', '');
			}
		});
	}
	if($(this).text() == 'Закрытые'){
		$('.build-obj').each(function (index, element) {
			if($(this).find('.type_city').text() == 'Открыт'){
				$(this).css('display', 'none');
			}else{
				$(this).css('display', '');
			}
		});
	}
	if($(this).text() == 'Все'){
		$('.build-obj').css('display', '');
	}
	
	if($(this).text() == 'Мои'){
		$('.build-obj').each(function (index, element) {
			if($(this).find('.creator-build-text-2').text() == login){
				$(this).css('display', '');
			}else{
				$(this).css('display', 'none');
			}
		});
	}
	
});

var text = null;
$(".button_serch").click(function () {
	$('.serch_item_city').text("Все");
	text = $('.serch-build-input').val().toLowerCase();
	$('.build-obj').each(function (index, element) {
		$( "div:contains('John')" )

		if ($(this).find('.title_build_find:contains("'+text+'")').text()) {
			$(this).css('display', '')
		}else{
			$(this).css('display', 'none')
		}
		
	});
});

//Листать слайды вправо
int_slide = 1;
$('*').on('click','.right_arrow', function() {
	var sliders = $('.cube').length;
	$('.cube').each(function (index, element) {
		if($(this).hasClass('active')){
			int_slide = parseInt($(this).attr('number'));
		}
	});
	if((int_slide + 1) > sliders){
		return;
	}
	
	int_slide = int_slide + 1;
	console.log(int_slide);
	$('.cube').each(function (index, element) {
		if(parseInt($(this).attr('number')) == int_slide){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
	});
	
	var translateX = (int_slide - 1) * 410;
	$(this).parent().parent().find('.open_city-image-group').css('transform', 'translateX(-'+translateX+'px)');
	
});

$('*').on('click','.left_arrow', function() {
	var sliders = $('.cube').length;
	$('.cube').each(function (index, element) {
		if($(this).hasClass('active')){
			int_slide = parseInt($(this).attr('number'));
		}
	});
	if((int_slide - 2) < 0){
		return;
	}
	
	int_slide = int_slide - 1;
	
	console.log(int_slide);
	$('.cube').each(function (index, element) {
		if(parseInt($(this).attr('number')) == int_slide){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
	});
	
	var translateX = (int_slide - 1) * 410;
	$(this).parent().parent().find('.open_city-image-group').css('transform', 'translateX(-'+translateX+'px)');
	
});

$('*').on('click','.close_city_open_modal', function() {
	$('.open_city_modal').fadeOut();
	$('body').css('overflow', '');
});


$('.open_city_modal').click(function(e){
	$('.open_city_modal').fadeOut();
	$('body').css('overflow', '');
}).children().click(function(e){e.stopPropagation();});